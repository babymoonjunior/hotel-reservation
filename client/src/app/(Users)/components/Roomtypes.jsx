import Image from "next/image";
import Link from "next/link";
import arrow from "../../../../public/arrow.png";
import getSixRoom from "@/lib/getSixRoom";

export default async function Roomtypes() {
  let roomImages;
  try {
    const res = await getSixRoom();
    roomImages = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="w-full" id="roomsuit">
      <div className="container flex flex-col items-center w-full py-32 max-w-7xl">
        <h1 className="room-title text-[#2F3E35] font-mono text-[68px] font-medium leading-[125%] pb-14">
          Rooms & Suits
        </h1>
        <div className="grid-gallory-container grid grid-cols-[443px_100px_auto] grid-rows-[540px_400px_338px_338px] gap-2.5">
          {roomImages.map((room, index) => (
            <div
              key={index}
              className={`room${index} relative hover:scale-110 transition-all ease-in-out cursor-pointer hover:z-50`}
            >
              <Link href={`/roomdetail/${room.room_type_id}`}>
                <Image
                  src={room.main_image}
                  alt={room.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpg;base64,base64-encoded-blurred-image-data"
                  className="object-cover w-full h-full"
                />
                <div className="text-with-btn-wrapper w-full max-w-[70%] text-white drop-shadow-2xl bg-transparent absolute left-8 bottom-14">
                  <h1 className="room-name font-mono text-[34px] font-medium leading-[125%] py-4">
                    {room.roomtypetitle}
                  </h1>

                  <button className="explore-btn cursor-pointer bg-transparent border-[none] outline-none flex justify-start items-center w-full max-w-[70%] h-10 text-[16px] font-semibold leading-4 font-sans">
                    Explore Room
                    <Image src={arrow} alt="Explore Room" className="ml-2" />
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
