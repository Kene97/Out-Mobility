/**
 * Out Mobility — Email Design System
 * Single source of truth for all email templates.
 * Mirrors globals.css brand tokens exactly.
 */

import {
  Section,
  Row,
  Column,
  Text,
  Link,
  Hr,
  Font,
  Img,
} from "@react-email/components";

/* ─── Brand tokens ────────────────────────────────────────────────────────── */
export const SITE_URL   = "https://www.woutside.com";
export const NAVY       = "#003a50";
export const SKY        = "#00aeef";
export const SKY_LIGHT  = "#f4f9fc";
export const MUTED      = "#8099a6";
export const BODY_TXT   = "#3d6472";
export const WHITE      = "#ffffff";
export const PAGE_BG    = "#f2f5f7";
export const FOOTER_BG  = "#f4f8fa";
export const BORDER     = "#e2ecf0";

/* ─── Font stacks ─────────────────────────────────────────────────────────── */
export const FONT_DISPLAY = "'Mona Sans', 'Arial Narrow', Arial, sans-serif";
export const FONT_CAL     = "'Cal Sans', 'Trebuchet MS', Trebuchet, sans-serif";
export const FONT_BODY    = "'Instrument Sans', -apple-system, 'Segoe UI', Arial, sans-serif";

/* ─── Shared outer styles ─────────────────────────────────────────────────── */
export const bodyStyle: React.CSSProperties = {
  backgroundColor: PAGE_BG,
  fontFamily: FONT_BODY,
  margin: 0,
  padding: "48px 0 64px",
};

export const cardStyle: React.CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: WHITE,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 1px 16px rgba(0,58,80,0.07)",
};

/* ─── Shared text styles ──────────────────────────────────────────────────── */
export const headlineStyle: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 900,
  fontSize: "36px",
  lineHeight: "1.12",
  color: NAVY,
  letterSpacing: "-0.01em",
  margin: "0 0 16px",
  textAlign: "center",
};

export const bodyTextStyle: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "16px",
  lineHeight: "1.65",
  color: BODY_TXT,
  margin: "0 0 8px",
  textAlign: "center",
};

export const mutedTextStyle: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontSize: "13px",
  lineHeight: "1.6",
  color: MUTED,
  margin: "12px 0 0",
  textAlign: "center",
};

/* ─── Button style ────────────────────────────────────────────────────────── */
export const primaryBtnStyle: React.CSSProperties = {
  fontFamily: FONT_DISPLAY,
  fontWeight: 900,
  fontSize: "13px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  backgroundColor: SKY,
  color: WHITE,
  borderRadius: "100px",
  padding: "16px 44px",
  textDecoration: "none",
  display: "inline-block",
};

export const navyBtnStyle: React.CSSProperties = {
  ...primaryBtnStyle,
  backgroundColor: NAVY,
};

/* ─── Fonts component ─────────────────────────────────────────────────────── */
export function EmailFonts() {
  return (
    <>
      <Font
        fontFamily="Instrument Sans"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.gstatic.com/s/instrumentsans/v1/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GrkxSB7w.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
      <Font
        fontFamily="Instrument Sans"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://fonts.gstatic.com/s/instrumentsans/v1/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GrkxS37w.woff2",
          format: "woff2",
        }}
        fontWeight={600}
        fontStyle="normal"
      />
      <Font
        fontFamily="Mona Sans"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://github.githubassets.com/assets/mona-sans.woff2",
          format: "woff2",
        }}
        fontWeight={900}
        fontStyle="normal"
      />
      <Font
        fontFamily="Cal Sans"
        fallbackFontFamily="Arial"
        webFont={{
          url: "https://www.woutside.com/fonts/CalSans-Regular.ttf",
          format: "truetype",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </>
  );
}

/* ─── Header ──────────────────────────────────────────────────────────────── */
export function EmailHeader() {
  return (
    <>
      <Section style={{ padding: "28px 40px 24px" }}>
        <table cellPadding={0} cellSpacing={0} border={0} style={{ margin: "0 auto" }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: "middle" }}>
                <Img
                  src={`${SITE_URL}/favicon.png`}
                  alt="Out Mobility"
                  width={28}
                  height={28}
                  style={{ display: "block", borderRadius: "7px" }}
                />
              </td>
              <td style={{ paddingLeft: "9px", verticalAlign: "middle" }}>
                <span style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 900,
                  fontSize: "13px",
                  letterSpacing: "0.14em",
                  color: NAVY,
                }}>
                  OUT MOBILITY
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </Section>
      <Hr style={{ borderColor: BORDER, margin: 0 }} />
    </>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
interface EmailFooterProps {
  unsubscribeNote?: string;
}

export function EmailFooter({ unsubscribeNote }: EmailFooterProps) {
  return (
    <Section style={{
      backgroundColor: FOOTER_BG,
      padding: "28px 40px 32px",
      textAlign: "center",
    }}>
      {/* Small logo */}
      <table cellPadding={0} cellSpacing={0} border={0} style={{ margin: "0 auto 14px" }}>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "middle" }}>
              <Img
                src={`${SITE_URL}/favicon.png`}
                alt="Out Mobility"
                width={20}
                height={20}
                style={{ display: "block", borderRadius: "5px" }}
              />
            </td>
            <td style={{ paddingLeft: "7px", verticalAlign: "middle" }}>
              <span style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: NAVY,
              }}>
                OUT MOBILITY
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Links */}
      <Text style={{
        fontFamily: FONT_BODY,
        fontSize: "12px",
        color: MUTED,
        margin: "0 0 16px",
        textAlign: "center",
      }}>
        <Link href={SITE_URL} style={{ color: SKY, textDecoration: "none" }}>Website</Link>
        {"  ·  "}
        <Link href="https://x.com/OutMobility" style={{ color: SKY, textDecoration: "none" }}>X / Twitter</Link>
        {"  ·  "}
        <Link href="mailto:hello@woutside.com" style={{ color: SKY, textDecoration: "none" }}>hello@woutside.com</Link>
      </Text>

      <Hr style={{ borderColor: BORDER, margin: "0 0 16px" }} />

      <Text style={{
        fontFamily: FONT_BODY,
        fontSize: "11px",
        color: "#aabec8",
        margin: "0 0 4px",
        textAlign: "center",
        lineHeight: "1.6",
      }}>
        © 2026 Out Inc. All rights reserved.
      </Text>
      <Text style={{
        fontFamily: FONT_BODY,
        fontSize: "11px",
        color: "#aabec8",
        margin: 0,
        textAlign: "center",
        lineHeight: "1.6",
      }}>
        {unsubscribeNote ?? "You received this from Out Mobility. We only email when it matters."}
      </Text>
    </Section>
  );
}

/* ─── Divider ─────────────────────────────────────────────────────────────── */
export function EmailDivider() {
  return <Hr style={{ borderColor: BORDER, margin: "0 40px" }} />;
}

/* ─── Tag chip ────────────────────────────────────────────────────────────── */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{
      fontFamily: FONT_BODY,
      fontWeight: 600,
      fontSize: "11px",
      letterSpacing: "0.14em",
      color: SKY,
      textTransform: "uppercase",
      margin: "0 0 24px",
      textAlign: "center",
    }}>
      {children}
    </Text>
  );
}
