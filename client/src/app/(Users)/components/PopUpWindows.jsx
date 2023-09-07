import React from "react";
import { useAuth } from "../context/context.jsx";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Image from "next/image";

const PopUpwindows = () => {
  const { currentIndex, setCurrentIndex, modalOpen, setModalOpen } = useAuth();

  const roomDataArray = [
    {
      imageSrc: "/SuperiorGardenView.png",
      imageAlt: "Superior Garden View Main picture",
      imageWidth: 453,
      imageHeight: 320,
      roomTypeTitle: "Superior Garden View",
      guests: "2",
      bedType: "1 Double bed",
      roomArea: "20",
      description:
        "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
      fullPrice: "THB 3,100.00",
      discountPrice: "THB 2,500.00",
      status: "Available",
      Amenities: [
        "High speed internet connection",
        "Hairdryer",
        "Shower",
        "Minibar",
        "Telephone",
        "Ironing board",
        "A floor only accessible via a guest room key",
        "Alarm clock",
        "Bathrobe",
      ],
    },
    {
      imageSrc: "/Deluxe.png",
      imageAlt: "Deluxe",
      imageWidth: 453,
      imageHeight: 320,
      roomTypeTitle: "Deluxe",
      guests: "4",
      bedType: "1 Double bed",
      roomArea: "40",
      description:
        "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
      fullPrice: "THB 3,100.00",
      discountPrice: "THB 2,500.00",
      status: "Not Available",
      Amenities: [
        "High speed internet connection",
        "Hairdryer",
        "Shower",
        "Minibar",
        "Telephone",
        "Ironing board",
        "A floor only accessible via a guest room key",
        "Alarm clock",
        "Bathrobe",
      ],
    },
    {
      imageSrc: "/Superior.png",
      imageAlt: "Superior",
      imageWidth: 453,
      imageHeight: 320,
      roomTypeTitle: "Superior",
      guests: "3",
      bedType: "1 Double bed",
      roomArea: "32",
      description:
        "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
      fullPrice: "THB 3,100.00",
      discountPrice: "THB 2,500.00",
      status: "Available",
      Amenities: [
        "roman",
        "greece",
        "nobody",
        "matrix",
        "Telephone",
        "Ironing board",
        "A floor only accessible via a guest room key",
        "Alarm clock",
        "Bathrobe",
      ],
    },
    {
      imageSrc: "/Supreme.png",
      imageAlt: "Supreme",
      imageWidth: 453,
      imageHeight: 320,
      roomTypeTitle: "Supreme",
      guests: "2",
      bedType: "1 Double bed",
      roomArea: "32",
      description:
        "Rooms (36sqm) with full garden views, 1 single bed, bathroom with bathtub & shower.",
      fullPrice: "THB 3,100.00",
      discountPrice: "THB 2,500.00",
      status: "Available",
      Amenities: [
        "king",
        "queen",
        "jack",
        "spade",
        "nine",
        "Ironing board",
        "A floor only accessible via a guest room key",
        "Alarm clock",
        "Bathrobe",
      ],
    },
  ];

  const prevSlide = () => {
    const newIndex =
      (currentIndex - 1 + roomDataArray.length) % roomDataArray.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % roomDataArray.length;
    setCurrentIndex(newIndex);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      id="myModal"
      className={`modal ${modalOpen ? "block" : "hidden"} absolute z-10`}
    >
      <div className="modal-content bg-white p-4 rounded-lg shadow-lg">
        {/* Close button (X) */}
        {/* <span className="close absolute top-0 right-0 p-4 cursor-pointer">
                &times;
              </span> */}
        <section>
          {/* Content to display inside the modal */}
          <section className="flex justify-center">
            <div className="flex flex-col w-[800px] justify-center items-center  ">
              <div className="flex w-full  h-[60px] pl-0 justify-between items-center gap-[22px]   ">
                <div className="text-[20px] font-semibold ml-[80px]  ">
                  {roomDataArray[currentIndex].roomTypeTitle}
                </div>
                <div className="w-[60px] h-[60px] cursor-pointer">
                  <Image
                    src={"/exit.svg"}
                    width={60}
                    height={60}
                    alt="Exit"
                    onClick={closeModal}
                  />
                </div>
              </div>
              <section className="flex flex-col items-center  w-[800px] h-[517px] overflow-y-auto   justify-center  ">
                <section className="flex flex-col items-center    ">
                  <div className="flex flex-col justify-end  h-[650px] w-[640px]  relative group  ">
                    <div
                      style={{
                        backgroundImage: `url(${roomDataArray[currentIndex].imageSrc})`,
                      }}
                      className="w-[640px] h-[400px] bg-center bg-cover duration-500 rounded-[4px] relative"
                    >
                      {/* Left arrow */}
                      <div className="hidden group-hover:block absolute  top-1/2 -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsChevronCompactLeft onClick={prevSlide} size={30} />
                      </div>
                      {/* Right arrow */}
                      <div className="hidden group-hover:block absolute top-1/2 -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                        <BsChevronCompactRight onClick={nextSlide} size={30} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="flex gap-4 mt-[37px] ">
                        <div>
                          <span className="text-[#646D89]">
                            {roomDataArray[currentIndex].guests} Person
                          </span>
                        </div>
                        <div>
                          <span className="text-[#646D89]">
                            {roomDataArray[currentIndex].bedType} Double bed
                          </span>
                        </div>
                        <div>
                          <span className="text-[#646D89]">
                            {roomDataArray[currentIndex].roomArea} sqm
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[16px] mb-[40px]  ">
                      <p className="text-[#646D89]">
                        {roomDataArray[currentIndex].description}
                      </p>
                    </div>
                    <hr />
                    <div>
                      <div className="flex flex-col gap-[22px]  justify-between   ">
                        <h2>Room Amenities</h2>
                        <ul className="list-disc grid grid-cols-2 gap-x-6 pl-5 text-[#646D89]">
                          {roomDataArray[currentIndex].Amenities.map(
                            (amenity, index) => (
                              <li key={index}>{amenity}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default PopUpwindows;
