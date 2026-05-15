import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { render } from "@react-email/components";
import WaitlistConfirmation from "@/emails/WaitlistConfirmation";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await req.json();
    const { full_name, email, company, role } = body;

    if (!full_name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { error: dbError } = await supabase.from("waitlist_signups").insert([
      {
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        role: role || null,
      },
    ]);

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the waitlist!" },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send confirmation email (non-blocking — don't fail the request if email fails)
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const name = full_name.trim().split(" ")[0];
        const html = await render(WaitlistConfirmation({ firstName: full_name.trim() }));
        const text = [
          `Hey ${name},`,
          ``,
          `You're on the Out Mobility waitlist. We've received your entry.`,
          ``,
          `When we launch, you'll be among the first advertisers to go live — reaching verified passengers across 6,000+ vehicles in real time, with every impression proven, not guessed.`,
          ``,
          `Follow us on X for launch updates, network milestones, and early token news:`,
          `https://x.com/OutMobility`,
          ``,
          `Got a question? Reply to this email or reach us at hello@woutside.com — we read everything.`,
          ``,
          `— The Out Mobility team`,
          ``,
          `---`,
          `P.S. If this landed in Promotions, drag it to your Primary inbox so you don't miss our launch invite.`,
          ``,
          `Out Mobility · hello@woutside.com · https://www.woutside.com`,
          `You received this because you joined our advertiser waitlist.`,
        ].join("\n");

        await resend.emails.send({
          from: "Didi at Out Mobility <hello@app.woutside.com>",
          to: [email.trim().toLowerCase()],
          replyTo: "hello@woutside.com",
          subject: `Got your details, ${name} — you're in.`,
          html,
          text,
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
