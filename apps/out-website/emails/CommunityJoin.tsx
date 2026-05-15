import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, primaryBtnStyle } from "./components/base";

interface Props { firstName: string; }

export default function CommunityJoin({ firstName }: Props) {
  const name = firstName.trim().split(" ")[0];
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>You&apos;ve joined the Out Mobility community.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Text style={headlineStyle}>You&apos;re part of{"\n"}the movement, {name}.</Text>
            <Text style={bodyTextStyle}>
              Follow us on X for real updates — network growth, launch signals, and ecosystem token news. No noise, just signal.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href="https://x.com/OutMobility" style={primaryBtnStyle}>
                FOLLOW @OUTMOBILITY
              </Button>
            </div>
          </Section>
          <EmailFooter unsubscribeNote="You received this because you joined the Out Mobility community." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
