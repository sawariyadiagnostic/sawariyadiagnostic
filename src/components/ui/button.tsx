import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-xs sm:text-sm font-bold tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5C75] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer select-none min-w-0 max-w-full",
  {
    variants: {
      variant: {
        default: "btn-primary",
        primary: "btn-primary",
        emerald: "btn-emerald",
        gold: "btn-gold",
        secondary: "btn-secondary",
        outline: "btn-outline",
        destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm",
        ghost: "hover:bg-teal-50 hover:text-[#0A6E5C] text-slate-700",
        link: "text-[#0D5C75] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 sm:h-13 px-7 sm:px-8 text-xs sm:text-sm",
        xl: "h-14 px-8 py-3.5 text-sm sm:text-base",
        icon: "h-10 w-10 p-0 rounded-full",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
