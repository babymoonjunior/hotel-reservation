import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function SearchResultsPage() {
  return (
    <div className="main-container bg-gray-700 w-full max-w-[1440px] h-[2636px]">
      <div className="main-card bg-sky-400 h-[320px] flex justify-between">
        <div className="image-box bg-lime-600">
          <Image
            src="/SuperiorGardenView-1024x683.jpg"
            alt="Superior Gaarden View Main picture"
            width={453}
            height={320}
          />
          <div className="transparent-bg">
            <Image
              src="/Frame.png"
              alt="See more image"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="room-details bg-amber-300">
          <h1 className="room-type">Superior Garden View</h1>
          <div className="size-room-container">
            <span className="amount-person">2 Guests</span>
            <span className="type-bed">1 Double bed</span>
            <span className="room-area">32 sqm</span>
          </div>
          <p className="rooms-description">
            Rooms (36sqm) with full garden views, 1 single bed, bathroom with
            bathtub & shower.
          </p>
        </div>
        <div className="price-button-container bg-red-300">
          <p className="full-price line-through">THB 3,100.00</p>
          <p className="discount-price">THB 2,500.00</p>
          <p className="per-night">Per Night</p>
          <p className="include-tax">(Including Taxes & Fees)</p>
          <div className="status-box bg-[#FFF9E5] rounded w-fit h-8 text-[#766A00] flex items-center">Occupied Clean Inspected</div>
          <Button variant="secondary" className="border-none">
            Room Detail
          </Button>
          <Button>Book Now</Button>
          </div>
      </div>
    </div>
  );
}
