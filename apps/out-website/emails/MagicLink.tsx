import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, primaryBtnStyle, NAVY, FONT_BODY, BORDER } from "./components/base";

interface Props {
  magicLink: string;
  expiresIn?: string;   // e.g. "10 minutes"
}

export default function MagicLink({ magicLink, expiresIn = "10 minutes" }: Props) {
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>Your Out Mobility sign-in link — expires in {expiresIn}.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Text style={headlineStyle}>Here&apos;s your{"\n"}sign-in link.</Text>
            <Text style={bodyTextStyle}>
              Click below to sign in to Out Mobility. No password needed.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={magicLink} style={primaryBtnStyle}>
                SIGN IN TO OUT MOBILITY
              </Button>
            </div>
            <Text style={mutedTextStyle}>This link expires in {expiresIn}. If you didn&apos;t request this, ignore this email.</Text>
            {/* Fallback URL */}
            <div style={linkBox}>
              <Text style={{ ...mutedTextStyle, margin: "0 0 4px", fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Or copy this link
              </Text>
              <Text style={{ fontFamily: FONT_BODY, fontSize: "12px", color: NAVY, margin: 0, wordBreak: "break-all", lineHeight: "1.5" }}>
                {magicLink}
              </Text>
            </div>
          </Section>
          <EmailFooter unsubscribeNote="You received this because a sign-in was requested for your Out Mobility account." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 40px", textAlign: "center" };
const linkBox: React.CSSProperties = {
  margin: "24px auto 0",
  padding: "14px 20px",
  backgroundColor: "#f4f8fa",
  borderRadius: "10px",
  border: `1px solid ${BORDER}`,
  maxWidth: "460px",
};
