import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    <div className="main-container bg-gray-700 w-full max-w-[1440px] h-[2636px] px-[100px]">
      {roomDataArray.map((roomData, index) => (
        <div key={index} className="search-room-card bg-sky-400 h-[320px] flex justify-between font-sans my-10">
          <div className="image-box bg-lime-600 w-full max-w-[453px] h-auto relative mr-10">
            <Image
              src={roomData.imageSrc}
              alt={roomData.imageAlt}
              width={roomData.imageWidth}
              height={roomData.imageHeight}
              className="object-cover h-full"
            />
            <div className="transparent-bg w-10 h-10 bg-white flex items-center justify-center opacity-50 absolute bottom-0">
              <div className="frame-link-image">
                <Image src="/Frame.png" alt="See more image" width={24} height={24} />
              </div>
            </div>
          </div>
          <div className="room-details bg-purple-300 w-full max-w-[320px] text-base py-5">
            <h1 className="room-type-title col-span-3 text-[28px] font-semibold leading-[150%]">
              {roomData.roomTypeTitle}
            </h1>
            <div className="size-box flex text-[#646D89] my-2">
              <div className="amount-person border-r border-[#C8CCDB] flex items-center font-normal pr-4">
                {roomData.guests} Guests
              </div>
              <div className="type-bed border-r border-[#C8CCDB] flex items-center font-normal px-4">
                {roomData.bedType}
              </div>
              <div className="room-area flex items-center font-normal px-4">
                {roomData.roomArea} sqm
              </div>
            </div>
            <p className="rooms-description col-span-3 font-normal text-[#646D89] py-6">
              {roomData.description}
            </p>
          </div>
          <div className="price-button-container bg-pink-400 flex flex-col items-end justify-between py-5">
            <div className="price-box flex flex-col items-end">
              <p className="full-price line-through text-[#646D89] text-base font-normal">
                {roomData.fullPrice}
              </p>
              <p className="discount-price text-[#2A2E3F] text-xl font-semibold leading-[150%]">
                {roomData.discountPrice}
              </p>
            </div>
            <div className="unit-text-box text-base text-[#646D89] font-normal flex flex-col items-end">
              <p className="per-night">Per Night</p>
              <p className="include-tax">(Including Taxes & Fees)</p>
            </div>
            <div className={`status-box ${roomData.status === "Not Available" ? "bg-[#FFE5E5] text-[#A50606]" : "bg-[#E5FFFA] text-[#006753]"} rounded w-fit h-8 flex items-center px-3 py-1`}>
              {roomData.status}
            </div>
            <div className="button-wrapper flex flex-row">
              <Button variant="secondary" className="border-none mx-6">
                Room Detail
              </Button>
              <Button>Book Now</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
