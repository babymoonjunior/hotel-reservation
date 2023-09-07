import React from "react";

const AboutImage = ({ item }) => {
  return (
    <div className="w-[400px] inline-block cursor-pointer relative p-2">
      <img className="w-[400px]  h-[500px] block " src={item} alt={""} />
    </div>
  );
};

export default AboutImage;
