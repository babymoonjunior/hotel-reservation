import React from "react";
import Image from "next/image";
import AboutRow from "./AboutRow";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// เปลี่ยน function เป็น async เพื่อรับ hotel description จาก Supabase, ลบ {customers} (Wen)
export default async function AboutMain() {

  const supabase = createServerComponentClient({cookies});
  let hotelInfo = null;

      let { data: hotel_info, error } = await supabase
        .from("hotel_info")
        .select()
        // .eq("id", 6)
        .single();
        // console.log(hotel_info);
      if (error) {
        console.log(error);
      }else{
      hotelInfo=hotel_info;
      }

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  //เปลี่ยนเป็นรับ hotel description มาจาก Supabase (Wen)
  const firstCustomerReview = hotelInfo.hotel_description; 

  const truncateStringWithLineBreaks = (str, num) => {
    if (str?.length > num) {
      let truncated = str.slice(0, num);

      // Find the last full stop within the truncated text
      const lastFullStopIndex = truncated.lastIndexOf(".");

      // Count the number of full stops within the truncated text
      const fullStopCount = (truncated.match(/\./g) || []).length;

      // Check if two full stops were found and add a line break if it exists
      if (fullStopCount >= 2) {
        truncated = truncated.slice(0, lastFullStopIndex + 1);
      }

      return (
        truncated +
        "<br>" +
        truncateStringWithLineBreaks(str.slice(truncated.length), num)
      );
    } else {
      return str;
    }
  };

  return (
    <section id="about">
      <div className="flex flex-col w-full py-16 mx-auto max-w-7xl">
        <div className="relative w-full max-w-5xl mx-auto">
          <h1 className="text-[68px] text-green-800 font-bold font-serif">
            Neatly Hotel
          </h1>
          <div className="float-right w-full max-w-3xl mt-10">
            <p
              className="w-full text-gray-700 text-sans"
              dangerouslySetInnerHTML={{
                __html: truncateStringWithLineBreaks(
                  firstCustomerReview,
                  150
                ).replace(/\./g, ".<br>"),
              }}
            />
          </div>
        </div>
      </div>
      {/* ลบ customers={customers} (Wen) */}
      <AboutRow  />
    </section>

  );
};


