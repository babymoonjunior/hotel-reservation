import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-open-sans font-sm",
  {
    variants: {
      variant: {
        default:
          "bg-orange-600 text-white hover:bg-orange-500 active:bg-orange-800 disabled:bg-gray-300",
        secondary:
          "bg-white text-orange-500 border border-orange-500 hover:border-orange-400 hover:bg-white hover:text-orange-400 active:text-orange-600 active:border-orange-600 active:bg-white disabled:text-gray-400 disabled:border-gray-400 disabled:bg-white",
        ghost:
          "bg-white text-orange-500 hover:bg-white hover:text-orange-400 active:bg-white active:text-orange-400 disabled:bg-white disabled:text-gray-400",
      },
      size: {
        default: "h-[48px] w-[126px] px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
