"use client";
import React, { useEffect, useState, useRef } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Image from "next/image";

const CustomerSay = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const slideLeft = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const slideRight = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const showSlides = () => {
      setSlideIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    };

    const slideInterval = setInterval(showSlides, 2000); // Change image every 8 seconds

    return () => {
      clearInterval(slideInterval); // Clean up the interval on component unmount
    };
  }, []);

  const slides = [
    {
      text: "1 Corinthians 15:58 - Therefore, my beloved brothers, be steadfast, immovable, always abounding in the work of the Lord, knowing that in the Lord your labor is not in vain.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Andrew_Tate_-_James_Tamim_Upload_%28Cropped_Wide_Portrait%29.png",
      author: "Cobra, Company®",
    },
    {
      text: "Proverbs 3:5-6 - Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
      image:
        "https://media.cnn.com/api/v1/images/stellar/prod/230824205731-gallery-only-donald-trump-mugshot-082423-02.jpg?c=original&q=h_618,c_fill",
      author: "Trump, Company®",
    },
    {
      text: "1 Corinthians 16:13-14 - Be watchful, stand firm in the faith, act like men, be strong. Let all that you do be done in love.",
      image:
        "https://i.pinimg.com/280x280_RS/68/ca/0a/68ca0ae899ec189877302ac1f71d2374.jpg",
      author: "Justin, Company®",
    },
  ];

  const dotClassNames = ["dot", "dot", "dot"];

  dotClassNames[slideIndex] = "dot bg-gray-900";
  dotClassNames.forEach((className, index) => {
    if (index !== slideIndex) {
      dotClassNames[index] = "dot bg-gray-500";
    }
  });

  let iconStyles = { color: "orange", fontSize: "1.5em" };

  return (
    <>
      <section className="flex justify-center items-center w-full h-[752px] bg-[#E9ECED]">
        <div className="flex justify-center items-center w-full max-w-7xl h-[450px] ">
          <div className=" flex flex-col  justify-center items-center w-full h-[449px]">
            <h1 className="text-center font-serif text-[68px]   font-medium leading-[85px]  text-green-800">
              Our Customer Says
            </h1>

            <div className="flex flex-col py-9 items-center text-[10px] w-full h-[292px]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`mySlides fade ${
                    index === slideIndex ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-col items-center w-full h-[188px]">
                    <div className=" w-full relative mx-auto h-[188px] align-center ">
                      <div className="absolute flex items-center justify-between w-full -translate-y-1/2 top-1/2">
                        <Image // ปุุ่มซ้าย
                          src={"/arrowLeft.png"}
                          width={56}
                          height={56}
                          onClick={slideLeft}
                          style={iconStyles}
                          className="z-10 rounded-full opacity-50 cursor-pointer hover:opacity-100"
                          size={40}
                        />
                        <Image // ปุ่มขวา
                          src={"/arrowRight.png"}
                          width={56}
                          height={56}
                          onClick={slideRight}
                          style={iconStyles}
                          className="z-10 rounded-full opacity-50 cursor-pointer hover:opacity-100 "
                          size={40}
                        />
                      </div>

                      <div className="flex items-center w-full max-w-5xl py-12 text-ellipsis">
                        <h5 className="text-green-700 w-full px-20 font-semibold font-sans stacked-fractions text-center text-[20px]">
                          " {slide.text} "
                        </h5>
                      </div>
                    </div>
                    <div className="w-[207px] h-[32px] mt-[32px] flex justify-center items-center text-[16px] ">
                      <div className="flex justify-center ">
                        {/* i want change to small rounded image */}
                        <img
                          src={slide.image}
                          alt={slide.author}
                          className="rounded-full w-[32px] h-[32px] mr-2"
                        />
                      </div>
                      <div>{slide.author}</div>
                    </div>
                    <div className="text-center mt-[32px] ">
                      {dotClassNames.map((className, index) => (
                        <span
                          key={index}
                          className={
                            className +
                            " h-[8px] w-[8px] m-2 rounded-full inline-block"
                          }
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerSay;
