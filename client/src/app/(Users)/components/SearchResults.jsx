import Image from "next/image";
import RoomDetails from "./SearchRoomDetails";
import PriceDetails from "./SearchPriceDetails";
import Link from "next/link";

export default function SearchResultsPage({ roomDataArray }) {
  return (
    <section>
      <div className="main-container bg-[#F7F7FB] w-full max-w-[1440px] h-auto p-[100px]">
        {roomDataArray.map((roomData, index) => (
          <div
            key={index}
            className="search-room-card bg-[#F7F7FB] h-[400px] flex justify-between font-sans py-10 border-b border-[#E4E6ED]"
          >
            <div className="image-box w-full max-w-[453px] h-auto relative mr-8">
              <Image
                src={roomData.main_image}
                alt={roomData.roomtypetitle}
                width={453}
                height={320}
                className="object-cover h-full"
              />
              <Link key={index} href={`/fullview/${index}`}>
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
      </div>
    </div>
    </section>
  );
}
