import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  borderColor?: "pink" | "cyan" | "green" | "yellow" | "blue" | "red";
  hover?: boolean;
  onClick?: () => void;
}

export default function NeonCard({
  children,
  className,
  borderColor = "cyan",
  hover = true,
  onClick,
}: NeonCardProps) {
  const borderColors = {
    pink:
      "border-[rgba(255,0,110,0.14)] hover:border-[rgba(255,0,110,0.34)] hover:shadow-[0_0_35px_rgba(255,0,110,0.08)]",
    cyan:
      "border-[rgba(0,245,255,0.14)] hover:border-[rgba(0,245,255,0.34)] hover:shadow-[0_0_35px_rgba(0,245,255,0.08)]",
    green:
      "border-[rgba(57,255,20,0.14)] hover:border-[rgba(57,255,20,0.32)] hover:shadow-[0_0_35px_rgba(57,255,20,0.08)]",
    yellow:
      "border-[rgba(255,214,10,0.15)] hover:border-[rgba(255,214,10,0.34)] hover:shadow-[0_0_35px_rgba(255,214,10,0.08)]",
    blue:
      "border-[rgba(0,102,255,0.15)] hover:border-[rgba(0,102,255,0.34)] hover:shadow-[0_0_35px_rgba(0,102,255,0.08)]",
    red:
      "border-[rgba(255,0,51,0.15)] hover:border-[rgba(255,0,51,0.34)] hover:shadow-[0_0_35px_rgba(255,0,51,0.08)]",
  };

  return (
    <div
      className={cn(
        "relative rounded-[1.5rem] border backdrop-blur-md",
        "bg-card/70 p-6 transition-all duration-300",
        hover && "hover:-translate-y-1 hover:bg-card/85",
        borderColors[borderColor],
        onClick &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
