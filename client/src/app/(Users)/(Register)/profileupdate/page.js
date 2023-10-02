import "@/app/globals.css";
import ProfileUP from "../../components/ProfileupdateForm.jsx";

export const metadata = {
  title: "Profile Page",
  description: "แก้ไขโปรไฟล์",
};

export default function ProfileUpdated() {
  return (
    <div className="w-full h-full  bg-utility-bg">
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
