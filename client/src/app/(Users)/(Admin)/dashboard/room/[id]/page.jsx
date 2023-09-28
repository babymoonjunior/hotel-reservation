"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import MainImage from "@/app/(Users)/components/MainImage";
import UploadPic from "../createroom/UploadPic";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import DeletePopup from "./DeletePopup";

export const metadata = {
  title: "Dashboard",
  description: "หน้าแรกของAdmin",
};

export default function AdminDashboard({ params, folder }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    roomType: "",
    roomSize: "",
    bedType: "",
    guests: "",
    pricePerNight: "",
    promotionPrice: "",
    roomDescription: "",
    mainImage: "",
    roomImage: [],
    amenities: [],
  });
  const [roomImage, setRoomImage] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [gallery, setGallery] = useState([]);
  const router = useRouter();
  const [open, onOpenChange] = useState(false);
  const [checkDiscount, setCheckDiscount] = useState(false);
  const [roomTypeName, setRoomTypeName] = useState("");

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("room_types")
        .select(
          `roomtypetitle, roomarea, bedtype, guests, fullprice,
                discountprice, description, main_image, room_image, amenities`
        )
        .eq("room_type_id", params.id)
        .single();

      console.log(data);
      if (!data) {
        router.replace("/dashboard/room");
      }
      if (error) {
        throw error;
      }
      if (data) {
        setValues({
          roomType: String(data.roomtypetitle),
          roomSize: String(data.roomarea),
          bedType: String(data.bedtype),
          guests: String(data.guests),
          pricePerNight: String(data.fullprice),
          promotionPrice: String(data.discountprice),
          roomDescription: String(data.description),
          mainImage: data.main_image,
        });
        setRoomImage(data.room_image);
        setAmenities(data.amenities);
        setRoomTypeName(data.roomtypetitle);
        if (data.discountprice !== 0) {
          setCheckDiscount(true);
        }
      }
    };

    fetchSmoothie();
  }, [user?.id]);
  console.log(values);

  const migrateToSupabase = async () => {
    try {
      const fileUpload = [];

      for (const file of gallery) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from("imagegallery")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }
        fileUpload.push(filePath);
      }

      const imageUrls = await downloadImage(fileUpload);
      return imageUrls;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const downloadImage = async (fileUpload) => {
    try {
      const imageUrls = [];
      for (const link of fileUpload) {
        const { data, error } = await supabase.storage
          .from("imagegallery")
          .createSignedUrl(link, 31536000);

        if (error) {
          throw error;
        }

        const url = data.signedUrl;

        imageUrls.push(url);
      }
      return imageUrls;
    } catch (error) {
      console.log("error downloadimage:", error);
    }
  };

  const handleDeleted = async () => {
    try {
      const url = values.mainImage.split("?")[0];
      const pic = url.split("/");
      const result = pic[pic.length - 1];
      const { data, error } = await supabase.storage
        .from("mainimage")
        .remove([result]);

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`);
      }

      setValues({ ...values, mainImage: null });

      console.log("ลบจาก Main Image");
    } catch (error) {
      console.log(`Error deleting profile image: `, error.message);
    }
  };

  const handleDeletedGallery = async (path) => {
    try {
      const url = path.split("?")[0];
      const pic = url.split("/");
      const result = pic[pic.length - 1];
      const { data, error } = await supabase.storage
        .from("imagegallery")
        .remove([result]);

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`);
      }
      const updatedGallery = roomImage.filter((item) => item !== path);
      setRoomImage(updatedGallery);

      console.log("ลบจาก gallery");
    } catch (error) {
      console.log(`Error deleting profile image: `, error.message);
    }
  };

  const [amenitiesValue, setAmenitiesValue] = useState("");
  const handleClickAddAmenities = () => {
    if (amenitiesValue !== "") {
      setAmenities([...amenities, amenitiesValue]);
      setAmenitiesValue("");
    }
  };
  const handleAmenityChange = (e, index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities[index] = e.target.value;
    setAmenities(updatedAmenities);
  };
  const handleDeleteAmenity = (index) => {
    const updatedAmenities = [...amenities];
    updatedAmenities.splice(index, 1);
    setAmenities(updatedAmenities);
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const result = await migrateToSupabase();
      console.log("result", result);
      const roomAll = result.concat(roomImage);
      if (roomAll.length < 4) {
        throw new Error("You must select at least 4 images");
      }
      await axios.put(`http://localhost:4000/rooms/edit/roomtype/`, {
        roomtypetitle: values.roomType,
        description: values.roomDescription,
        guests: values.guests,
        bedtype: values.bedType,
        roomarea: values.roomSize,
        main_image: values.mainImage,
        room_image: roomAll,
        amenities: amenities,
        fullprice: values.pricePerNight,
        discountprice: checkDiscount ? Number(values.promotionPrice) : 0,
        room_type_id: params.id,
      });

      alert("Updated successful");
      router.push("/dashboard/room");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <section className={`min-h-screen bg-gray-300 bg-opacity-80 relative`}>
      <form onSubmit={updateData}>
        <article className={`w-full bg-utility-bg`}>
          <nav className={`flex items-center justify-between px-16 py-6`}>
            <span className={``} onClick={() => router.push("/dashboard/room")}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className={`pr-4 text-gray-600
                cursor-pointer text-xl mt-2 mb-1`}
              />
            </span>
            <h2 className={`flex-1 text-xl font-semibold text-gray-900`}>
              {roomTypeName}
            </h2>
            <div
              className={`flex item-center justify-end flex-1 gap-4
             `}
            >
              <button
                type="submit"
                className={`w-[121px] h-[48px] bg-orange-600 rounded`}
              >
                <h1 className={`text-white`}>Update</h1>
              </button>
            </div>
          </nav>
        </article>
        {/* End Navbar */}
        {/* Start Input Field*/}
        <article
          className={`max-w-6xl px-[60px] mx-auto mt-10 bg-white
                `}
        >
          {/* Start Basic Information */}
          <div
            className={`flex flex-col gap-10 pb-10 border-b
                    border-gray-300`}
          >
            <h1
              className={`text-xl font-semibold leading-normal
                        text-gray-600 -tracking-wider mt-10`}
            >
              Basic Information
            </h1>
            <div
              className={`flex flex-col gap-1 mt-8
                        w-full `}
            >
              <label htmlFor="roomType" className={`text-gray-900`}>
                RoomType*
              </label>
              <input
                type="text"
                id="roomType"
                value={values.roomType}
                onChange={(e) =>
                  setValues({ ...values, roomType: e.target.value })
                }
                className={`p-3 border border-gray-400 rounded-sm 
                            outline-none w-full`}
                required
              />
            </div>

            <div className={`grid md:grid-cols-[52%_52%]`}>
              <div
                className={`flex flex-col flex-1 w-full 
                            md:w-11/12`}
              >
                <label htmlFor="roomSize" className={`text-gray-900`}>
                  Room size(sqm)*
                </label>
                <input
                  type="text"
                  id="roomSize"
                  value={values.roomSize}
                  onChange={(e) =>
                    setValues({ ...values, roomSize: e.target.value })
                  }
                  className={`p-3 border border-gray-400 rounded-sm 
                                outline-none w-full `}
                  required
                />
              </div>
              <div
                className={`flex flex-col flex-1 w-full 
                            md:w-11/12 `}
              >
                <label htmlFor="bedType" className={`text-gray-900`}>
                  Bed Type*
                </label>
                <select
                  className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}
                  onChange={(e) =>
                    setValues({ ...values, bedType: e.target.value })
                  }
                  value={values.bedType}
                >
                  {/* <option value={values.bedType}>{values.bedType}</option> */}
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="King Size">King Size</option>
                  <option value="Twin Bed">Twin Bed</option>
                </select>
              </div>

              <div
                className={`flex flex-col flex-1 w-full
                            md:w-11/12 mt-10`}
              >
                <label htmlFor="guests" className={`text-gray-900`}>
                  Guest(s)*
                </label>
                <select
                  className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}
                  onChange={(e) =>
                    setValues({ ...values, guests: e.target.value })
                  }
                  value={values.guests}
                >
                  {/* <option>{values.guests}</option> */}
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
            </div>

            <div className={`grid md:grid-cols-[52%_48%]`}>
              <div
                className={`flex flex-col flex-1 
                            w-full md:w-11/12`}
              >
                <label htmlFor="price" className={`text-gray-900`}>
                  Price per Night(THB)*
                </label>
                <input
                  type="text"
                  id="price"
                  value={values.pricePerNight}
                  onChange={(e) =>
                    setValues({ ...values, pricePerNight: e.target.value })
                  }
                  className={`p-3 border border-gray-400 rounded-sm
                                outline-none w-full`}
                  required
                />
              </div>
              <div
                className={`flex md:flex-row flex-col items-center flex-1 gap-4 pt-6`}
              >
                <input
                  type="checkbox"
                  id="promotion"
                  className={`w-6 h-6 p-2 outline-none border 
                                border-gray-400 rounded-sm data-[state=checked]:text-white 
                                data-[state=checked]:border-orange-300  
                                data-[state=checked]:bg-orange-500
                                accent-orange-500`}
                  checked={checkDiscount}
                  onChange={() => setCheckDiscount(!checkDiscount)}
                />
                <label htmlFor="promotionPrice" className={``}>
                  Promotion
                </label>
                <input
                  type="text"
                  id="promotionPrice"
                  disabled={!checkDiscount}
                  className={`p-3 border border-orange-400 
                                rounded-sm outline-none md:w-11/12 w-full`}
                  value={values.promotionPrice}
                  onChange={(e) =>
                    setValues({ ...values, promotionPrice: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={`flex flex-col justify-center gap-1`}>
              <label htmlFor="description" className={`text-gray-900`}>
                Room Description*
              </label>
              <textarea
                rows={4}
                type="text"
                id="description"
                value={values.roomDescription}
                onChange={(e) =>
                  setValues({ ...values, roomDescription: e.target.value })
                }
                className={`w-full p-3 text-lg border 
                            border-gray-400 outline-none resize-none
                            rounded-sm focus:border-orange-500`}
                required
              ></textarea>
            </div>
          </div>
          {/* End Basic Information */}
          {/* Start Room Image */}
          <div
            className={`flex flex-col gap-10 py-10 border-b
                    border-gray-300`}
          >
            <h2
              className={`text-xl font-semibold leading-normal
                        text-gray-600 -tracking-wider`}
            >
              Room Image
            </h2>
            <div className={`flex flex-col justify-center gap-1`}>
              <label className={`text-gray-900 mb-2`}>Main Image*</label>
              {values.mainImage !== null ? (
                <div className="inline-block w-[240px] h-[240px] relative">
                  <Image
                    src={values.mainImage}
                    alt="mainimage"
                    width={240}
                    height={240}
                    className="object-cover w-60 h-60"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleted()}
                    className="absolute top-0 right-0 w-6 h-6 text-sm font-bold text-center text-white bg-orange-700 rounded-full"
                  >
                    x
                  </button>
                </div>
              ) : (
                <MainImage
                  setMainImage={(newMainImage) =>
                    setValues({ ...values, mainImage: newMainImage })
                  }
                  folder="mainimage"
                />
              )}
            </div>

            <div className={`flex flex-col justify-center gap-1`}>
              <p className={`text-gray-900 mb-2`}>
                Image Gallery(At least 4 pictures)*
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {roomImage.map((item, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={item}
                      alt="imagegallery"
                      width={167}
                      height={167}
                      className="object-cover w-40 h-40"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletedGallery(item)}
                      className="absolute top-0 right-0 w-6 h-6 text-sm font-bold text-center text-white bg-orange-700 rounded-full"
                    >
                      x
                    </button>
                  </div>
                ))}
                <UploadPic gallery={gallery} setGallery={setGallery} />
              </div>
            </div>
          </div>

          {/* Start Amenities */}
          <div
            className={`flex flex-col gap-10 py-10 border-b border-gray-300"`}
          >
            <h2
              className={`text-xl font-semibold leading-normal text-gray-600
             -tracking-wider`}
            >
              Room Amenities
            </h2>
            {amenities.map((item, index) => (
              <div key={index} className={`flex items-center gap-6`}>
                <Image src={"/drag.svg"} width={26} height={76} />
                <div className={`flex flex-col justify-center w-full gap-1`}>
                  <label
                    htmlFor={`Amenity-${index}`}
                    className={`text-gray-900`}
                  >
                    Amenity *
                  </label>
                  <input
                    type="text"
                    id={`Amenity-${index}`}
                    value={item}
                    onChange={(e) => handleAmenityChange(e, index)}
                    className="w-full p-3 border border-gray-400 rounded-sm outline-none"
                  />
                </div>
                <p
                  className={`text-orange-500 cursor-pointer`}
                  onClick={() => handleDeleteAmenity(index)}
                >
                  Delete
                </p>
              </div>
            ))}
            <div className={`flex items-center gap-6`}>
              <Image src={"/drag.svg"} width={26} height={76} />
              <div className={`flex flex-col justify-center w-full gap-1`}>
                <label htmlFor="amenity" className={`text-gray-900`}>
                  Amenity *
                </label>
                <input
                  type="text"
                  id="amenity"
                  value={amenitiesValue}
                  onChange={(e) => {
                    setAmenitiesValue(e.target.value);
                  }}
                  placeholder="Enter Amenity!"
                  className={`w-full p-3 border border-gray-400 rounded-sm
                    outline-none `}
                />
              </div>
              <span className={`mr-12`}></span>
            </div>
            <button
              type="button"
              onClick={() => handleClickAddAmenities()}
              className={`w-[177px] h-[48px] border-2 border-orange-500 bg-white
            ml-12 rounded`}
            >
              <h1 className={`text-orange-500`}>+Add Amenity</h1>
            </button>
          </div>
          {/* End Amenity */}
        </article>
        <div className="max-w-6xl pb-5 pt-3 mx-auto flex justify-end ">
          <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger>
              <span className="hover:text-orange-500">Delete Room</span>
            </DialogTrigger>
            <DialogContent className="border-none shadow-2xl">
              <DeletePopup onOpenChange={onOpenChange} paramId={params.id} />
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </section>
  );
}
