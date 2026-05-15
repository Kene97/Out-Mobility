"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWaitlist } from "@/context/WaitlistContext";

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const SPRING = { type: "spring" as const, stiffness: 420, damping: 26 };

export default function CTAButton({ children, className, href, onClick }: CTAButtonProps) {
  const { openWaitlist } = useWaitlist();

  const base = cn(
    "relative inline-flex items-center justify-center overflow-hidden",
    "bg-[#00aeef] text-white rounded-[16px]",
    "font-display font-black uppercase tracking-wide select-none cursor-pointer",
    "px-10 py-5 text-[18px]",
    "transition-colors hover:bg-[#00c4ff]",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap:   { scale: 0.97 },
    transition: SPRING,
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={base} onClick={onClick ?? openWaitlist} {...motionProps}>
      {children}
    </motion.button>
  );
}
