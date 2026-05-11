# Payments & Ledger System — Out-door

**MVP model:** Manual invoicing (post-pay for advertisers, manual payout for operators).
**Financial data:** All amounts stored in cents (integer) — no floating point.
**Ledger:** Append-only. No row is ever modified or deleted.

---

## Financial Model Overview

```
ADVERTISER                                    OPERATOR / DRIVER
    │                                              │
    │ pays invoice (post-campaign)                 │ receives payout (monthly)
    ▼                                              ▼

  payment_ledger                           operator_earnings
    (credit entries)                         (payout records)
          │                                        │
          │                                        │
          └──────────────┬─────────────────────────┘
                         │
                  Out Mobility
                  (platform margin)

Revenue flow:
  Advertiser pays $2,000 for campaign
  → Verified: 285,000 impressions at $6.50 CPM = $1,852.50 earned
  → Operators receive 35% = $648.38 (distributed across vehicles)
  → Out Mobility keeps 65% = $1,204.12 (platform margin)
```

---

## Advertiser Payment Flow (Post-Pay)

**MVP: No payment gateway integration. Manual invoicing.**

```
Campaign completes (end_date or budget_exhausted)
    │
    ▼
System generates invoice record
    │
    ▼
Admin reviews + sends invoice (email/PDF)
    │
    ▼
Advertiser pays (bank transfer, wire, mobile money)
    │
    ▼
Admin marks invoice as paid → logs credit in payment_ledger
    │
    ▼
Advertiser account shows payment history
```

**Future:** Stripe / Flutterwave integration for self-serve pre-pay top-up.

### Invoice Generation

```typescript
// payments/payments.service.ts
async function generateInvoice(campaignId: string): Promise<Invoice> {
  const campaign = await campaignRepo.findById(campaignId)
  const stats = await statsRepo.findByCampaign(campaignId)
  
  // Invoice amount = verified impressions × CPM rate
  const amountCents = Math.floor(stats.validImpressions * campaign.cpmRateCents / 1000)
  
  const invoice = await invoiceRepo.create({
    orgId: campaign.orgId,
    campaignId,
    amountCents,
    currency: 'USD',
    dueDate: addDays(new Date(), 14),  // Net 14
    lineItems: [{
      description: `Verified impressions — ${campaign.name}`,
      quantity: stats.validImpressions,
      unitPriceCents: campaign.cpmRateCents,
      unit: 'per 1,000 impressions',
      amountCents
    }]
  })
  
  // Log debit to ledger
  await ledgerRepo.insert({
    orgId: campaign.orgId,
    type: 'debit',
    amountCents,
    referenceType: 'invoice',
    referenceId: invoice.id,
    description: `Invoice for campaign: ${campaign.name}`,
    status: 'pending'
  })
  
  return invoice
}
```

### Invoice Database Table

```sql
CREATE TABLE invoices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL REFERENCES organizations(id),
  campaign_id     UUID REFERENCES campaigns(id),
  amount_cents    INTEGER NOT NULL,
  currency        CHAR(3) NOT NULL DEFAULT 'USD',
  status          VARCHAR(20) NOT NULL DEFAULT 'unpaid',  -- unpaid, paid, void
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  payment_ref     VARCHAR(255),
  line_items      JSONB NOT NULL DEFAULT '[]',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Operator Payout Flow

```
End of month (or admin-triggered):
    │
    ▼
generate-payouts worker runs:
  → Queries daily operator_earnings records for the period
  → Groups by operator
  → Creates payout summary per operator
    │
    ▼
Admin reviews payout summary in dashboard
    │
    ▼
Admin approves each operator's payout
    │
    ▼
Admin processes payment externally:
  → Bank transfer / mobile money
    │
    ▼
Admin marks payout as paid:
  → Enters payment_ref and paid_at
  → System logs credit to operator's ledger
    │
    ▼
