import Image from "next/image";
import Link from "next/link";

function BeritaCard({data}){
    return(
        <Link href={`/pages/berita/${data.id}`} data-testid="pathnameTest" className=" border shadow-xl mx-auto w-full max-w-[500px] md:w-4/5 mb-5 bg-white rounded-xl overflow-hidden">
            <div className="flex justify-center items-center ">
                <div className="relative w-full min-w-36 max-w-56 h-36 md:w-36 md:h-36 rounded-xl overflow-hidden me-2">
                    <Image
                    src={data.imgPath}
                    fill={true}
                    className="object-cover"
                    alt={data.title}
                    data-testid="imgTest"
                    />
                </div>
                <div className="p-2 w-96">
                    <h1 className="line-clamp-2 text-base font-bold " data-testid="titleTest">{data.title}</h1>
                    <p className="line-clamp-3 text-base font-light" data-testid="descTest">{data.desc}</p>
                </div>
            </div>
        </Link>
    )
};

export default BeritaCard;