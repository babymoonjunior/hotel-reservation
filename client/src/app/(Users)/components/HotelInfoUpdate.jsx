"use client";

import { Button } from "@/components/ui/button";
import UploadLogo from "./UploadLogo";

export default function HotelInfoUpdate() {
  return (
    <>
      <section className="flex flex-col w-full max-w-[1440px] font-sans">
        <div className="hotel-navbar flex flex-row justify-between items-center bg-white py-4 px-[60px]">
          <h1 className="text-[#2A2E3F] text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            Hotel Information
          </h1>
          <Button>Update</Button>
        </div>
        <div className="grey-bg bg-[#F6F7FC] w-full px-[60px] pt-10">
          <div className="form-container bg-red-300 pt-10 px-[80px]">
            <form className="flex flex-col">
              <labe className="text-[#2A2E3F] text-base font-normal leading-[150%]">
                Hotel name *
              </labe>
              <input className=" rounded border border-[#D6D9E4] text-black text-base font-normal leading-[150%] p-3 mb-10 focus:outline-none" />
              <label className="text-[#2A2E3F] text-base font-normal leading-[150%] ">
                Hotel description *
              </label>
              <textarea
                className=" rounded border border-[#D6D9E4] text-[#646D89] text-base font-normal leading-[150%] tracking-[-0.32px] p-3 mb-10 focus:outline-none"
                name="message"
                rows="10"
              >
              </textarea>
              <label className="text-[#2A2E3F] text-base font-normal leading-[150%]">
                Hotel logo *
              </label>
              <div className="mb-[60px]">
              <UploadLogo />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
