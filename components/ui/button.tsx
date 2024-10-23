import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        golden: "bg-yellow-400 text-black",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-red-500 text-destructive-foreground hover:bg-red-600",
        destructive2:
          "bg-white text-red-500 border border-red-500 hover:bg-red-500/90 hover:text-white",
        outline:
          "border border-black bg-white hover:bg-gray-100 dark:text-black",
        dashboard: "hover:bg-zinc-200 text-black dark:text-white dark:hover:text-white dark:hover:bg-accent-foreground/10 dark:hover:text-accent-foreground",
        dashboardActive:
          "dark:bg-zinc-200 bg-zinc-800 text-white hover:bg-[#383838] dark:text-black dark:hover:bg-zinc-200",
        secondary:
          "bg-white text-black",
        ghost: "hover:text-accent-foreground hover:bg-accent-foreground/10",
        ghostDark: "hover:bg-zinc-600",
        blog: "hover:bg-custom-blue hover:text-accent-foreground border border-black rounded-md hover:text-[#FFF] hover:border-none",
        landing: "hover:bg-[#FBFBFB] hover:text-accent-foreground border border-zinc-400 rounded-md bg-[#FFF]",
        link: "text-black underline-offset-4 hover:underline",
        auth: "border-input bg-custom-blue text-white hover:bg-custom-blue-dark hover:text-white",
        board: "hover:bg-zinc-200 text-black dark:text-zinc-200 dark:hover:bg-zinc-700",
        boardActive: "bg-blue-500/20 text-blue-800",
        premium: "bg-zinc-100 text-blue-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-blue-500 dark:hover:bg-zinc-700 border-2 border-zinc-300 dark:border-zinc-700",
        selectOrg: "text-custom-blue hover:bg-accent",
        gratis: "bg-accent text-accent-foreground hover:bg-accent/90",
        starter: "bg-yellow-500 text-black hover:bg-yellow-600",
        business: "bg-[#1C1C1E] text-white hover:text-accent-foreground hover:bg-accent/90 border dark:border-zinc-500",
        icon: "hover:text-accent-foreground hover:bg-accent-foreground/10",
        iconActive: "bg-blue-500/20 text-blue-600 fill-white dark:bg-blue-500/30 dark:text-blue-400 dark:fill-white",
        magicAssist: "text-black hover:text-custom-blue",
        magicAssistActive: "text-custom-blue",
        aligned: "bg-white dark:bg-zinc-800 dark:hover:bg-zinc-700",
        alignedActive: "bg-accent/90 text-blue-500 dark:bg-zinc-800 dark:hover:bg-zinc-700",
        sketchlieBlue: "bg-blue-600 text-white hover:bg-blue-800",
        navbar: "text-black hover:bg-slate-100 rounded-lg",
        sketchify: "hover:bg-blue-500/20 hover:text-blue-800 text-purple-700 dark:text-purple-600 p-2 fill-purple-700 dark:fill-purple-600 hover:text-purple-600",
        infoIcons: "hover:text-accent-foreground hover:bg-accent-foreground/10",
        presentation: "hover:bg-blue-500/20 hover:text-blue-800 text-black dark:text-zinc-200 border border-black dark:border-white fill-white hover:fill-blue-500",
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
