import Image from "next/image";
function Footer(){
    return(
        <footer className="snap-always snap-center w-full h-50 flex justify-between items-center px-5 bg-transparent py-2">
            <Image
            src="/img/Logo.png"
            width={250}
            height={50}
            alt="logo gereja"
            />
        </footer>
    )
};

export default Footer;