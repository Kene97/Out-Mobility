import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, navyBtnStyle, SKY, FONT_BODY } from "./components/base";

interface Props {
  updateTitle: string;   // e.g. "Tokenomics are finalised."
  updateBody: string;
  ctaText: string;
  ctaHref?: string;
}

export default function TokenUpdate({ updateTitle, updateBody, ctaText, ctaHref = "https://token.woutside.com" }: Props) {
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>Out Mobility Ecosystem Token — {updateTitle}</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Tag>Ecosystem Token</Tag>
            <Text style={headlineStyle}>{updateTitle}</Text>
            <Text style={bodyTextStyle}>{updateBody}</Text>
            <Text style={{ ...bodyTextStyle, fontSize: "14px", color: "#8099a6" }}>
              The token hasn&apos;t launched yet — but it&apos;s coming.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={ctaHref} style={navyBtnStyle}>{ctaText}</Button>
            </div>
          </Section>
          <EmailFooter unsubscribeNote="You received this because you're following the Out Mobility ecosystem." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
