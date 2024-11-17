import { cn } from "@/lib/utils"

export const CanvasOverlayWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div
            className={cn(
                "shadow-md rounded-md p-1 h-12",
                "bg-white dark:bg-zinc-800",
                "border border-zinc-200 dark:border-zinc-800",
                "flex items-center pointer-events-auto",
                className
            )}
        >
            {children}
        </div>
    )
}