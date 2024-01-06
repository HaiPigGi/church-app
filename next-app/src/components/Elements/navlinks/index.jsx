
function NavLinks({href, children}){
    return(
        <a href={href} className="text-black text-md text-center mx-2 relative after:absolute after:transition-all after:duration-500 after:w-0  after:hover:w-full after:h-[110%] after:left-0 after:border-b-2 after:border-secondary">{children}</a>
    )
};

export default NavLinks;