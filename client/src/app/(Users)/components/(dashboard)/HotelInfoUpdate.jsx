"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MainImage from "./UploadLogo";
import { useRouter } from "next/navigation";

export default function HotelInfoUpdate() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [hotelData, setHotelData] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [description, setDescription] = useState("");
  const [hotelLogo, setHotelLogo] = useState("");
  const [hotelId, setHotelId] = useState(null);
  const [showPicture, setShowPicture] = useState(true);
  const [profileId, setProfileId] = useState(true);

  let loading = false;

  //ฟังก์ชั่นตรวจสอบการ login
  const checkLogin = async () => {
    try {
      const currentUser = await supabase.auth.getSession();
      if (!currentUser.data.session) {
        router.push("/login");
        return;
      }
      setProfileId(currentUser.data.session.user.id);
      // console.log(profileId);
    } catch (error) {
      router.push("/login");
    }
  };

  //เรียกข้อมูลจาก database มาแสดง
  const getHotelInfo = async () => {
    try {
      let { data: hotel_info, error } = await supabase
        .from("hotel_info")
        .select()
        .single();

      setHotelData(hotel_info);

      if (hotel_info) {
        setHotelId(Number(hotel_info.id));
        setHotelName(hotel_info.hotel_name);
        setDescription(hotel_info.hotel_description);
        if (hotel_info.hotel_logo === "") {
          setShowPicture(false);
          console.log("ยังไม่มีโลโก้");
        } else {
          setHotelLogo(hotel_info.hotel_logo);
        }
      } else {
        alert("Please insert a new hotel_info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkLogin();
    if (profileId) {
      getHotelInfo();
    } else {
      router.push("/login");
    }
  }, []);

  // ฟังก์ชั่น Delete รูป
  const handleDelete = async () => {
    try {
      const url = hotelLogo.split("?")[0];
      const pic = url.split("/");
      const result = pic[pic.length - 1];

      let { data, error } = await supabase.storage
        .from("logo") //ชื่อ folder หรือ bucket เก็บรูปภาพใน supabase storage
        .remove([result]);
      setShowPicture(false);
      setHotelLogo("");
      console.log("ลบจาก HotelInfoUpdate");
    } catch (error) {
      console.log(error);
    }
  };

  //ฟังก์ชั่น กดปุ่ม Update ข้อมูลทั้งหมด
  const handleUpdate = async (e) => {
    try {
      if (hotelId) {
        // ถ้ามีข้อมูลเดิม ให้อัพเดท
        e.preventDefault();
        let update_date = new Date();
        let { data, error } = await supabase
          .from("hotel_info")
          .update({
            hotel_name: hotelName,
            hotel_description: description,
            hotel_logo: hotelLogo,
            updated_at: update_date,
          })
          .eq("id", hotelId);
        alert("Updated Completely");
        window.location.reload();
      } else 
      // ถ้าไม่มีข้อมูลเดิมอยู่ใน insert data
      {
        const { data, error } = await supabase
          .from("hotel_info")
          .insert([{ hotel_name: hotelName, hotel_description: description, hotel_logo: hotelLogo}])
          .select();
        alert(
          "Inserted a new hotel_info successful"
        );
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      alert("Updated is not successfully, Please try again!");
    }
  };

  return (
    <>
      <section className="flex flex-col w-full max-w-[1440px] font-sans">
        <div className="hotel-navbar flex flex-row justify-between items-center bg-white py-4 px-[60px]">
          <h1 className="text-[#2A2E3F] text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            Hotel Information
          </h1>
          <Button onClick={handleUpdate}>
            {loading ? `Loading...` : `Update`}
          </Button>
        </div>
        <div className="grey-bg bg-[#F6F7FC] w-full px-[60px] pt-10">
          <div className="form-container bg-white pt-10 px-[80px]">
            <form className="flex flex-col">
              <label className="text-[#2A2E3F] text-base font-normal leading-[150%]">
                Hotel name *
              </label>
              <input
                className=" rounded border border-[#D6D9E4] text-black text-base font-normal leading-[150%] p-3 mb-10 focus:outline-none"
                id="hotelName"
                type="text"
                placeholder="Hotel Name"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
              <label className="text-[#2A2E3F] text-base font-normal leading-[150%] ">
                Hotel description *
              </label>
              <textarea
                className=" rounded border border-[#D6D9E4] text-[#646D89] text-base font-normal leading-[150%] tracking-[-0.32px] p-3 mb-10 focus:outline-none"
                name="message"
                rows="10"
                id="hotelDescription"
                type="text"
                placeholder="Hotel Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label className="text-[#2A2E3F] text-base font-normal leading-[150%]">
                Hotel logo *
              </label>

              <div className="mb-[60px] bg-white">
                {showPicture ? (
                  <div className="relative w-fit h-fit bg-[#F1F2F6]">
                    <img
                      src={hotelLogo}
                      alt="hotel logo"
                      width="150"
                      height="150"
                      className=" object-cover cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="absolute px-3 py-1 font-bold text-white bg-orange-500 rounded-full -right-4 -top-4"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-200  hover:bg-gray-400 w-[180px] h-[180px] flex flex-col justify-center items-center cursor-pointer border border-gray-800">
                    <MainImage setMainImage={setHotelLogo} folder={"logo"} />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
