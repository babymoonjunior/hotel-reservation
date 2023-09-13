import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChangeDatePicker } from "./ChangeDatePicker";

export default function ChangeDate() {
  return (
    <section className="flex flex-col justify-start items-center px-[72px] max-w-[1440px] h-[1028px] bg-[#F1F2F6]">
      <h1 className="w-[57%] font-mono text-[68px] font-medium leading-[125%] tracking-[-1.36px] self-start py-12">
        Change Check-in and Check-out Date
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

            {/* Original Date */}
            <div className=" flex flex-row">
              <div className="mr-8 my-8">
                <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                  Original Date
                </p>
                <span className="text-[#424C6B] font-sans text-base font-normal leading-[150%] tracking-[-0.32px]">
                  Th, 19 Oct 2022 - Th, 19 Oct 2022
                </span>
              </div>
            </div>

            {/* Change Date Calendar */}
            <div className="calendar-box flex flex-col justify-center bg-white p-3 rounded">
              <p className="text-[#424C6B] font-sans text-base font-semibold leading-[150%] tracking-[-0.32px]">
                Change Date
              </p>
              <div className="flex flex-row justify-between mt-4">
                <div>
                  <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-2">
                    Check In
                  </span>
                  <ChangeDatePicker />
                </div>
                <div className="text-[#2A2E3F] flex justify-center items-center ">
                  -
                </div>
                <div>
                  <span className="text-[#2A2E3F] font-sans text-base font-normal leading-[150%] py-2">
                    Check Out
                  </span>
                  <ChangeDatePicker />
                </div>
              </div>
            </div>
            {/* End Change Date Calendar */}

          </div>
          {/* End booking-details-section */}
        </div>
        {/* End image-booking-container */}

        {/* button group */}
        <div className="button-group flex flex-row justify-between pt-5 pb-10">
          <div className="left-btn">
            <Button
              variant="ghost"
              className="Cancel-Booking-Btn bg-[#F1F2F6] text-base not-italic font-semibold leading-4 w-fit"
            >
              Cancel
            </Button>
          </div>
          <div className="right-btn-group">
            <Button className="Change-Date-Btn text-base not-italic font-semibold leading-4 w-fit">
              Confirm Change Date
            </Button>
          </div>
        </div>
        {/* End button group */}

      </div>
      {/* End history-card */}
    </section>
  );
}
