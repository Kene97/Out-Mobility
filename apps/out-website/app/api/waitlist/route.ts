import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
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
        await resend.emails.send({
          from: "Out Mobility <waitlist@outmobility.co>",
          to: [email.trim().toLowerCase()],
          subject: "You're on the list — Out Mobility",
          react: WaitlistConfirmation({ firstName: full_name.trim() }),
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
