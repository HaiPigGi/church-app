import Image from "next/image";

function BeritaCard({src, title, desc}){
    return(
        <div className=" border shadow-xl mx-auto w-full max-w-[500px] md:w-4/5 mb-5 bg-white rounded-xl overflow-hidden">
            <div className="flex justify-center items-center ">
                <div className="relative w-full min-w-36 max-w-56 h-36 md:w-36 md:h-36 rounded-xl overflow-hidden me-2">
                    <Image
                    src={src}
                    fill={true}
                    className="object-cover"
                    />
                </div>
                <div className="p-2 w-96">
                    <h1 className="line-clamp-2 text-base font-bold ">{title}</h1>
                    <p className="line-clamp-3 text-base font-light">{desc}</p>
                </div>
            </div>
        </div>
    )
};

export default BeritaCard;