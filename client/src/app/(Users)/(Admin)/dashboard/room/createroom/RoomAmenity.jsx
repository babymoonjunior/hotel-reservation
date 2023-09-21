"use client";
import { useState } from "react";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";

export default function RoomAmenity({ amenities, setAmenities }) {
  const [amenitiesValue, setAmenitiesValue] = useState("");
  const handleClickAddAmenities = () => {
    setAmenities([...amenities, amenitiesValue]);
    setAmenitiesValue("");
  };

  const handleAmenityChange = (e, index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = e.target.value;
    setAmenities(updatedAmenities);
  };

  const handleDeleteAmenity = (index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
  };
  return (
    <>
      {/* Start Amenities */}
      <div className="flex flex-col gap-10 py-10 border-b border-gray-300">
        <h2 className="text-xl font-semibold leading-normal text-gray-600 -tracking-wider">
          Room Amenities
        </h2>
        {amenities.map((item, index) => (
          <div key={index} className="flex items-center gap-6">
            <Image src={"/drag.svg"} width={26} height={76} />
            <div className="flex flex-col justify-center w-full gap-1">
              <label htmlFor={`Amenity-${index}`} className="text-gray-900">
                Amenity *
              </label>
              <input
                type="text"
                id={`Amenity-${index}`}
                value={item}
                onChange={(e) => handleAmenityChange(e, index)}
                className="w-full p-3 border border-gray-400 rounded-sm outline-none"
              />
            </div>
            <p
              className="text-orange-500 cursor-pointer"
              onClick={() => handleDeleteAmenity(index)}
            >
              Delete
            </p>
          </div>
        ))}

        <div className="flex items-center gap-6">
          <Image src={"/drag.svg"} width={26} height={76} />
          <div className="flex flex-col justify-center w-full gap-1">
            <label htmlFor="amenity" className="text-gray-900">
              Amenity *
            </label>
            <input
              type="text"
              id="amenity"
              value={amenitiesValue}
              onChange={(e) => {
                setAmenitiesValue(e.target.value);
              }}
              className="w-full p-3 border border-gray-400 rounded-sm outline-none"
            />
          </div>
        </div>
        <Button
          type="button"
          onClick={() => handleClickAddAmenities()}
          className={`${buttonVariants({
            variant: "secondary",
          })} w-fit px-8 ml-12`}
        >
          +Add Amenity
        </Button>
      </div>
      {/* End Amenities */}
    </>
  );
}
