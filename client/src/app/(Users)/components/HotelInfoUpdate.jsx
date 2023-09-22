"use client";

import { Button } from "@/components/ui/button";
import UploadLogo from "./UploadLogo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

export default function HotelInfoUpdate() {
  const supabase = createClientComponentClient();
  const [hotelData, setHotelData] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [description, setDescription] = useState("");
  const [hotelLogo, setHotelLogo] = useState("");
  const [showPicture, setShowPicture] = useState(true);

  // const router = useRouter();
  // const [user, setUser] = useState(null);
  let loading = false;

  //เรียกข้อมูลจาก database มาแสดง
  const getHotelInfo = async () => {
    let { data: hotel_info, error } = await supabase
      .from("hotel_info")
      .select()
      .eq("id", 6)
      .single();

    setHotelData(hotel_info);

    if (error) {
      console.log(error);
    }
    if (hotel_info) {
      setHotelName(hotel_info.hotel_name);
      setDescription(hotel_info.hotel_description);
      if (hotel_info.hotel_logo === "") {
        setShowPicture(false);
        console.log("ยังไม่มีโลโก้");
      } else {
        setHotelLogo(hotel_info.hotel_logo);
        // console.log(hotel_info.hotel_logo);
      }
    }
  };

  useEffect(() => {
    getHotelInfo();
  }, []);

  useEffect(() => {
    console.log(hotelData);
    console.log(hotelName);
    console.log(description);
    console.log(hotelLogo);
    console.log(showPicture);
  }, [hotelData]);

  // ฟังก์ชั่น Delete รูป
  const handleDelete = async () => {
    const url = hotelLogo.split("?")[0];
    const pic = url.split("/");
    const result = pic[pic.length - 1];
    console.log(result);

    // try {
    //   let { error } = await supabase
    //   .from('hotel_info')
    //   .delete()
    //   .eq('hotel_logo', [hotelLogo])
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      let { data, error } = await supabase.storage
        .from("logo") //ชื่อ folder หรือ bucket เก็บรูปภาพใน supabase storage
        .remove([result]);
      setShowPicture(false);
      setHotelLogo("");
    } catch (error) {
      console.log(error);
    }
  };

  //ฟังก์ชั่น กดปุ่ม Update ข้อมูลทั้งหมด
  const handleUpdate = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase
      .from('hotel_info')
      .update({'hotel_name':hotelName,'hotel_description':description,'hotel_logo':hotelLogo})
      .eq("id", 6);

    //   if (error || data === "undefined") {
    //     console.log(error);
    //     // You can set a general form error here
    //     setFormError("Please fill in all fields correctly");
    //   }
    //   if (data) {
    //     console.log(data);
    //     console.log(data[0].avatar_url);
    //     alert("UPDATED PROFILE SUCCESSFULLY");
    //     setFormErrors({
    //       full_name: "",
    //       email: "",
    //       birthdate: "",
    //       id_card: "",
    //       country: "",
    //       avatar_url: "",
    //     });
    //   }
    // }
  };

  return (
    <>
      <section className="flex flex-col w-full max-w-[1440px] font-sans">
        <div className="hotel-navbar flex flex-row justify-between items-center bg-white py-4 px-[60px]">
          <h1 className="text-[#2A2E3F] text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            Hotel Information
          </h1>
          <Button>{loading ? `Loading...` : `Update`}</Button>
        </div>
        <div className="grey-bg bg-[#F6F7FC] w-full px-[60px] pt-10">
          <div className="form-container bg-red-300 pt-10 px-[80px]">
            <form className="flex flex-col" onSubmit={handleUpdate}>
              <Button>Test Update</Button>
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

              <div className="mb-[60px] bg-green-400">
                {showPicture ? (
                  <div className="relative w-fit bg-orange-300">
                    <Image
                      className="object-cover cursor-pointer"
                      alt="avatar"
                      src={hotelLogo}
                      width={150}
                      height={150}
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
                    <UploadLogo
                      url={hotelLogo}
                      size={150}
                      onUpload={(url) => {
                        setHotelLogo(url);
                      }}
                      setAvatar={setHotelLogo}
                    />
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
