import React from "react";

const AboutImage = ({ item }) => {
  return (
    <div className="relative inline-block w-full max-w-xs p-2 cursor-pointer">
      <img className="block w-full h-96 " src={item} alt={""} />
    </div>
  );
};

export default AboutImage;
