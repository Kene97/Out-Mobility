import { Html, Head, Body, Container, Section, Text, Link, Hr, Preview } from "@react-email/components";
import { EmailFonts, NAVY, SKY, MUTED, BODY_TXT, BORDER, FONT_DISPLAY, FONT_CAL, FONT_BODY, SITE_URL } from "./components/base";

interface Props { firstName: string; }

export default function WaitlistConfirmation({ firstName }: Props) {
  const name = firstName.trim().split(" ")[0];
  return (
    <Html lang="en">
      <Head><EmailFonts /></Head>
      <Preview>You&apos;re on the Out Mobility waitlist — we&apos;ll be in touch.</Preview>
      <Body style={body}>
        <Container style={card}>

          {/* Wordmark — Mona Sans */}
          <Section style={{ padding: "28px 48px 20px" }}>
            <Text style={wordmark}>OUT MOBILITY</Text>
          </Section>

          <Hr style={{ borderColor: BORDER, margin: 0 }} />

          {/* Content */}
          <Section style={{ padding: "44px 48px 40px" }}>

            {/* Heading — Cal Sans */}
            <Text style={heading}>You&apos;re on the list, {name}.</Text>

            {/* Body — Instrument Sans */}
            <Text style={bodyText}>
              We&apos;ve got your details. When we launch, you&apos;ll be among the first to run campaigns across our verified vehicle network — real passengers, real impressions, every one proven.
            </Text>

            <Text style={bodyText}>
              Beyond the ad network, Out Mobility is building a token-backed mobility ecosystem. The full thesis is at{" "}
              <Link href={SITE_URL} style={{ color: SKY, textDecoration: "none" }}>woutside.com</Link>.
            </Text>

            <Text style={{ ...bodyText, marginBottom: "32px" }}>
              Any questions? Just reply to this email — I read everything.
            </Text>

            {/* Sign-off — Cal Sans */}
            <Text style={signoff}>— Didi</Text>
            <Text style={signoffSub}>
              Out Mobility &middot;{" "}
              <Link href="mailto:hello@woutside.com" style={{ color: MUTED, textDecoration: "none" }}>
                hello@woutside.com
              </Link>
            </Text>

          </Section>

          <Hr style={{ borderColor: BORDER, margin: 0 }} />

          {/* Minimal footer */}
          <Section style={{ padding: "18px 48px" }}>
            <Text style={footer}>
              &copy; 2026 Out Inc. &nbsp;&middot;&nbsp; You received this because you joined the Out Mobility advertiser waitlist. &nbsp;&middot;&nbsp;{" "}
              <Link href="mailto:hello@woutside.com?subject=Unsubscribe" style={{ color: "#aabec8", textDecoration: "underline" }}>
                Unsubscribe
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const body: React.CSSProperties = {
  backgroundColor: "#f2f5f7",
  margin: 0,
  padding: "48px 0 64px",
};

const card: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 1px 12px rgba(0,58,80,0.06)",
};

const wordmark: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 900,
  fontSize: "11px",
  letterSpacing: "0.18em",
  color: NAVY,
  textTransform: "uppercase",
  margin: 0,
};

const heading: React.CSSProperties = {
  fontFamily: FONT_CAL,
  fontWeight: 400,
  fontSize: "30px",
  lineHeight: "1.25",
  color: NAVY,
  margin: "0 0 20px",
};

const bodyText: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "15px",
  lineHeight: "1.75",
  color: BODY_TXT,
  margin: "0 0 14px",
};

const signoff: React.CSSProperties = {
  fontFamily: FONT_CAL,
  fontWeight: 400,
  fontSize: "16px",
  color: NAVY,
  margin: "0 0 4px",
};

const signoffSub: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "13px",
  color: MUTED,
  margin: 0,
};

const footer: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "11px",
  color: "#aabec8",
  margin: 0,
  lineHeight: "1.6",
};
