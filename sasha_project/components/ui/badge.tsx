import * as React from "react";
import { cn } from "./utils";

// Badge variant styles
const badgeVariants = {
  variant: {
    default: "border-transparent bg-primary text-primary-foreground",
    secondary: "border-transparent bg-secondary text-secondary-foreground",
    destructive: "border-transparent bg-destructive text-white",
    outline: "text-foreground border-border",
  },
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants.variant;
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 transition-colors";
  
  const variantClasses = badgeVariants.variant[variant] || badgeVariants.variant.default;

  const badgeClasses = cn(baseClasses, variantClasses, className);

  if (asChild) {
    return <div className={badgeClasses} {...props} />;
  }

  return (
    <span
      className={badgeClasses}
      {...props}
    />
  );
}

export { Badge };