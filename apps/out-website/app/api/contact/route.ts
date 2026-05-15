import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, company, type, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const { error: dbError } = await supabase.from("contact_submissions").insert([
    {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      inquiry_type: type?.trim() || null,
      message: message.trim(),
    },
  ]);

  if (dbError) {
    console.error("contact insert error:", dbError);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  // Notify the team (non-blocking)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Out Mobility Contact <hello@app.woutside.com>",
        to: ["hello@woutside.com"],
        replyTo: email.trim().toLowerCase(),
        subject: `New contact: ${type ?? "General"} — ${name.trim()}`,
        text: [
          `New contact form submission`,
          ``,
          `Name:    ${name.trim()}`,
          `Email:   ${email.trim().toLowerCase()}`,
          `Company: ${company?.trim() || "—"}`,
          `Type:    ${type?.trim() || "—"}`,
          ``,
          `Message:`,
          message.trim(),
          ``,
          `Reply directly to this email to respond to ${name.trim()}.`,
        ].join("\n"),
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#003a50">
            <p style="font-size:12px;color:#888;margin-bottom:24px;text-transform:uppercase;letter-spacing:0.08em">New contact form submission</p>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#888;width:90px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px;font-weight:600">${name.trim()}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#888">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px"><a href="mailto:${email.trim().toLowerCase()}" style="color:#00aeef">${email.trim().toLowerCase()}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#888">Company</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px">${company?.trim() || "—"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:13px;color:#888">Type</td><td style="padding:8px 0;border-bottom:1px solid #eee;font-size:14px">${type?.trim() || "—"}</td></tr>
            </table>
            <p style="font-size:13px;color:#888;margin-bottom:6px">Message</p>
            <div style="background:#f9fafb;border-radius:8px;padding:16px;font-size:14px;line-height:1.65;white-space:pre-wrap">${message.trim()}</div>
            <p style="font-size:12px;color:#bbb;margin-top:24px">Reply directly to this email to respond to ${name.trim()}.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Contact notification email failed:", emailErr);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
