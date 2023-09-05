import Image from "next/image";
import RoomDetails from "./RoomDetails";
import PriceDetails from "./PriceDetails";
import Link from 'next/link';

const roomDataArray = [
  {
    imageSrc: "/superior-garden-view.png",
    imageAlt: "Superior Garden View Main picture",
    imageWidth: 453,
    imageHeight: 320,
    roomTypeTitle: "Superior Garden View",
    guests: "2",
    bedType: "1 Double bed",
    roomArea: "32",
    description:
      "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
    fullPrice: "THB 3,100.00",
    discountPrice: "THB 2,500.00",
    status: "Available",
  },
  {
    imageSrc: "/deluxe.png",
    imageAlt: "Deluxe",
    imageWidth: 453,
    imageHeight: 320,
    roomTypeTitle: "Deluxe",
    guests: "2",
    bedType: "1 Double bed",
    roomArea: "32",
    description:
      "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
    fullPrice: "THB 3,100.00",
    discountPrice: "THB 2,500.00",
    status: "Not Available",
  },
  {
    imageSrc: "/superior-w453.png",
    imageAlt: "Superior",
    imageWidth: 453,
    imageHeight: 320,
    roomTypeTitle: "Superior",
    guests: "2",
    bedType: "1 Double bed",
    roomArea: "32",
    description:
      "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
    fullPrice: "THB 3,100.00",
    discountPrice: "THB 2,500.00",
    status: "Available",
  },
  {
    imageSrc: "/supreme-w543.png",
    imageAlt: "Supreme",
    imageWidth: 453,
    imageHeight: 320,
    roomTypeTitle: "Supreme",
    guests: "2",
    bedType: "1 Double bed",
    roomArea: "32",
    description:
      "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
    fullPrice: "THB 3,100.00",
    discountPrice: "THB 2,500.00",
    status: "Available",
  },
];

export default function SearchResultsPage() {
  return (
    <div className="main-container bg-[#F7F7FB] w-full max-w-[1440px] h-auto p-[100px]">
      {roomDataArray.map((roomData, index) => (
        <div
          key={index}
          className="search-room-card bg-[#F7F7FB]  h-[400px] flex justify-between font-sans py-10 border-b border-[#E4E6ED]"
        >
          <div className="image-box w-full max-w-[453px] h-auto relative mr-8">
            <Image
              src={roomData.imageSrc}
              alt={roomData.imageAlt}
              width={roomData.imageWidth}
              height={roomData.imageHeight}
              className="object-cover h-full"
            />
            <Link href="/fullview">
            <div className="transparent-bg w-10 h-10 bg-white flex items-center justify-center opacity-50 absolute bottom-0">
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
            roomTypeTitle={roomData.roomTypeTitle}
            guests={roomData.guests}
            bedType={roomData.bedType}
            roomArea={roomData.roomArea}
            description={roomData.description}
          />
          {/* PriceDetails children component */}
          <PriceDetails
            fullPrice={roomData.fullPrice}
            discountPrice={roomData.discountPrice}
            status={roomData.status}
          />
        </div>
      ))}
    </div>
  );
}
