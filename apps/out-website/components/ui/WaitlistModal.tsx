"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWaitlist } from "@/context/WaitlistContext";

const roles = [
  "CMO / Marketing Lead",
  "Founder / CEO",
  "Agency / Media Buyer",
  "Brand Manager",
  "Other",
];

const overlayVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 8,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function resetForm() {
    setFullName("");
    setEmail("");
    setCompany("");
    setRole("");
    setFormState("idle");
    setErrorMsg("");
  }

  function handleClose() {
    closeWaitlist();
    setTimeout(resetForm, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email, company, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setFormState("error");
      } else {
        setFormState("success");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setFormState("error");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0, 58, 80, 0.82)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="card"
            variants={cardVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative w-full max-w-[520px] bg-white rounded-[32px] overflow-hidden shadow-2xl"
          >
            {/* Navy top bar accent */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#003a50] via-[#00aeef] to-[#003a50]" />

            <div className="px-8 pt-8 pb-10 md:px-10">

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-[#003a50]/50 hover:text-[#003a50] hover:bg-[#f6fcff] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <SuccessState key="success" onClose={handleClose} />
                ) : (
                  <FormContent
                    key="form"
                    fullName={fullName}
                    email={email}
                    company={company}
                    role={role}
                    formState={formState}
                    errorMsg={errorMsg}
                    setFullName={setFullName}
                    setEmail={setEmail}
                    setCompany={setCompany}
                    setRole={setRole}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Success State ── */
function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center gap-5 py-4"
    >
      {/* Checkmark */}
      <div className="w-16 h-16 rounded-full bg-[#f6fcff] border border-[#cceffc] flex items-center justify-center">
        <motion.svg
          width="28" height="28" viewBox="0 0 28 28" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          <motion.path
            d="M6 14.5l5.5 5.5L22 9"
            stroke="#00aeef"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          />
        </motion.svg>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-[26px] text-[#003a50] leading-[1.2]">
          You're on the list.
        </h3>
        <p className="text-[14px] text-[#003a50]/70 leading-[1.6] max-w-[340px]">
          We'll reach out the moment Out Mobility launches. In the meantime, follow us on{" "}
          <a href="https://x.com/OutMobility" target="_blank" rel="noopener noreferrer" className="text-[#00aeef] font-medium hover:underline">
            @OutMobility
          </a>{" "}
          for updates.
        </p>
      </div>

      <button
        onClick={onClose}
        className="mt-2 px-8 py-3 rounded-2xl bg-[#003a50] text-white text-[14px] font-semibold hover:bg-[#004762] transition-colors"
      >
        Done
      </button>
    </motion.div>
  );
}

/* ── Form Content ── */
interface FormContentProps {
  fullName: string;
  email: string;
  company: string;
  role: string;
  formState: FormState;
  errorMsg: string;
  setFullName: (v: string) => void;
  setEmail: (v: string) => void;
  setCompany: (v: string) => void;
  setRole: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function FormContent({
  fullName, email, company, role, formState, errorMsg,
  setFullName, setEmail, setCompany, setRole, onSubmit,
}: FormContentProps) {
  const isLoading = formState === "loading";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[#00aeef]" />
          <span className="text-[12px] font-semibold text-[#00aeef] uppercase tracking-[0.08em]">
            Early Access
          </span>
        </div>
        <h2 className="font-heading text-[28px] md:text-[32px] text-[#003a50] leading-[1.2]">
          Get in before we launch.
        </h2>
        <p className="text-[14px] text-[#003a50]/65 leading-[1.6]">
          Be first to run campaigns across 6,000+ verified ride-hail vehicles.
          We'll notify you the moment we go live.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Full name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wl-name" className="text-[13px] font-semibold text-[#003a50]">
            Full Name <span className="text-[#00aeef]">*</span>
          </label>
          <input
            id="wl-name"
            type="text"
            required
            placeholder="Jane Smith"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-[#cceffc] bg-[#f6fcff] text-[14px] text-[#003a50] placeholder-[#003a50]/30 outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/15 transition-all disabled:opacity-50"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="wl-email" className="text-[13px] font-semibold text-[#003a50]">
            Email Address <span className="text-[#00aeef]">*</span>
          </label>
          <input
            id="wl-email"
            type="email"
            required
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-[#cceffc] bg-[#f6fcff] text-[14px] text-[#003a50] placeholder-[#003a50]/30 outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/15 transition-all disabled:opacity-50"
          />
        </div>

        {/* Company + Role row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="wl-company" className="text-[13px] font-semibold text-[#003a50]">
              Company / Brand
              <span className="ml-1 text-[11px] font-normal text-[#003a50]/40">(optional)</span>
            </label>
            <input
              id="wl-company"
              type="text"
              placeholder="Acme Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-[#cceffc] bg-[#f6fcff] text-[14px] text-[#003a50] placeholder-[#003a50]/30 outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/15 transition-all disabled:opacity-50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="wl-role" className="text-[13px] font-semibold text-[#003a50]">
              Your Role
              <span className="ml-1 text-[11px] font-normal text-[#003a50]/40">(optional)</span>
            </label>
            <select
              id="wl-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-[#cceffc] bg-[#f6fcff] text-[14px] text-[#003a50] outline-none focus:border-[#00aeef] focus:ring-2 focus:ring-[#00aeef]/15 transition-all disabled:opacity-50 appearance-none cursor-pointer"
            >
              <option value="">Select role…</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error message */}
        {formState === "error" && errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[13px] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"
          >
            {errorMsg}
          </motion.p>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={isLoading ? {} : { scale: 1.015 }}
          whileTap={isLoading ? {} : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="relative w-full flex items-center justify-center gap-2 bg-[#00aeef] hover:bg-[#00c4ff] text-white rounded-2xl px-8 py-4 font-display font-black uppercase tracking-wide text-[16px] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Spinner />
              Joining…
            </>
          ) : (
            "JOIN THE WAITLIST"
          )}
        </motion.button>

        <p className="text-center text-[12px] text-[#003a50]/40">
          No spam. We'll only email you when it matters.
        </p>
      </form>
    </motion.div>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="3" />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
