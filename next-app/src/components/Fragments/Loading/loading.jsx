import { Audio,Puff ,CirclesWithBar} from 'react-loader-spinner'

 function Loading() {

  return (
    <div className="flex text-center justify-center items-center w-[100%] h-[100vh]">
        <CirclesWithBar
         height="100"
         width="100"
         color="#4fa94d"
         outerCircleColor="#4fa94d"
         innerCircleColor="#DBA150"
         barColor="#DBA150"
         ariaLabel="circles-with-bar-loading"
         wrapperStyle={{}}
         wrapperClass=""
         visible={true}
        />
    </div>
  );
}
export default Loading;