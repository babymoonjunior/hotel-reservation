import Image from "next/image";
import SpaIcon from "../../../../public/bx_spa.png";
import SaunaIcon from "../../../../public/bx_suana.png";
import FitnessIcon from "../../../../public/bx-fitness.png";
import LoungeIcon from "../../../../public/bx-lounge.png";
import WifiIcon from "../../../../public/bx_wifi.png";
import ParkingIcon from "../../../../public/bx_parking.png";
import OperationIcon from "../../../../public/bx_24operation.png";

const serviceData = [
  { imageSrc: SpaIcon, alt: "Spa", title: "Spa" },
  { imageSrc: SaunaIcon, alt: "Sauna", title: "Sauna" },
  { imageSrc: FitnessIcon, alt: "Fitness", title: "Fitness" },
  { imageSrc: LoungeIcon, alt: "Arrival Lounge", title: "Arrival Lounge" },
  { imageSrc: WifiIcon, alt: "Free Wifi", title: "Free Wifi" },
  { imageSrc: ParkingIcon, alt: "Parking", title: "Parking" },
  {
    imageSrc: OperationIcon,
    alt: "24 hours operation",
    title: "24 hours operation",
  },
];

export default function Services() {
  return (
    <section className="text-white bg-[#465C50] w-full py-20 flex justify-center items-center">
      <div className="flex flex-col items-center w-full mx-auto service-container max-w-7xl">
        <h1 className="font-mono text-[68px] font-medium leading-[125%] mb-9">
          Service & Facilities
        </h1>
        <div className="flex flex-row font-sans icon-container">
          {serviceData.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center icon-with-title-wrapper m-9"
            >
              <Image src={service.imageSrc} alt={service.alt} />
              <p className="icon-title">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
