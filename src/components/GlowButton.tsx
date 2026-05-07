import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  glowColor?: "pink" | "cyan" | "green" | "yellow";
  size?: "sm" | "md" | "lg";
}

export default function GlowButton({
  children,
  glowColor = "pink",
  size = "md",
  className,
  ...props
}: GlowButtonProps) {
  const glowColors = {
    pink:
      "border-[rgba(255,0,110,0.28)] bg-[rgba(255,0,110,0.08)] hover:border-[rgba(255,0,110,0.56)] hover:bg-[rgba(255,0,110,0.14)] hover:shadow-[0_0_25px_rgba(255,0,110,0.2)] focus-visible:ring-[rgba(255,0,110,0.6)]",
    cyan:
      "border-[rgba(0,245,255,0.28)] bg-[rgba(0,245,255,0.07)] hover:border-[rgba(0,245,255,0.56)] hover:bg-[rgba(0,245,255,0.13)] hover:shadow-[0_0_25px_rgba(0,245,255,0.18)] focus-visible:ring-[rgba(0,245,255,0.6)]",
    green:
      "border-[rgba(57,255,20,0.28)] bg-[rgba(57,255,20,0.07)] hover:border-[rgba(57,255,20,0.56)] hover:bg-[rgba(57,255,20,0.12)] hover:shadow-[0_0_25px_rgba(57,255,20,0.18)] focus-visible:ring-[rgba(57,255,20,0.6)]",
    yellow:
      "border-[rgba(255,214,10,0.3)] bg-[rgba(255,214,10,0.08)] hover:border-[rgba(255,214,10,0.58)] hover:bg-[rgba(255,214,10,0.14)] hover:shadow-[0_0_25px_rgba(255,214,10,0.2)] focus-visible:ring-[rgba(255,214,10,0.6)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full border font-semibold text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        glowColors[glowColor],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
