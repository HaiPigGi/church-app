export default function ModalKonfirmasi({ actionAcc, actionDecline }) {
  return (
    <div
      id="bgModal"
      className="absolute z-40 top-0 left-0 box-border w-full h-full flex justify-center items-center"
    >
      <div className="relative min-w-[350px] max-w-[500px] min-h-[250px] md:min-w-[350px] shadow-xl md:max-w-[500px] p-5 h-auto w-auto bg-white z-50 rounded-xl flex justify-center items-center">
        <div>
          <h1 className="text-xl font-semibold text-pretty text-center w-2/3 mx-auto">
            Apakah yakin ingin melanjutkan proses?
          </h1>
          <div className="flex justify-center items-center mt-3">
            <button
              onClick={actionAcc}
              className="px-5 py-2 text-white rounded-md bg-green-500 hover:bg-green-300 me-3 "
            >
              Lanjut
            </button>
            <button
              onClick={actionDecline}
              className="px-5 py-2 text-white rounded-md bg-red-500 hover:bg-red-300 "
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
