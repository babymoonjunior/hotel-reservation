import React from "react";
import Image from "next/image";

const AboutMain = ({ customers }) => {
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  // Assuming you want to display the first customer's review
  const firstCustomerReview = customers.length > 0 ? customers[0].review : "";

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
    <div className="flex flex-col w-full h-[550px] ">
      <div className="relative w-[500px] top-[10%] left-[20%] p-4 md:p-8">
        <h1 className="text-[68px] text-green-800 font-[serif]">
          Neatly Hotel
        </h1>
        <div className="mt-[0px] absolute left-[40%]  w-[700px] h-[192px]">
          <p
            className="w-full h-[192px] text-[16px] text-sans text-gray-700"
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
  );
};

export default AboutMain;
