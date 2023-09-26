"use client";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import MainImage from "@/app/(Users)/components/MainImage";
import RoomAmenity from "./RoomAmenity";
import UploadPic from "./UploadPic";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

function CreateRooms() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { control, handleSubmit, watch } = useForm();
  const [mainImage_url, setMainImage] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [galleryUploaded, setGalleryUploaded] = useState([]);
  const [gallery, setGallery] = useState([]);

  const onSubmit = async (data) => {
    const formData = {
      roomtypetitle: data.roomtype,
      description: data.description,
      guests: data.guests,
      bedtype: data.bedtype,
      roomarea: data.roomsize,
      main_image: mainImage_url,
      amenities: amenities,
      fullprice: data.fullprice,
      discountprice: data.promotionChecked ? data.promotionprice : 0,
    };
    try {
      setUploading(true);

      if (mainImage_url === null) {
        throw new Error(`You must select Main Image to upload!`);
      }

      if (!gallery || gallery.length < 4) {
        throw new Error(`You must select at least 4 image to upload!`);
      }

      const result = await migrateToSupabase();
      console.log("result", result);

      await axios.post(`http://localhost:4000/rooms/create/roomtype/`, {
        roomtypetitle: formData.roomtypetitle,
        description: formData.description,
        guests: formData.guests,
        bedtype: formData.bedtype,
        roomarea: formData.roomarea,
        main_image: formData.main_image,
        room_image: result,
        amenities: formData.amenities,
        fullprice: formData.fullprice,
        discountprice: formData.discountprice,
      });

      alert(`Create Room Success`);
      router.push("/dashboard/room");
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setUploading(false);
    }
  };

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
      setGalleryUploaded(imageUrls);
      return imageUrls;
    } catch (error) {
      console.log("error dowloadimage:", error);
    }
  };

  useEffect(() => {
    console.log(amenities);
  }, [amenities]);

  useEffect(() => {
    console.log("mainImage_url: ", mainImage_url);
  });

  return (
    <section className="min-h-screen bg-gray-300 bg-opacity-80">
      {/* Start Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Start Navbar */}
        <article className="w-full bg-utility-bg">
          <nav className="flex items-center justify-between px-16 py-6">
            <h2 className="flex-1 text-xl font-semibold text-gray-900">
              Create New Room
            </h2>
            <div className="flex items-center justify-end flex-1 gap-4">
              <Button
                type="button"
                onClick={() => router.push("/dashboard/room/")}
                className={buttonVariants({ variant: "secondary" })}
              >
                Cancel
              </Button>
              <Button type="submit">
                {uploading ? `Uploading...` : `Create`}
              </Button>
            </div>
          </nav>
        </article>
        {/* End Navbar */}
        {/* Start Input Field */}
        <article className="max-w-6xl p-16 mx-auto my-10 bg-white">
          {/* Start Basic Information */}
          <div className="flex flex-col gap-10 pb-10 border-b border-gray-300">
            <h1 className="text-xl font-semibold leading-normal text-gray-600 -tracking-wider">
              Basic Information
            </h1>
            <div className="flex flex-col justify-center gap-1">
              <label htmlFor="roomtype" className="text-gray-900">
                Room Type*
              </label>
              <Controller
                control={control}
                name="roomtype"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="roomtype"
                    className="p-3 border border-gray-400 rounded-sm outline-none"
                  />
                )}
              />
            </div>
            <div className="flex gap-10">
              <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="roomsize" className="text-gray-900">
                  Room size(sqm)*
                </label>
                <Controller
                  control={control}
                  name="roomsize"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="roomsize"
                      className="p-3 border border-gray-400 rounded-sm outline-none"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <label htmlFor="bedtype" className="text-gray-900">
                  Bed type*
                </label>
                <Controller
                  control={control}
                  name="bedtype"
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full p-6 border-gray-400">
                        <SelectValue placeholder="Select a bed type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectGroup>
                          <SelectLabel>Bed Type</SelectLabel>
                          <SelectItem value="Single Bed">Single Bed</SelectItem>
                          <SelectItem value="Double Bed">Double Bed</SelectItem>
                          <SelectItem value="King Size">King Size</SelectItem>
                          <SelectItem value="Twin Bed">Twin Bed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <label htmlFor="guests" className="text-gray-900">
                Guest(s)*
              </label>
              <Controller
                name="guests"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full max-w-[492px] p-6 border-gray-400">
                      <SelectValue placeholder="Select a Guest(s)" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>Guest(s)</SelectLabel>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col justify-center flex-1 gap-1">
                <label htmlFor="price" className="text-gray-900">
                  Price per Night(THB)*
                </label>
                <Controller
                  control={control}
                  name="fullprice"
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="price"
                      className="p-3 border border-gray-400 rounded-sm outline-none"
                    />
                  )}
                />
              </div>
              {/* Checkbox and Input for Promotion */}
              <div className="flex items-center flex-1 gap-4 pt-6">
                <Controller
                  name="promotionChecked"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="promotion"
                      className="w-6 h-6 p-2 rounded-md outline-none accent-orange-500"
                      {...field}
                    />
                  )}
                />
                <label htmlFor="promotion">Promotion</label>
                <Controller
                  name="promotionprice"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="promotionprice"
                      disabled={!watch("promotionChecked")}
                      className="p-3 border border-gray-400 rounded-sm outline-none"
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <label htmlFor="description" className="text-gray-900">
                Room Description*
              </label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <textarea
                    {...field}
                    name="description"
                    id="description"
                    cols="30"
                    rows="3"
                    className="w-full p-3 text-lg border border-gray-400 rounded-sm outline-none resize-none focus:border-orange-500"
                  ></textarea>
                )}
              />
            </div>
          </div>
          {/* End Basic Information */}
          {/* Start Room Image */}
          <div className="flex flex-col gap-10 py-10 border-b border-gray-300">
            <h2 className="text-xl font-semibold leading-normal text-gray-600 -tracking-wider">
              Room Image
            </h2>
            <div className="flex flex-col justify-center gap-1">
              <label htmlFor="mainimage" className="text-gray-900">
                Main Image*
              </label>
              <MainImage folder={"mainimage"} setMainImage={setMainImage} />
            </div>
            <div className="flex flex-col justify-center gap-1">
              <label htmlFor="imagegallery" className="text-gray-900">
                Image Gallery(At least 4 pictures) *
              </label>
              <UploadPic gallery={gallery} setGallery={setGallery} />
            </div>
          </div>
          {/* End Room Image */}
          {/* Start Amenities */}
          <RoomAmenity amenities={amenities} setAmenities={setAmenities} />
          {/* End Amenities */}
        </article>
        {/* End Input Field */}
      </form>
      {/* End Form */}
    </section>
  );
}

export default CreateRooms;
