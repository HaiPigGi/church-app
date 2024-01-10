import Image from "next/image";
function Footer(){
    return(
        <footer className="w-full h-64 md:h-52 md:mb-0 mb-12 flex-row md:flex md:justify-between items-center px-5 bg-secondary py-5">
            <div className="relative w-full md:block md:mb-0 flex justify-center mb-5">
                <Image
                src="/img/Logo.png"
                width={250}
                height={50}
                alt="logo gereja"
                objectFit="cover"
                />
            </div>
            <h1 className="text-pretty text-center md:text-right md:w-80">Jl. Pangeran Antasari No.18, Melak Ulu, Kec. Melak, Kabupaten Kutai Barat, Kalimantan Timur 75775</h1>
        </footer>
    )
};

export default Footer;