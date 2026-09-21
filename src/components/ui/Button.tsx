import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "outline" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-soft-lg",
  accent:
    "bg-accent text-white hover:bg-accent-dark shadow-soft hover:shadow-soft-lg",
  outline:
    "bg-white text-primary border-2 border-primary hover:bg-primary-light",
  ghost: "bg-white/90 text-ink hover:bg-white",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-3 text-base min-h-11",
  lg: "px-7 py-4 text-lg min-h-14",
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Comp = as || "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 active:scale-95 hover:-translate-y-0.5",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </Comp>
  );
}
