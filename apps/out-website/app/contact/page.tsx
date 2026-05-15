"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WaitlistProvider } from "@/context/WaitlistContext";
import WaitlistModal from "@/components/ui/WaitlistModal";

const inquiryTypes = [
  "I want to advertise",
  "I want to join the fleet",
  "Press / media",
  "Investor relations",
  "Partnership",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", type: inquiryTypes[0], message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <WaitlistProvider>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="px-4 py-16 md:px-8 md:py-24 xl:px-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-[600px]">
              <h1
                className="font-black uppercase text-[#003a50] leading-[0.92] mb-4"
                style={{
                  fontFamily: "var(--font-mona-sans)",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                Get in touch.
              </h1>
              <p className="text-[16px] text-[#003a50]/60 mb-10"
                style={{ fontFamily: "var(--font-instrument-sans)" }}>
                Whether you want to advertise, join the fleet, or just ask a question — we read every message.
              </p>

              {status === "sent" ? (
                <div className="bg-[#f6fcff] border border-[#00aeef]/20 rounded-2xl p-10 text-center">
                  <p
                    className="text-[#003a50] font-black uppercase mb-2"
                    style={{ fontFamily: "var(--font-mona-sans)", fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                  >
                    Message received.
                  </p>
                  <p className="text-[14px] text-[#003a50]/60"
                    style={{ fontFamily: "var(--font-instrument-sans)" }}>
                    We'll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-[#003a50]"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border border-[#003a50]/15 rounded-xl px-4 py-3 text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] transition-colors"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-[#003a50]"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="border border-[#003a50]/15 rounded-xl px-4 py-3 text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] transition-colors"
                        style={{ fontFamily: "var(--font-instrument-sans)" }}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#003a50]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="border border-[#003a50]/15 rounded-xl px-4 py-3 text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] transition-colors"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}
                      placeholder="Your company"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#003a50]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      What&apos;s this about?
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="border border-[#003a50]/15 rounded-xl px-4 py-3 text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] transition-colors bg-white"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-[#003a50]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="border border-[#003a50]/15 rounded-xl px-4 py-3 text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] transition-colors resize-none"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}
                      placeholder="Tell us what you need..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-[13px]"
                      style={{ fontFamily: "var(--font-instrument-sans)" }}>
                      Something went wrong. Email us directly at hello@woutside.com
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="bg-[#003a50] hover:bg-[#00aeef] text-white font-black uppercase rounded-xl py-4 px-8 text-[15px] transition-colors disabled:opacity-50"
                    style={{ fontFamily: "var(--font-mona-sans)", letterSpacing: "-0.02em" }}
                  >
                    {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WaitlistModal />
    </WaitlistProvider>
  );
}
