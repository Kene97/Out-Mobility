import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, EmailDivider, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, primaryBtnStyle, SITE_URL } from "./components/base";

interface Props {
  productName: string;   // e.g. "Out-door"
  updateTitle: string;   // e.g. "Real-time impression tracking is live."
  updateBody: string;    // 1–2 sentence description
  ctaText: string;       // e.g. "SEE WHAT'S NEW"
  ctaHref?: string;
}

export default function ProductUpdate({ productName, updateTitle, updateBody, ctaText, ctaHref = SITE_URL }: Props) {
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>{productName} — {updateTitle}</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Tag>{productName} Update</Tag>
            <Text style={headlineStyle}>{updateTitle}</Text>
            <Text style={bodyTextStyle}>{updateBody}</Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={ctaHref} style={primaryBtnStyle}>{ctaText}</Button>
            </div>
          </Section>
          <EmailFooter unsubscribeNote="You received this because you're on the Out Mobility list." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
