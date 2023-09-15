import "@/app/globals.css";

import imgRegister from "../../../../../public/imgRegister.svg";
import Image from "next/image.js";
import UserProvider from "../../../../context/user";

import ProfileUP from "../../components/updateprofile";

export const metadata = {
  title: "Profile Page",
  description: "แก้ไขโปรไฟล์",
};

export default function ProfileUpdated() {
  return (
    <div className="h-[1087px] w-screen relative">
      {" "}
      {/* background image */}
      <Image
        className=""
        src={imgRegister}
        alt="bg"
        layout="fill"
        style={{ objectFit: "cover" }}
      />
      {/* page form register */}
      <ProfileUP />
    </div>
  );
}
