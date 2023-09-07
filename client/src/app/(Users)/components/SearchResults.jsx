import Image from "next/image";
import RoomDetails from "./SearchRoomDetails";
import PriceDetails from "./SearchPriceDetails";
import Link from "next/link";

export default function SearchResultsPage({ roomDataArray }) {
  return (
    <section className="bg-utility-bg">
      <div className="w-full px-6 mx-auto main-container max-w-7xl">
        {roomDataArray.map((roomData, index) => (
          <div
            key={index}
            className="search-room-card bg-[#F7F7FB] h-[400px] flex justify-between p-6 font-sans border-b border-[#E4E6ED]"
          >
            <div className="image-box w-full max-w-[453px] h-auto relative mr-8">
              <Image
                src={roomData.main_image}
                alt={roomData.roomtypetitle}
                width={453}
                height={320}
                className="object-cover h-full"
              />
              <Link key={index} href={`/fullview/${roomData.room_type_id}`}>
                <div className="absolute bottom-0 flex items-center justify-center w-10 h-10 bg-white opacity-50 transparent-bg">
                  <div className="frame-link-image">
                    <Image
                      src="/Frame.png"
                      alt="See more image"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </Link>
            </div>
            {/* RoomDetails children component */}
            <RoomDetails
              roomTypeTitle={roomData.roomtypetitle}
              guests={roomData.guests}
              bedType={roomData.bedtype}
              roomArea={roomData.roomarea}
              description={roomData.description}
            />
            {/* PriceDetails children component */}
            <PriceDetails
              fullPrice={roomData.fullprice}
              discountPrice={roomData.discountprice}
              available_rooms_count={roomData.available_rooms_count}
              index={index}
              roomData={roomData}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
