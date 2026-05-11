"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  size?: "default" | "sm";
  fullWidth?: boolean;
}

export default function CTAButton({
  children,
  className,
  href,
  size = "default",
  fullWidth = false,
}: CTAButtonProps) {
  const base = cn(
    "relative inline-flex items-center justify-center overflow-hidden",
    "bg-[#00aeef] text-white rounded-2xl",
    "font-display font-black uppercase tracking-wide select-none cursor-pointer",
    "transition-colors hover:bg-[#00c4ff]",
    size === "default"
      ? "px-12 py-6 text-xl"
      : "px-4 py-6 text-base",
    fullWidth && "w-full",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.015 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 420, damping: 26 },
  };

  if (href) {
    return (
      <motion.a href={href} className={base} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={base} {...motionProps}>
      {children}
    </motion.button>
  );
}