Operator sees "Paid" status in their dashboard
```

### Monthly Payout Generation

```typescript
// workers/generate-payouts.worker.ts
async function generateMonthlyPayouts(periodStart: Date, periodEnd: Date) {
  // Sum daily earnings by operator for the period
  const operatorTotals = await db.query(`
    SELECT
      operator_id,
      SUM(valid_impressions)     AS total_impressions,
      SUM(gross_revenue_cents)   AS total_gross_revenue_cents,
      SUM(payout_amount_cents)   AS total_payout_cents,
      revenue_share_pct
    FROM operator_earnings
    WHERE period_start >= $1 AND period_end <= $2
      AND status = 'pending'
    GROUP BY operator_id, revenue_share_pct
  `, [periodStart, periodEnd])

  for (const row of operatorTotals.rows) {
    // Create or update payout record
    await payoutRepo.upsert({
      operatorId: row.operator_id,
      periodStart,
      periodEnd,
      totalImpressions: row.total_impressions,
      grossRevenueCents: row.total_gross_revenue_cents,
      payoutAmountCents: row.total_payout_cents,
      revenueSharePct: row.revenue_share_pct,
      status: 'pending'
    })
    
    // Link daily records to this payout
    await operatorEarningsRepo.linkToPayout(row.operator_id, periodStart, periodEnd)
  }
}
```

### Payout Approval

```typescript
async function approvePayout(payoutId: string, adminUserId: string) {
  const payout = await payoutRepo.findById(payoutId)
  if (payout.status !== 'pending') throw new ConflictError('Payout is not pending')
  
  await payoutRepo.updateStatus(payoutId, 'approved', { approvedBy: adminUserId })
  
  // Log to ledger (debit from Out Mobility, credit to operator)
  await ledgerRepo.insert({
    orgId: payout.operatorId,
    type: 'credit',
    amountCents: payout.payoutAmountCents,
    referenceType: 'payout',
    referenceId: payoutId,
    description: `Payout for ${formatPeriod(payout.periodStart, payout.periodEnd)}`,
    status: 'pending'  // becomes 'completed' when marked as paid
  })
}

async function markPayoutPaid(payoutId: string, { paymentRef, paidAt }) {
  await payoutRepo.updateStatus(payoutId, 'paid', { paymentRef, paidAt })
  await ledgerRepo.updateStatus('payout', payoutId, 'completed')
}
```

---

## Double-Entry Ledger Concepts (Simplified)

Full double-entry bookkeeping is overkill for MVP. Simplified approach:

Each transaction creates **one ledger row** with direction (credit/debit) and reference.

**Reading the ledger:**
```sql
-- Operator's balance (what we owe them)
SELECT SUM(CASE WHEN type = 'credit' THEN amount_cents ELSE -amount_cents END) AS balance
FROM payment_ledger
WHERE org_id = $1 AND status = 'completed'

-- Advertiser's outstanding balance (what they owe us)
SELECT SUM(CASE WHEN type = 'debit' THEN amount_cents ELSE -amount_cents END) AS owed
FROM payment_ledger
WHERE org_id = $1 AND status IN ('pending', 'completed')
```

**Reconciliation check:**
```sql
-- Sum of all verified impressions × CPM = sum of advertiser debits
SELECT
  (SELECT SUM(cpm_rate_cents) / 1000 * COUNT(*)
   FROM verified_impressions vi
   JOIN campaigns c ON vi.campaign_id = c.id
   WHERE vi.status = 'valid') AS expected_revenue,

  (SELECT SUM(amount_cents) FROM payment_ledger
   WHERE type = 'debit') AS ledger_debits
-- These should match (within rounding)
```

---

## Platform Revenue Calculation

```typescript
// Computed monthly for internal reporting
function calculatePlatformRevenue(periodStart: Date, periodEnd: Date) {
  return db.query(`
    SELECT
      SUM(gross_revenue_cents) AS total_advertiser_revenue,
      SUM(payout_amount_cents) AS total_operator_payouts,
      SUM(gross_revenue_cents - payout_amount_cents) AS platform_margin
    FROM operator_earnings
    WHERE period_start >= $1 AND period_end <= $2
  `, [periodStart, periodEnd])
}
```

---

## Fraud & Payment Protection

### Advertiser
- Campaign requires budget commitment before going live (future: pre-pay wallet)
- Invoice generated only on verified impressions — not raw plays
- Admin can void invoice if fraud detected post-campaign

### Operator
- Payout held if fraud flag pending on any device in the period
- Admin must resolve all fraud flags before payout approved
- If fraud confirmed: impressions removed from verified_impressions, payout recalculated

```typescript
async function canApprovePayout(payoutId: string): Promise<{ canApprove: boolean; reason?: string }> {
  const payout = await payoutRepo.findById(payoutId)
  
  // Check for unresolved fraud flags on operator's devices
  const openFlags = await db.query(`
    SELECT COUNT(*) FROM fraud_flags
    WHERE device_id IN (
      SELECT id FROM devices WHERE operator_id = $1
    )
    AND status = 'pending'
    AND period_start >= $2 AND period_end <= $3
  `, [payout.operatorId, payout.periodStart, payout.periodEnd])
  
  if (openFlags > 0) {
    return { canApprove: false, reason: `${openFlags} unresolved fraud flags` }
  }
  
  return { canApprove: true }
}
```

---

## Currency Handling

MVP operates in a single currency per deployment (USD for international advertisers, NGN for local).

**Rules:**
- All internal calculations in cents (or kobo for NGN)
- Currency stored as `CHAR(3)` ISO 4217 code
- Display conversion handled in frontend (`$1,240.50` or `₦128,400`)
- No cross-currency conversion in MVP

**Multi-currency (future):** Store exchange rate at time of transaction. Never recalculate historical amounts.
