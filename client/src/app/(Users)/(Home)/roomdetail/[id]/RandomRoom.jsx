import getRoomRandom from "@/lib/getRoomRandom";
import Image from "next/image";
import Link from "next/link";

async function RandomRoom() {
  const res = await getRoomRandom();
  const room = res.data;
  return (
    <article className="pt-10 pb-16 bg-green-200">
      <h2 className="font-sans text-5xl font-medium leading-tight text-center py-7 -tracking-normal">
        Other Rooms
      </h2>
      <div className="flex items-center justify-center w-full max-w-4xl gap-5 mx-auto py-7">
        {room.map((item, index) => (
          <div key={index} className="relative group">
            <Link href={`/roomdetail/${item.room_type_id}`}>
              <Image
                src={item.main_image}
                alt={item.roomtypetitle}
                className="object-cover h-64 transition-transform transform rounded-sm w-96 group-hover:scale-110"
                width={300}
                height={300}
              />
            </Link>
            <div className="absolute text-white transition-transform transform left-5 bottom-5 group-hover:scale-110">
              <p className="font-sans text-4xl font-medium ">
                {" "}
                {item.roomtypetitle}{" "}
              </p>
              <p className="font-bold font-open-sans ">Explore →</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default RandomRoom;
