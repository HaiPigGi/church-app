export default function ModalKonfirmasi({ children }) {
  return (
    <div
      id="bgModal"
      className="absolute z-40 top-0 box-border w-full h-full flex justify-center items-center"
    >
      <div className="relative min-w-[350px] max-w-[500px] min-h-[250px] md:min-w-[350px] shadow-xl md:max-w-[500px] p-5 h-auto w-auto bg-white z-50 rounded-xl flex justify-center items-center">
        <div>{children}</div>
      </div>
    </div>
  );
}
