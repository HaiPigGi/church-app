import { cva } from "class-variance-authority";

const clsNavLinks = cva(["text-center mx-2 relative after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-[110%] after:left-0 after:border-b-2 after:border-secondary py-1"],{
    variants:{
        intent:{
            primary:"text-primary",
            secondary:"text-secondary",
            black:'text-black',
            netral:"text-slate-500"
        },
        size:{
            extraSmall:"text-xs",
            small:"text-sm",
            medium:"text-md",
            large:"text-lg",
            extraLarge:"text-xl"
        }
    }
})


function NavLinks({href, children, size, intent, className}){
    return(
        <a href={href} className={clsNavLinks({ size,intent })+" "+className}>{children}</a>
    )
};

export default NavLinks;