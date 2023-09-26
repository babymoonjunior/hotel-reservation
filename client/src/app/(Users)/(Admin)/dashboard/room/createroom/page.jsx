"use client";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import FormCreateRoom from "./FormCreateRoom";
import MainImage from "@/app/(Users)/components/MainImage";
import RoomAmenity from "./RoomAmenity";
import UploadPic from "./UploadPic";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import ModalMessage from "@/app/(Users)/components/ModalMessage";

function CreateRooms() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const methods = useForm();
  const [mainImage_url, setMainImage] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [galleryUploaded, setGalleryUploaded] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");

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

      setMessage("Create Room Successfully.");
      setModalOpen(true);
      router.push("/dashboard/room");
    } catch (error) {
      console.log(error);
      setMessage(error.message || "An error occurred");
      setModalOpen(true);
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
      setMessage(error);
      setModalOpen(true);
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* Start Navbar */}
          <article className="sticky top-0 z-50 w-full shadow-sm bg-utility-bg">
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
            <FormCreateRoom />
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
      </FormProvider>
      {/* End Form */}
      <ModalMessage open={modalOpen} setOpen={setModalOpen} message={message} />
    </section>
  );
}

export default CreateRooms;
