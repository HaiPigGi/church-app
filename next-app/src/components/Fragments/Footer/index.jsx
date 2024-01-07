import Image from "next/image";
function Footer(){
    return(
        <footer className="snap-always snap-center w-full h-50 flex justify-between items-center px-5 bg-secondary py-5">
            <Image
            src="/img/Logo.png"
            width={250}
            height={50}
            alt="logo gereja"
            />
            <h1 className="text-pretty text-right w-80">Jl. Pangeran Antasari No.18, Melak Ulu, Kec. Melak, Kabupaten Kutai Barat, Kalimantan Timur 75775</h1>
        </footer>
    )
};

export default Footer;