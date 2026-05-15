import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, primaryBtnStyle, SITE_URL } from "./components/base";

interface Props {
  tag?: string;          // e.g. "Campaign Update"
  title: string;
  body: string;
  ctaText?: string;
  ctaHref?: string;
  footnote?: string;
}

export default function Notification({ tag, title, body: bodyText, ctaText, ctaHref = SITE_URL, footnote }: Props) {
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>{title}</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={section}>
            {tag && <Tag>{tag}</Tag>}
            <Text style={headlineStyle}>{title}</Text>
            <Text style={bodyTextStyle}>{bodyText}</Text>
            {ctaText && (
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <Button href={ctaHref} style={primaryBtnStyle}>{ctaText}</Button>
              </div>
            )}
            {footnote && <Text style={mutedTextStyle}>{footnote}</Text>}
          </Section>
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const section: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
