import Image from "next/image";

export default function RoomManageHeader() {
  return (
    <>
      <div className="flex justify-evenly gap-20 items-center h-20 sticky top-0 px-[60px] py-4 bg-utility-white font-sans font-semibold text-xl text-gray-900 shadow">
        <div>Room Management</div>
        <div className="flex justify-center items-center border border-gray-400 rounded-sm h-12 px-3 py-4 gap-4">
          <div className="flex justify-center items-center object-cover">
            <Image src="/search.svg" height={24} width={24} alt="search-icon" />
          </div>
          <input
            className="w-full h-6 outline-none font-normal"
            placeholder="Search ..."
          />
        </div>
      </div>
    </>
  );
}
