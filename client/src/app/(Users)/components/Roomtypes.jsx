import Image from "next/image";
import Link from "next/link";
import superiorGardenView from "../../../../public/SuperiorGardenView-1024x683.jpg";
import deluxe from "../../../../public/deluxe.jpg";
import superior from "../../../../public/superior.jpg";
import premierSeaView from "../../../../public/premierseaview.jpg";
import supreme from "../../../../public/supreme.jpg";
import suite from "../../../../public/suits.webp";
import arrow from "../../../../public/arrow.png";

export default function Roomtypes() {
  const roomImages = [
    {
      imageSrc: superiorGardenView,
      alt: "Superior Garden View Room",
      grid: "col-[span_3]",
      type: "Superior Garden View",
    },
    {
      imageSrc: deluxe,
      alt: "Deluxe Room",
      grid: "col-[span_2]",
      type: "Deluxe",
    },
    { imageSrc: superior, alt: "Superior Room", grid: "", type: "Superior" },
    {
      imageSrc: premierSeaView,
      alt: "Premier Sea View Room",
      grid: "row-[span_2]",
      type: "Premier Sea View",
    },
    {
      imageSrc: supreme,
      alt: "Supreme Room",
      grid: "col-[span_2]",
      type: "Supreme",
    },
    { imageSrc: suite, alt: "Suite Room", grid: "col-[span_2]", type: "Suite" },
  ];

  return (
    <section className="max-w-[1440px] w-full h-[2100px] px-[160px] pt-[115px] pb-[178px] ">
      <div className="container flex flex-col items-center ">
        <h1 className="room-title text-[#2F3E35] font-mono text-[68px] font-medium leading-[125%] pb-14">
          Rooms & Suits
        </h1>
        <div className="grid-gallory-container grid grid-cols-[443px_100px_auto] grid-rows-[540px_400px_338px_338px] gap-2.5">
          {roomImages.map((room, index) => (
            <div
              key={index}
              className={`${room.grid === "" ? "" : room.grid} relative`}
            >
              <Image
                src={room.imageSrc}
                alt={room.alt}
                placeholder="blur"
                className="w-full h-full object-cover"
              />
              <div className="text-with-btn-wrapper w-full max-w-[70%] text-white drop-shadow-2xl bg-transparent absolute left-8 bottom-14">
                <h1 className="room-name font-mono text-[34px] font-medium leading-[125%] py-4">
                  {room.type}
                </h1>
                <Link href="/roomdetail">
                  <button className="explore-btn cursor-pointer bg-transparent border-[none] outline-none flex justify-start items-center w-full max-w-[70%] h-10 text-[16px] font-semibold leading-4 font-sans">
                    Explore Room
                    <Image src={arrow} alt="Explore Room" className="ml-2" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
