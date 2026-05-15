import { cn } from "@/lib/utils";

interface OutLogoProps {
  size?: number;
  className?: string;
  bg?: string;
}

export default function OutLogo({ size = 44, className, bg = "#00aeef" }: OutLogoProps) {
  return (
    <div
      className={cn("rounded-[8px] flex items-center justify-center flex-shrink-0 overflow-hidden", className)}
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      <img
        src="/images/out-mark.png"
        alt="Out"
        width={size * 0.45}
        height={size * 0.26}
        className="object-contain"
        style={{ width: size * 0.45, height: "auto" }}
      />
    </div>
  );
}
