import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"




const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative size-32",
            className
        )}
        {...props}
    >
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            {/* Background Circle */}
            <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                className="stroke-current text-gray-200"
                strokeWidth="2"
            />
            {/* Progress Circle */}
            <ProgressPrimitive.Indicator
                asChild
            >
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-primary transition-all"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="100"
                    style={{
                        strokeDashoffset: `${100 - (value || 0)}`
                    }}
                />
            </ProgressPrimitive.Indicator>
        </svg>

        {/* Percentage Text */}
        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-2xl font-bold text-primary">{value}%</span>
        </div>
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
