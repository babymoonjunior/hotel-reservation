import { Button } from "@/components/ui/button";

export default function PriceDetails(props) {
  const { fullPrice, discountPrice, status } = props;
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
        className={`status-box ${
          status === "Not Available"
            ? "bg-[#FFE5E5] text-[#A50606]"
            : "bg-[#E5FFFA] text-[#006753]"
        } rounded w-fit h-8 flex items-center px-3 py-1`}
      >
        {status}
      </div>
      <div className="button-wrapper flex flex-row">
        <Button variant="secondary" className="border-none mx-6 bg-[#F7F7FB]">
          Room Detail
        </Button>
        <Button>Book Now</Button>
      </div>
    </div>
  );
}
