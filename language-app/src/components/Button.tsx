import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
    {
      variants: {
        variant: {
          default: 'bg-slate-900 text-white hover:bg-slate-800',
          outline: 'border border-slate-200 bg-transparent hover:bg-slate-100',
          ghost: 'bg-transparent hover:bg-slate-100',
          primary: 'bg-blue-600 text-white hover:bg-blue-700',
          danger: 'bg-red-600 text-white hover:bg-red-700',
          success: 'bg-green-600 text-white hover:bg-green-700'
        },
        size: {
          default: 'h-10 py-2 px-4',
          sm: 'h-9 px-2 rounded-md',
          lg: 'h-11 px-8 rounded-md'
        }
      },
      defaultVariants: {
        variant: 'default',
        size: 'default'
      }
    }
  );

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, ...props}, ref) =>
    {
        return (
            <button 
            className={cn(buttonVariants({ variant, size, className}))}
            ref={ref}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        ></circle>
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                </div>
            ) : (
                children
            )}
        </button>)
    }
);

Button.displayName = "Button";

export { Button, buttonVariants }; 