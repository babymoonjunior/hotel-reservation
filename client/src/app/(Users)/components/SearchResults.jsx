import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  return (
    <div className="main-container bg-gray-700 w-full max-w-[1440px] h-[2636px] px-[100px]">
      <div className="main-card bg-sky-400 h-[320px] flex justify-between font-sans">
        <div className="image-box bg-lime-600 w-full max-w-[453px] h-auto relative mr-10">
          <Image
            src="/superior-garden-view.png"
            alt="Superior Garden View Main picture"
            width={453}
            height={320}
            className="object-cover h-full"
          />
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
        </div>
        <div className="room-details bg-purple-300 w-full max-w-[320px] text-base py-5 ">
          <h1 className="room-type-title col-span-3 text-[28px] font-semibold leading-[150%]">
            Superior Garden View
          </h1>
          <div className="size-box flex text-[#646D89] my-2">
            <div className="amount-person border-r border-[#C8CCDB] flex items-center font-normal pr-4">
              2 Guests
            </div>
            <div className="type-bed border-r border-[#C8CCDB] flex items-center font-normal px-4">
              1 Double bed
            </div>
            <div className="room-area flex items-center font-normal px-4">
              32 sqm
            </div>
          </div>
          <p className="rooms-description col-span-3 font-normal text-[#646D89] py-6">
            Rooms (36sqm) with full garden views, 1 single bed, bathroom with
            bathtub & shower.
          </p>
        </div>
        <div className="price-button-container bg-pink-400 flex flex-col items-end justify-between py-5">
          <div className="price-box flex flex-col items-end">
            <p className="full-price line-through text-[#646D89] text-base font-normal">
              THB 3,100.00
            </p>
            <p className="discount-price text-[#2A2E3F] text-xl font-semibold leading-[150%]">
              THB 2,500.00
            </p>
          </div>
          <div className="unit-text-box text-base text-[#646D89] font-normal flex flex-col items-end">
            <p className="per-night">Per Night</p>
            <p className="include-tax">(Including Taxes & Fees)</p>
          </div>
          <div className="status-box bg-[#E5FFFA] rounded w-fit h-8 text-[#006753] flex items-center px-3 py-1">
            Available
          </div>
          <div className="button-wrapper flex flex-row">
            <Button variant="secondary" className="border-none mx-6">
              Room Detail
            </Button>
            <Button>Book Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
