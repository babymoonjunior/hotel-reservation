import Image from "next/image";
import BookingAccordion from "./BookingAccordion";
import BookingHistoryBTN from "./BookingHistoryBTN";

export default function BookingHistory() {
  return (
    <section className="flex flex-col justify-center items-center px-[72px] max-w-[1440px] h-auto bg-[#F1F2F6]">
      <h1 className="font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px]  self-start py-16">
        Booking History
      </h1>
      <div className="history-card flex flex-col w-full border-b border-[#E4E6ED] ">
        <div className="image-booking-container flex flex-row pt-10">
          {/* ใส่รูป */}
          <div className="image-section w-full max-w-[357px] h-[210px] mr-10">
            <Image
              src="/superior-w453.png"
              alt="Superior"
              width={453}
              height={320}
              className="object-cover h-full"
            />
          </div>
          <div className="booking-details-section w-full">
            {/* room title */}
            <div className="title-container flex flex-row justify-between items-center w-full">
              <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">
                Superior Garden View
              </p>
              <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                Booking date: Tue, 16 Oct 2022
              </span>
            </div>

            {/* check-in-out-table */}
            <div className="check-in-out-container flex flex-row">
              <div className="check-in-box mr-8 my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                  Check-in
                </p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                  Th, 19 Oct 2022 | After 2:00 PM
                </span>
              </div>
              <div className="check-out-box my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                  Check-out
                </p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                  Fri, 20 Oct 2022 | Before 12:00 PM
                </span>
              </div>
            </div>

            {/* booking detail accordion */}
            <BookingAccordion />
          </div>
          {/* End booking-details-section */}
        </div>
        {/* End image-booking-container */}

        {/* button group */}
        <BookingHistoryBTN />
      </div>
      {/* End history-card */}
    </section>
  );
}
