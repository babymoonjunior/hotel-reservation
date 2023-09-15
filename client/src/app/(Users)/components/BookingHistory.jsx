import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
              <p className="room-title font-sans text-black text-[28px] font-semibold leading-[150%] tracking-[-0.56px]">Superior Garden View</p>
              <span className="text-[#9AA1B9] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Booking date: Tue, 16 Oct 2022</span>
            </div>
            {/* check-in-out-table */}
            <div className="check-in-out-container flex flex-row">
              <div className="check-in-box mr-8 my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">Check-in</p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Th, 19 Oct 2022 | After 2:00 PM</span>
              </div>
              <div className="check-out-box my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">Check-out</p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Fri, 20 Oct 2022 | Before 12:00 PM</span>
              </div>
            </div>
            {/* booking detail accordion */}
            <div className="booking-detail-accordion">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="bg-[#E4E6ED] px-6 text-[#2A2E3F] font-sans text-base font-semibold leading-4">Booking Detail</AccordionTrigger>
                  <AccordionContent>
                    <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">2 Guests (1 Night)</span>
                    <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Payment success via
                    <span className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]"> Credit Card - *888</span></span>
                  </AccordionContent>
                  <AccordionContent>
                    <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Superior Garden View Room</span>
                    <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">2,500.00</span>
                  </AccordionContent>
                  <AccordionContent>
                    <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Airport tranfer</span>
                    <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">200.00</span>
                  </AccordionContent>
                  <AccordionContent>
                    <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Promotion Code</span>
                    <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">-400.00</span>
                  </AccordionContent>
                  <AccordionContent className="border-t border-solid border-gray-400">
                    <span className="pt-2 text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">Total</span>
                    <span className="pt-1 text-[#2A2E3F] font-sans text-xl font-semibold leading-[150%] tracking-[-0.4px]">THB 2,300.00</span>
                  </AccordionContent>
                  <AccordionContent innerClassName="flex-col bg-[#D6D9E4] items-start">
                    <p className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px] py-3">Additional Request</p>
                    <p className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px] py-1">Can i have some chocolate?</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          {/* End booking-details-section */}
        </div>
        {/* End image-booking-container */}

        {/* button group */}
        <div className="button-group flex flex-row justify-between pt-5 pb-10">
          <div className="left-btn">
            <Button variant="ghost" className="Cancel-Booking-Btn text-base not-italic font-semibold leading-4 w-fit">
              Cancel Booking
            </Button>
          </div>
          <div className="right-btn-group">
            <Button variant="ghost" className="Room-Detail-Btn text-base not-italic font-semibold leading-4 w-fit">
              Room Detail
            </Button>
            <Button className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit">Change Date</Button>
          </div>
        </div>
      </div>
      {/* End history-card */}
    </section>
  );
}
