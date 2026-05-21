-- Out Mobility — Supabase schema
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/nanfllhkehimfimmretz/sql

-- ─── Waitlist signups ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name   TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  company     TEXT,
  role        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT waitlist_signups_email_unique UNIQUE (email)
);

-- Enable Row Level Security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Service role (used by the API) can do everything
CREATE POLICY "service_role_all" ON waitlist_signups
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- No public/anon access
-- (anon users cannot read or write — only the server-side API can)
