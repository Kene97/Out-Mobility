import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, primaryBtnStyle, SITE_URL } from "./components/base";

interface Props {
  firstName: string;
  ctaHref?: string;
}

export default function EarlyAccess({ firstName, ctaHref = SITE_URL }: Props) {
  const name = firstName.trim().split(" ")[0];
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>Your early access to Out Mobility is ready.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Tag>Early Access</Tag>
            <Text style={headlineStyle}>Your invite{"\n"}is ready, {name}.</Text>
            <Text style={bodyTextStyle}>
              You&apos;re in. Launch your first campaign across 6,000+ verified vehicles — no setup fees, no middleman, live in 3 minutes.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={ctaHref} style={primaryBtnStyle}>
                LAUNCH YOUR CAMPAIGN
              </Button>
            </div>
            <Text style={mutedTextStyle}>This invite is exclusive. First come, first served.</Text>
          </Section>
          <EmailFooter unsubscribeNote="You received this early access invite from Out Mobility." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
