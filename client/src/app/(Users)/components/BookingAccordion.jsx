import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useDateAndCurrencyHook from "@/hook/useDateAndCurrencyHook";

export default function BookingAccordion(props) {
  const {
    guests,
    night,
    payment_method,
    roomtypetitle,
    fullprice,
    special_request,
    promotion,
    total_price,
    additional,
    discountprice
  } = props;

  const { convertDate, formatNumberWithCommasAndTwoDecimals, convertPrice } = useDateAndCurrencyHook();

  return (
    <div className="booking-detail-accordion">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-[#E4E6ED] px-6 text-[#2A2E3F] font-sans text-base font-semibold leading-4">
            Booking Detail
          </AccordionTrigger>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              {guests===null ? 0: guests} Guests ({night===null ? 0 : night} Night)
            </span>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Payment success via
              <span className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                {" "}
                {payment_method}
              </span>
            </span>
          </AccordionContent>
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
            {roomtypetitle} Room
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
            {formatNumberWithCommasAndTwoDecimals(fullprice)}
            </span>
          </AccordionContent>

          {special_request.map((special,index)=>(
          <AccordionContent key={index}>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              {special}
              {/* {console.log(special_request)} */}
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
              {convertPrice(special)}
            </span>
          </AccordionContent>
          ))}
          <AccordionContent>
            <span className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Promotion Code
            </span>
            <span className="text-[#2A2E3F] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
            {/* {promotion === null ? "" : formatNumberWithCommasAndTwoDecimals(promotion)} */}
            {discountprice-fullprice}
            </span>
          </AccordionContent>
          <AccordionContent className="border-t border-solid border-gray-400">
            <span className="pt-2 text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
              Total
            </span>
            <span className="pt-1 text-[#2A2E3F] font-sans text-xl font-semibold leading-[150%] tracking-[-0.4px]">
              THB {formatNumberWithCommasAndTwoDecimals(total_price)}
            </span>
          </AccordionContent>
          <AccordionContent innerClassName="flex-col bg-[#D6D9E4] items-start">
            <p className="text-[#646D89] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px] py-3">
              Additional Request
            </p>
            <p className="text-[#646D89] font-sans text-base font-normal leading-[150%] tracking-[-0.32px] py-1">
             {additional}
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
// Credit Card - *888