import "@/app/globals.css";

import imgRegister from "../../../../../public/imgRegister.svg";
import Image from "next/image.js";
import UserProvider from "../../../../context/user";

import ProfileUP from "../../components/ProfileupdateForm.jsx";

export const metadata = {
  title: "Profile Page",
  description: "แก้ไขโปรไฟล์",
};

export default function ProfileUpdated() {
  return (
    <div className=" bg-utility-bg  h-full w-full ">
      {" "}
      {/* background image */}
      {/* <Image
        className=""
        src={imgRegister}
        alt="bg"
        layout="fill"
        style={{ objectFit: "cover" }}
      /> */}
      {/* page form register */}
      <ProfileUP />
    </div>
  );
}
