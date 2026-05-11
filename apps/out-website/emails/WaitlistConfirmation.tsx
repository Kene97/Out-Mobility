import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Button,
  Hr,
  Preview,
  Font,
} from "@react-email/components";

interface WaitlistConfirmationProps {
  firstName: string;
}

const BASE_URL = "https://out-mobility.vercel.app";

const NAVY   = "#003a50";
const SKY    = "#00aeef";
const SKY_25 = "#f6fcff";
const SKY_50 = "#cceffc";
const WHITE  = "#ffffff";
const MUTED  = "#64899a";

const ecosystem = [
  { name: "Out-door",   desc: "Verified in-car advertising" },
  { name: "Out-side",   desc: "Ride-hail & subscriptions"   },
  { name: "Out-leaf",   desc: "Carbon credits & offsets"     },
  { name: "Out-charge", desc: "EV charging infrastructure"   },
];

export default function WaitlistConfirmation({ firstName }: WaitlistConfirmationProps) {
  const displayName = firstName.split(" ")[0];

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Helvetica Neue"
          fallbackFontFamily="Arial"
          webFont={undefined}
        />
      </Head>

      <Preview>You're on the Out Mobility waitlist — here's what's coming.</Preview>

      <Body style={body}>
        <Container style={container}>

          {/* ── Logo bar ── */}
          <Section style={logoBar}>
            <Row>
              <Column align="center">
                <Text style={wordmark}>OUT MOBILITY</Text>
              </Column>
            </Row>
          </Section>

          {/* ── Sky accent line ── */}
          <div style={accentLine} />

          {/* ── Hero ── */}
          <Section style={hero}>
            <Row>
              <Column align="center" style={{ padding: "48px 40px 40px" }}>
                <Text style={heroEyebrow}>✦ EARLY ACCESS CONFIRMED</Text>
                <Text style={heroHeading}>You're on{"\n"}the list.</Text>
                <Text style={heroSub}>
                  We've reserved your spot. The moment Out Mobility launches,
                  you'll be among the very first to know.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ── Body message ── */}
          <Section style={bodySection}>
            <Text style={greeting}>Hey {displayName},</Text>
            <Text style={bodyText}>
              Thanks for signing up. Out Mobility is building the software layer
              that turns vehicles into verified, managed advertising
              infrastructure — and you're now in line to launch on day one.
            </Text>
            <Text style={bodyText}>
              When we go live, you'll get a direct invite to launch your first
              campaign across <strong>6,000+ ride-hail vehicles</strong> reaching{" "}
              <strong>100,000+ passengers daily</strong>. Every impression
              verified in real time — no guesswork, no middlemen.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* ── Ecosystem teaser ── */}
          <Section style={ecosystemSection}>
            <Row>
              <Column style={{ padding: "0 40px 8px" }}>
                <Text style={ecosystemEyebrow}>THE BIGGER PICTURE</Text>
                <Text style={ecosystemHeading}>One token. Every mile.</Text>
                <Text style={ecosystemIntro}>
                  Out Mobility is bigger than advertising. We're building a
                  full-stack mobility token — <strong>$OUT</strong> — that powers
                  every layer of the ecosystem: the vehicles that move people, the
                  ads that fund them, the carbon they offset, and the grid they
                  charge from.
                </Text>
              </Column>
            </Row>

            {/* Ecosystem cards — 2 columns */}
            <Row style={{ padding: "8px 32px 0" }}>
              {ecosystem.slice(0, 2).map((item) => (
                <Column key={item.name} style={ecoCard}>
                  <Text style={ecoName}>{item.name}</Text>
                  <Text style={ecoDesc}>{item.desc}</Text>
                </Column>
              ))}
            </Row>
            <Row style={{ padding: "8px 32px 16px" }}>
              {ecosystem.slice(2).map((item) => (
                <Column key={item.name} style={ecoCard}>
                  <Text style={ecoName}>{item.name}</Text>
                  <Text style={ecoDesc}>{item.desc}</Text>
                </Column>
              ))}
            </Row>

            <Row>
              <Column style={{ padding: "4px 40px 32px" }}>
                <Text style={ecosystemClosure}>
                  $OUT is the token that ties it all together — every ride earned,
                  every ad verified, every carbon credit issued, every charge
                  delivered. The network grows. The token captures it.
                </Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* ── X / Twitter CTA ── */}
          <Section style={ctaSection}>
            <Text style={ctaHeading}>Stay in the loop.</Text>
            <Text style={ctaText}>
              Follow us on X for ecosystem updates, launch announcements, and
              early token news. We post signals, not noise.
            </Text>
            <Row>
              <Column align="center" style={{ paddingBottom: "8px" }}>
                <Button href="https://x.com/OutMobility" style={ctaButton}>
                  FOLLOW @OUTMOBILITY
                </Button>
              </Column>
            </Row>
            <Text style={ctaHandle}>x.com/OutMobility</Text>
          </Section>

          {/* ── Footer ── */}
          <Section style={footer}>
            <Row>
              <Column align="center" style={{ padding: "32px 40px 24px" }}>
                <Text style={footerWordmark}>OUT MOBILITY</Text>
                <Text style={footerTagline}>Verified In-Car Advertising Infrastructure</Text>

                <Row style={{ marginTop: "16px", marginBottom: "16px" }}>
                  <Column align="center">
                    <Link href={`${BASE_URL}`} style={footerLink}>Website</Link>
                    <Text style={footerDot}> · </Text>
                    <Link href="https://x.com/OutMobility" style={footerLink}>X / Twitter</Link>
                    <Text style={footerDot}> · </Text>
                    <Link href={`${BASE_URL}#privacy`} style={footerLink}>Privacy</Link>
                  </Column>
                </Row>

                <Hr style={{ borderColor: "#1a5068", margin: "0 0 20px" }} />

                <Text style={footerLegal}>
                  © 2026 Out Inc. All rights reserved.
                </Text>
                <Text style={footerLegal}>
                  You're receiving this because you joined the Out Mobility
                  waitlist. This is not a marketing email — you will only hear
                  from us when it matters.
                </Text>
              </Column>
            </Row>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

