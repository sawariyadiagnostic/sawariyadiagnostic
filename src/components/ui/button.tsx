import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex ui-button min-h-11 items-center justify-center gap-[var(--control-gap)] font-bold tracking-wide ring-offset-background transition-surface duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155E9A] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none min-w-0 max-w-full",
  {
    variants: {
      variant: {
        default: "btn-primary",
        primary: "btn-primary",
        emerald: "btn-secondary",
        gold: "btn-primary",
        secondary: "btn-secondary",
        outline: "btn-outline",
        destructive: "bg-red-700 text-white hover:bg-red-800 shadow-sm",
        ghost: "hover:bg-blue-50 hover:text-[#155E9A] text-slate-700",
        link: "text-[#155E9A] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto min-h-11 px-5 py-2.5 text-[var(--font-action)] rounded-[var(--radius-control)]",
        sm: "h-auto min-h-11 px-3 py-2 text-[var(--font-action)] rounded-[var(--radius-control)]",
        lg: "h-auto min-h-11 sm:min-h-12 px-5 sm:px-6 text-sm rounded-[var(--radius-control)]",
        xl: "h-auto min-h-11 sm:min-h-14 px-6 sm:px-8 py-3 text-base rounded-[var(--radius-control)]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px] p-0 rounded-full text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp data-ui-size={size ?? "default"} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
