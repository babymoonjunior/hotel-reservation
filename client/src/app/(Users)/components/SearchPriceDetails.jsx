import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookNow from "./BookNowBTN";
import { AuthProvider, useAuth } from "../context/context.jsx";
import PopUpwindows from "./PopUpWindows";

export default function PriceDetails(props) {
  const { fullPrice, discountPrice, status, index } = props;
  const available_rooms_count = 2;

  const { currentIndex, setCurrentIndex, modalOpen, setModalOpen } = useAuth();
  console.log(modalOpen);

  // Function to open the modal
  const openModal = () => {
    setModalOpen((prev) => {
      return !prev;
    });
  };

  return (
    <div className="price-button-container bg-[#F7F7FB] flex flex-col items-end justify-between py-5">
      <div className="price-box flex flex-col items-end">
        <p className="full-price line-through text-[#646D89] text-base font-normal">
          {fullPrice}
        </p>
        <p className="discount-price text-[#2A2E3F] text-xl font-semibold leading-[150%]">
          {discountPrice}
        </p>
      </div>
      <div className="unit-text-box text-base text-[#646D89] font-normal flex flex-col items-end">
        <p className="per-night">Per Night</p>
        <p className="include-tax">(Including Taxes & Fees)</p>
      </div>
      <div
        className={`${
          available_rooms_count <= 2 && available_rooms_count > 0
            ? "bg-[#fbb3b3] text-[#A50606]"
            : ""
        } rounded w-fit h-8 flex items-center px-3 py-1`}
      >
        {available_rooms_count <= 2 && available_rooms_count > 0
          ? `เหลืออีก ${available_rooms_count} ห้องสุดท้าย`
          : null}
      </div>

      {/* กลุ่ม button */}
      <div className="button-wrapper flex flex-row">
        <Button
          onClick={openModal}
          variant="secondary"
          className="border-none mx-6 bg-[#F7F7FB]"
        >
          Room Detail
        </Button>

        {/* <Link href={`/fullview/${index}`} >
        <Button>Book Now</Button>
      </Link> */}
        <BookNow />
        {openModal && <PopUpwindows />}
      </div>
    </div>
  );
}
