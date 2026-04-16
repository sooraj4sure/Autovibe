"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "gold",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase transition-all duration-300 select-none overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50";

    const variants = {
      gold: "bg-gold text-obsidian hover:bg-gold-light active:bg-gold-dark shadow-gold hover:shadow-gold-lg disabled:opacity-50 disabled:cursor-not-allowed",
      outline:
        "border border-gold/40 text-gold bg-transparent hover:bg-gold/10 hover:border-gold/70 disabled:opacity-40 disabled:cursor-not-allowed",
      ghost:
        "text-smoke bg-transparent hover:text-gold hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed",
      danger:
        "bg-red-600/90 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed",
    };

    const sizes = {
      sm: "text-[10px] px-4 py-2 rounded",
      md: "text-[11px] px-6 py-3 rounded",
      lg: "text-[12px] px-8 py-4 rounded-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer overlay on hover */}
        {variant === "gold" && (
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
        )}
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
