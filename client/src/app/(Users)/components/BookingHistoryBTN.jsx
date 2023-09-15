import { Button, buttonVariants } from "@/components/ui/button";

export default function BookingHistoryBTN() {
  return (
    <div className="button-group flex flex-row justify-between pt-5 pb-10">
      <div className="left-btn">
        <Button
          variant="ghost"
          className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
        >
          Cancel Booking
        </Button>
      </div>
      <div className="right-btn-group">
        <Button
          variant="ghost"
          className="Room-Detail-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit mr-2"
        >
          Room Detail
        </Button>
        <Button className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit">
          Change Date
        </Button>
      </div>
    </div>
  );
}
