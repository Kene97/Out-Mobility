import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface OutLogoProps {
  size?: number;
  className?: string;
}

export default function OutLogo({ size = 44, className }: OutLogoProps) {
  return (
    <div
      className={cn(
        "bg-[#00aeef] rounded-[8px] flex items-center justify-center overflow-hidden flex-shrink-0",
        className
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={ASSETS.outMark}
        alt="Out"
        width={size * 0.45}
        height={size * 0.26}
        className="object-contain"
        style={{ width: size * 0.45, height: "auto" }}
      />
    </div>
  );
}
