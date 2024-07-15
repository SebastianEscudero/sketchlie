import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-red-500/90",
        outline:
          "border border-black bg-white hover:bg-gray-100",
        dashboard: "dark:hover:bg-[#383838] dark:text-white hover:bg-accent-foreground/10 hover:text-accent-foreground",
        dashboardActive:
          "bg-zinc-200 dark:bg-[#383838]/70 dark:text-white dark:hover:bg-[#383838]",
        secondary:
          "bg-white text-black",
        ghost: "hover:text-accent-foreground hover:bg-accent-foreground/10",
        ghostDark: "hover:bg-zinc-600",
        blog: "hover:bg-custom-blue hover:text-accent-foreground border border-black rounded-md hover:text-[#FFF] hover:border-none",
        landing: "hover:bg-[#FBFBFB] hover:text-accent-foreground border border-zinc-400 rounded-md bg-[#FFF]",
        link: "text-black underline-offset-4 hover:underline",
        auth: "border-input bg-custom-blue text-white hover:bg-custom-blue-dark hover:text-white",
        board: "hover:bg-blue-500/20 hover:text-blue-800 text-black dark:text-white",
        boardActive: "bg-blue-500/20 text-blue-800",
        premium: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
        selectOrg: "text-custom-blue hover:bg-accent",
        gratis: "bg-accent text-accent-foreground hover:bg-accent/90",
        starter: "bg-yellow-500 text-black hover:bg-yellow-600",
        business: "bg-[#1C1C1E] text-white hover:text-accent-foreground hover:bg-accent/90 border",
        icon: "hover:text-accent-foreground hover:bg-accent-foreground/10",
        iconActive: "bg-blue-600 text-white fill-white",
        magicAssist: "text-black hover:text-custom-blue",
        magicAssistActive: "text-custom-blue",
        aligned: "bg-white dark:bg-[#383838] dark:hover:bg-[#2C2C2C]",
        alignedActive: "bg-accent/90 text-blue-500 dark:bg-[#383838] dark:hover:bg-[#2C2C2C]",
        sketchlieBlue: "bg-blue-600 text-white hover:bg-blue-800",
        navbar: "text-black hover:bg-slate-100 rounded-lg"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