/* ── Styles ── */

const body: React.CSSProperties = {
  backgroundColor: "#f0f4f6",
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: "32px 0",
};

const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: WHITE,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0,58,80,0.10)",
};

const logoBar: React.CSSProperties = {
  backgroundColor: WHITE,
  padding: "24px 40px 20px",
};

const wordmark: React.CSSProperties = {
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  fontWeight: 900,
  fontSize: "18px",
  letterSpacing: "0.12em",
  color: NAVY,
  margin: 0,
  textAlign: "center",
};

const accentLine: React.CSSProperties = {
  height: "3px",
  background: `linear-gradient(90deg, ${NAVY} 0%, ${SKY} 50%, ${NAVY} 100%)`,
};

const hero: React.CSSProperties = {
  backgroundColor: NAVY,
};

const heroEyebrow: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: SKY,
  textTransform: "uppercase",
  margin: "0 0 16px",
  textAlign: "center",
};

const heroHeading: React.CSSProperties = {
  fontSize: "46px",
  fontWeight: 800,
  lineHeight: "1.1",
  color: WHITE,
  margin: "0 0 20px",
  textAlign: "center",
  whiteSpace: "pre-line",
};

const heroSub: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "rgba(255,255,255,0.72)",
  margin: "0",
  textAlign: "center",
  maxWidth: "420px",
};

const bodySection: React.CSSProperties = {
  padding: "36px 40px 8px",
};

const greeting: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: NAVY,
  margin: "0 0 16px",
};

const bodyText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.65",
  color: "#2d6070",
  margin: "0 0 16px",
};

const divider: React.CSSProperties = {
  borderColor: SKY_50,
  margin: "24px 40px",
};

const ecosystemSection: React.CSSProperties = {
  backgroundColor: WHITE,
};

const ecosystemEyebrow: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  color: SKY,
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const ecosystemHeading: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 800,
  color: NAVY,
  margin: "0 0 12px",
  lineHeight: "1.2",
};

const ecosystemIntro: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.65",
  color: "#2d6070",
  margin: "0",
};

const ecoCard: React.CSSProperties = {
  backgroundColor: SKY_25,
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "0 4px",
  border: `1px solid ${SKY_50}`,
  width: "50%",
};

const ecoName: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: NAVY,
  margin: "0 0 4px",
};

const ecoDesc: React.CSSProperties = {
  fontSize: "12px",
  color: MUTED,
  margin: "0",
  lineHeight: "1.4",
};

const ecosystemClosure: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "1.6",
  color: MUTED,
  fontStyle: "italic",
  margin: "0",
};

const ctaSection: React.CSSProperties = {
  padding: "8px 40px 36px",
  textAlign: "center",
};

const ctaHeading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 800,
  color: NAVY,
  margin: "0 0 10px",
  textAlign: "center",
};

const ctaText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#2d6070",
  margin: "0 0 24px",
  textAlign: "center",
};

const ctaButton: React.CSSProperties = {
  backgroundColor: SKY,
  color: WHITE,
  fontWeight: 800,
  fontSize: "14px",
  letterSpacing: "0.1em",
  borderRadius: "12px",
  padding: "14px 36px",
  textDecoration: "none",
  display: "inline-block",
};

const ctaHandle: React.CSSProperties = {
  fontSize: "12px",
  color: MUTED,
  margin: "12px 0 0",
  textAlign: "center",
};

const footer: React.CSSProperties = {
  backgroundColor: NAVY,
};

const footerWordmark: React.CSSProperties = {
  fontWeight: 900,
  fontSize: "14px",
  letterSpacing: "0.14em",
  color: WHITE,
  margin: "0 0 4px",
  textAlign: "center",
};

const footerTagline: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.45)",
  margin: "0",
  textAlign: "center",
  letterSpacing: "0.04em",
};

const footerLink: React.CSSProperties = {
  fontSize: "12px",
  color: SKY,
  textDecoration: "none",
};

const footerDot: React.CSSProperties = {
  fontSize: "12px",
  color: "rgba(255,255,255,0.3)",
  display: "inline",
};

const footerLegal: React.CSSProperties = {
  fontSize: "11px",
  color: "rgba(255,255,255,0.35)",
  margin: "0 0 6px",
  textAlign: "center",
  lineHeight: "1.5",
};
