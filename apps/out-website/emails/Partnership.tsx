import { Html, Head, Body, Container, Section, Text, Button, Preview } from "@react-email/components";
import { EmailFonts, EmailHeader, EmailFooter, Tag, bodyStyle, cardStyle, headlineStyle, bodyTextStyle, mutedTextStyle, navyBtnStyle } from "./components/base";

interface Props {
  recipientName: string;
  senderName?: string;
  ctaHref?: string;
}

export default function Partnership({ recipientName, senderName = "The Out Mobility team", ctaHref = "mailto:hello@woutside.com" }: Props) {
  const name = recipientName.trim().split(" ")[0];
  return (
    <Html lang="en"><Head><EmailFonts /></Head>
      <Preview>A partnership opportunity from Out Mobility.</Preview>
      <Body style={bodyStyle}>
        <Container style={cardStyle}>
          <EmailHeader />
          <Section style={body}>
            <Tag>Partnership</Tag>
            <Text style={headlineStyle}>Let&apos;s build{"\n"}together, {name}.</Text>
            <Text style={bodyTextStyle}>
              Out Mobility is building the infrastructure layer for verified in-vehicle advertising across emerging markets. We think there&apos;s something here for both of us.
            </Text>
            <Text style={{ ...bodyTextStyle, fontSize: "14px", color: "#8099a6" }}>
              10 minutes. That&apos;s all we&apos;re asking for.
            </Text>
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Button href={ctaHref} style={navyBtnStyle}>
                REPLY TO THIS EMAIL
              </Button>
            </div>
            <Text style={mutedTextStyle}>— {senderName}</Text>
          </Section>
          <EmailFooter unsubscribeNote="This is a direct outreach from Out Mobility. Reply to opt out." />
        </Container>
      </Body>
    </Html>
  );
}

const body: React.CSSProperties = { padding: "52px 48px 48px", textAlign: "center" };
