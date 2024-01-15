import BeritaLayout from "@/components/Layouts/BeritaLayout"
import Image from "next/image";

function BeritaPage({params}){
    // use params.beritaid to get the berita ID
    return(
        <BeritaLayout>
            <section className=" md:static md:col-span-3  w-full h-full px-5 py-5 md:px-14 overflow-y-auto">
                {/* image container */}
                <div className="relative w-full h-52 rounded-xl overflow-hidden">
                    <Image
                    src="/img/bgHero.jpeg"
                    fill={true}
                    alt="deskripsi"
                    className="object-cover "
                    />
                </div>
                <article className="px-4 mt-8">
                    <h1 className="text-2xl text-pretty font-bold">Penyelenggaraan Seminar Pemuda: Generasi Muda Berdaya</h1>
                    <p className="mt-5 text-pretty">
                        Komunitas pemuda menginisiasi sebuah acara seminar yang bertujuan untuk menggali potensi yang dimiliki oleh generasi muda. Dalam upaya menciptakan perubahan positif yang substansial, mereka berupaya untuk mengidentifikasi, mengembangkan, dan memanfaatkan kekuatan serta kreativitas yang dimiliki oleh generasi muda saat ini. Dengan fokus pada berbagai aspek kehidupan, seperti pendidikan, sosial, dan lingkungan, seminar ini diharapkan dapat menjadi wadah yang memotivasi pemuda untuk turut serta aktif dalam mewujudkan perubahan yang bermanfaat bagi masyarakat.
                        <br/>
                        <br/>
                        Melalui rangkaian diskusi, pemuda diharapkan dapat mengenali potensi mereka secara lebih mendalam serta menemukan solusi inovatif untuk permasalahan yang ada. Seminar ini diharapkan akan memberikan wawasan yang luas dan inspirasi kepada peserta, memungkinkan mereka untuk berkontribusi secara lebih aktif dalam menciptakan perubahan yang positif dalam lingkungan mereka, baik dalam skala lokal maupun lebih luas.
                    </p>
                </article>
            </section>

        </BeritaLayout>
    )
};

export default BeritaPage;