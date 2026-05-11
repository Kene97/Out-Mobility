import { cn } from "@/lib/utils";

interface AppStoreBadgesProps {
  className?: string;
  size?: "default" | "sm";
}

export default function AppStoreBadges({ className, size = "default" }: AppStoreBadgesProps) {
  const h = size === "sm" ? "h-[30px]" : "h-[40px]";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* App Store */}
      <a
        href="#"
        aria-label="Download on the App Store"
        className={cn(
          "flex items-center gap-2 bg-black border border-[#a6a6a6] rounded-lg px-3",
          h
        )}
      >
        <AppleLogo size={size === "sm" ? 14 : 18} />
        <div className="flex flex-col leading-none">
          <span className="text-white text-[9px] font-medium">Download on the</span>
          <span className="text-white text-[13px] font-semibold">App Store</span>
        </div>
      </a>

      {/* Google Play */}
      <a
        href="#"
        aria-label="Get it on Google Play"
        className={cn(
          "flex items-center gap-2 bg-black border border-[#a6a6a6] rounded-md px-3",
          h
        )}
      >
        <GooglePlayLogo size={size === "sm" ? 14 : 18} />
        <div className="flex flex-col leading-none">
          <span className="text-white text-[9px] font-medium">Get it on</span>
          <span className="text-white text-[13px] font-semibold">Google Play</span>
        </div>
      </a>
    </div>
  );
}

function AppleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path fill="#ea4335" d="M3.18 23.75c.37.2.8.2 1.19-.02l11.05-6.37-2.4-2.4z" />
      <path fill="#fbbc04" d="M20.32 10.43l-2.9-1.68-2.69 2.68 2.69 2.68 2.93-1.69a1.65 1.65 0 0 0 0-2.99z" />
      <path fill="#4285f4" d="M3.18.25A1.64 1.64 0 0 0 2.5 1.6v20.8c0 .54.28 1.01.68 1.35l.08.07 11.67-11.67v-.28z" />
      <path fill="#34a853" d="M15.42 12l-12.24 12.24c.19.1.4.16.63.14.22-.02.44-.1.62-.21L15.42 18 17.88 16.5z" />
    </svg>
  );
}
