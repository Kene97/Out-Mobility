import { cn } from "@/lib/utils";

interface OutLogoProps {
  size?: number;
  className?: string;
}

export default function OutLogo({ size = 44, className }: OutLogoProps) {
  return (
    <div
      className={cn(
        "bg-[#00aeef] rounded-[8px] flex items-center justify-center flex-shrink-0 select-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-black leading-none"
        style={{
          fontFamily: "var(--font-mona-sans)",
          fontSize: size * 0.34,
          letterSpacing: "-0.03em",
        }}
      >
        OUT
      </span>
    </div>
  );
}
