import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BookingAccordion() {
  return (
    <div className="booking-detail-accordion">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#E4E6ED] px-6 text-[#2A2E3F] font-sans text-base font-semibold leading-4">
            Booking Detail
          </AccordionTrigger>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              2 Guests (1 Night)
            </span>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Payment success via
              <span className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                {" "}
                Credit Card - *888
              </span>
            </span>
          </AccordionContent>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Superior Garden View Room
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
              2,500.00
            </span>
          </AccordionContent>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Airport tranfer
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
              200.00
            </span>
          </AccordionContent>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Promotion Code
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
              -400.00
            </span>
          </AccordionContent>
          <AccordionContent className="border-t border-solid border-gray-400">
            <span className="pt-2 text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Total
            </span>
            <span className="pt-1 text-[#2A2E3F] font-sans text-xl font-semibold leading-[150%] tracking-[-0.4px]">
              THB 2,300.00
            </span>
          </AccordionContent>
          <AccordionContent innerClassName="flex-col bg-[#D6D9E4] items-start">
            <p className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px] py-3">
              Additional Request
            </p>
            <p className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px] py-1">
              Can i have some chocolate?
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
