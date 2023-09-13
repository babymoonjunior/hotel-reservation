import React from "react";

export default function StepHeader({ step }) {
  return (
    <article id="bookingroom" className="w-full mx-auto max-w-7xl">
      <h1 className="font-serif font-medium leading-tight text-7xl -tracking-wider">
        Booking Room
      </h1>
      <div className="flex gap-16 py-10 font-sans font-semibold border-b border-gray-300">
        <div className="inline-flex items-center gap-4">
          <p
            className={`py-3 text-3xl leading-normal text-center  ${
              step === 1
                ? `bg-orange-500 text-white`
                : `text-orange-500 bg-orange-100`
            }  rounded-md px-7 -tracking-widest`}
          >
            1
          </p>
          <p
            className={`text-xl leading-normal ${
              step === 1 ? `text-orange-500` : `text-gray-900`
            } -tracking-widest`}
          >
            Basic Information
          </p>
        </div>
        <div className="inline-flex items-center gap-4">
          <p
            className={`py-3 text-3xl leading-normal text-center  ${
              step === 2
                ? `bg-orange-500 text-white`
                : `text-orange-500 bg-orange-100`
            }  rounded-md px-7 -tracking-widest`}
          >
            2
          </p>
          <p
            className={`text-xl leading-normal ${
              step === 2 ? `text-orange-500` : `text-gray-900`
            }  -tracking-widest`}
          >
            Special Request
          </p>
        </div>
        <div className="inline-flex items-center gap-4">
          <p
            className={`py-3 text-3xl leading-normal text-center  ${
              step === 3
                ? `bg-orange-500 text-white`
                : `text-orange-500 bg-orange-100`
            }  rounded-md px-7 -tracking-widest`}
          >
            3
          </p>
          <p
            className={`text-xl leading-normal ${
              step === 3 ? `text-orange-500` : `text-gray-900`
            } -tracking-widest`}
          >
            Payment Method
          </p>
        </div>
      </div>
    </article>
  );
}
