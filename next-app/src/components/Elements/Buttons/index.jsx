import { cva } from "class-variance-authority";

const clsButton = cva(["rounded-sm block  text-center py-2 cursor-pointer font-semibold"],{
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
                "text-black"
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
                "w-24",
                "text-xl"
            ],
            small: [
                "px-5",
                "w-20",
                "text-sm"
            ]
        }
    }
})

function Button({children, size, intent, href, className} ) {
    return(
        <a href={href} className={clsButton({intent, size})+" "+className}>{children}</a>
    )
};

export default Button;