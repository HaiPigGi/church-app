import Image from 'next/image';
import Link from 'next/link';
import { imageLoader } from '@/lib/ImageLoader';

function BeritaCard({ data }) {
  console.log(data.image);

  return (
    <Link
      href={`/pages/berita/${data.berita_id}`}
      data-testid="pathnameTest"
      className="block shadow-xl mx-auto w-full max-w-[500px] md:w-4/5 mb-5 bg-white/90 rounded-xl overflow-hidden"
    >
      <div className="flex justify-center items-center ">
        <div className="relative w-full min-w-36 max-w-56 h-36 md:w-36 md:h-36 rounded-xl overflow-hidden me-2">
          <Image
            src={imageLoader(data.image.path)}
            fill={true}
            className="object-cover"
            alt={data.title}
            data-testid="imgTest"
          />
        </div>
        <div className="p-2 w-96">
          <h1
            className="line-clamp-2 text-base font-bold "
            data-testid="titleTest"
          >
            {data.title}
          </h1>
          <p
            className="line-clamp-3 text-base font-light text-pretty"
            data-testid="descTest"
          >
            {data.content}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default BeritaCard;
