import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"
import type { ButtonHTMLAttributes } from "react"

const btnVariants = cva(
    "inline-flex items-center justify-center rounded-xl md:rounded-2xl text-sm font-medium transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25",
                secondary: "bg-secondary text-white hover:bg-secondary/90",
                outline: "border border-input bg-background hover:bg-selection hover:text-accent-foreground",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                danger: "bg-danger text-white hover:bg-danger/90",
            },
            size: {
                sm: "h-8 px-3 text-xs",
                md: "h-10 px-4 py-2 text-sm",
                lg: "h-10 md:h-12 px-4 md:px-6 text-base",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger"
    size?: "sm" | "md" | "lg"
    fullWidth?: boolean
}

const Button = ({ variant = "primary", size = "md", fullWidth = false, className, children, ...props }: ButtonProps) => {
    return (
        <button
            className={cn(btnVariants({ variant, size, fullWidth }), className)}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button