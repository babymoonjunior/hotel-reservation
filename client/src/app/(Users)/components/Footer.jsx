//<Footer />

import Image from "next/image";
import neatlyLogo from "../../../../public/logo.png";
import fbIcon from "../../../../public/fb-icon-footer.png";
import instagramIcon from "../../../../public/instragram-icon-footer.png";
import twitterIcon from "../../../../public/twitter-icon-footer.png";
import telIcon from "../../../../public/tel-footer.png";
import emailIcon from "../../../../public/email-footer.png";
import pinIcon from "../../../../public/locationpin-footer.png";

export default function Footer() {
  // รายการรูปภาพและข้อมูลที่ต้องการแสดง
  const contactItems = [
    {
      imageSrc: telIcon,
      alt: "Tel number",
      text: "+66 99 999 9999",
    },
    {
      imageSrc: emailIcon,
      alt: "Hotel email",
      text: "contact@neatlyhotel.com",
    },
    {
      imageSrc: pinIcon,
      alt: "Hotel Address",
      text: "188 Phaya Thai Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400",
    },
  ];
  
  // รายการรูปภาพ
  const bottomIconList = [
    { src: fbIcon, alt: "Facebook Page"},
    { src: instagramIcon, alt: "Instagram link"},
    { src: twitterIcon, alt: "Twitter link"},
  ];

  return (
    <section className="flex items-center ">
      <footer className="font-sans pt-[66px] px-[120px] text-white bg-[#2F3E35] max-w-[1440px] w-full h-[485px] flex flex-col justify-end">
        <div className="logo-contact-container flex flex-row justify-between mb-[100px]">
          <div className="logoWithMsg-container max-w-[383px] w-full">
            <div className="logoBox">
              <Image
                src={neatlyLogo}
                alt="Neatly Hotel Logo"
                className="mb-[30px]"
              />
            </div>
            <div className="hotelShortMsg-box">
              <p className="text-xl font-semibold ">Neatly Hotel</p>
              <p className="text-base font-normal pt-2">
                The best hotel for rising your experience
              </p>
            </div>
          </div>
          <div className="contact-container max-w-[420px] w-full text-base">
            <p className="font-medium mb-[30px] mt-[20px]">CONTACT</p>
            {contactItems.map((item, index) => (
              <div key={index} className="grid grid-auto grid-rows-[50px] grid-cols-[30px_auto] gap-x-px font-normal">
                <Image src={item.imageSrc} alt={item.alt} />
                <div>{item.text}</div>
              </div>
            ))} 
          </div>
        </div>
        <div className="bottom-container flex flex-row justify-between border-t border-[#465C50] py-[40px]">
          <div className="icon-wraper flex flex-row">
            {bottomIconList.map((image, index) => (
              <Image
                key={index}
                src={image.src}
                alt={image.alt}
                className="mr-3"
              />
            ))}
          </div>
          <span>Copyright ©2022 Neatly Hotel</span>
        </div>
      </footer>
    </section>
  );
}
