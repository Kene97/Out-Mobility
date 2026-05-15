import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, primaryBtnStyle, navyBtnStyle, SITE_URL } from "./components/base";

interface Props {
  firstName?: string;
}

export default function WhitepaperCTA({ firstName }: Props) {
  const name = firstName?.trim().split(" ")[0];
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>The Out Mobility ecosystem thesis — download the whitepaper.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Tag>Ecosystem Whitepaper</Tag>
            <Text style={headlineStyle}>
              {name ? `${name}, the` : "The"} thesis{"\n"}is ready.
            </Text>
            <Text style={bodyTextStyle}>
              Infrastructure. Mobility. Token economics. It&apos;s all here — in one clean document built for investors, partners, and builders alike.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={`${SITE_URL}/whitepaper`} style={primaryBtnStyle}>
                READ THE WHITEPAPER
              </Button>
            </div>
            <Text style={mutedTextStyle}>15 sections. No hype. Just the thesis.</Text>
          </Section>
          <EmailFooter unsubscribeNote="You received this from Out Mobility. Reply to unsubscribe." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
