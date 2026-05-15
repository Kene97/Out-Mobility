import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, primaryBtnStyle, SITE_URL } from "./components/base";

interface Props { firstName: string; }

export default function WelcomeEmail({ firstName }: Props) {
  const name = firstName.trim().split(" ")[0];
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>Welcome to Out Mobility — here&apos;s what&apos;s next.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Text style={headlineStyle}>Welcome to{"\n"}Out Mobility.</Text>
            <Text style={bodyTextStyle}>
              Your account is ready, {name}. Start your first campaign and reach verified passengers across thousands of vehicles in minutes.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={`${SITE_URL}`} style={primaryBtnStyle}>
                LAUNCH YOUR CAMPAIGN
              </Button>
            </div>
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
