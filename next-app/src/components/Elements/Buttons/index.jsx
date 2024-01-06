import { cva } from "class-variance-authority";

const clsButton = cva(["rounded-sm  text-center py-2"],{
    variants: {
        intent: {
            primary: [
                "bg-primary",
                "hover:bg-primary-200",
                "duration-500",
                "text-white",
            ],
            secondary: [
                "bg-secondary",
                "hover:bg-secondary-200",
                "duration-500",
                "text-white"
            ]
        },
        size: {
            full: [
                "w-full",
                "block",
                "text-xl",
            ],
            large: [
                "px-5",
                "text-xl"
            ],
            small: [
                "px-5",
                "text-sm"
            ]
        }
    }
})

function Button({children, size, intent, href} ) {
    return(
        <a href={href} className={clsButton({intent, size})}>{children}</a>
    )
};

export default Button;