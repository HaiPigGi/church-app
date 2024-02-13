import './cs.css';
export default function dasbor() {
  return (
    <div className="m-0 p-0 w-[100%] h-[100vh]">
      {/* <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-black bg-opacity-40 "></div> */}
      <video
        src="/img/jesus.mp4"
        autoPlay
        muted
        loop
        className="w-[100%] h-[100vh] object-cover"
      ></video>
      <div className="items-center justify-center  absolute w-[100%] h-[100%] top-0 flex flex-col ">
        <div className="text-center text-white">
          <h1 className=" font-bold mb-4 space-x-5 text-center text-4xl min-[360px]:max-[765px]:text-xl">
            <span className="individual-letter animation-delay-0">S</span>
            <span className="individual-letter animation-delay-1">E</span>
            <span className="individual-letter animation-delay-2">L</span>
            <span className="individual-letter animation-delay-3">A</span>
            <span className="individual-letter animation-delay-4">M</span>
            <span className="individual-letter animation-delay-5">A</span>
            <span className="individual-letter animation-delay-6">T</span>
            <span className="individual-letter animation-delay-7">&nbsp;</span>
            <span className="individual-letter animation-delay-8">D</span>
            <span className="individual-letter animation-delay-9">A</span>
            <span className="individual-letter animation-delay-10">T</span>
            <span className="individual-letter animation-delay-11">A</span>
            <span className="individual-letter animation-delay-12">N</span>
            <span className="individual-letter animation-delay-13">G</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
