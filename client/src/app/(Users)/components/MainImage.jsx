"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function MainImage({ setMainImage, folder }) {
  const supabase = createClientComponentClient();
  const [mainUrl, setMainUrl] = useState(null);
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from(folder)
        .createSignedUrl(path, 31536000);

      if (error) {
        throw error;
      }

      const url = data.signedUrl;
      setMainUrl(url);
      setMainImage(url);
    } catch (error) {
      console.log(`Error downloading image:`, error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error(`You must select an image to upload`);
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop(); //image.jpg
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from(folder)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      await downloadImage(filePath);
      setLink(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const handleDeleted = async () => {
    try {
      const { data, error } = await supabase.storage
        .from(folder)
        .remove([link]);

      setMainImage(null);
      setMainUrl(null);

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`);
      }

      setMainImage(null);
    } catch (error) {
      console.error("Error deleting profile image:", error.message);
    }
  };

  return (
    <div>
      {mainUrl ? (
        <div className="relative w-fit">
          <Image
            className="object-cover cursor-pointer w-60 h-60"
            alt="Main Image"
            src={mainUrl}
            width={240}
            height={240}
          />
          <button
            type="button"
            onClick={handleDeleted}
            className="absolute px-3 py-1 font-bold text-white bg-orange-500 rounded-full -right-4 -top-4"
          >
            X
          </button>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center bg-gray-200 cursor-pointer hover:bg-gray-400 w-60 h-60"
          onClick={() => document.getElementById("single").click()}
        >
          <label
            htmlFor="single"
            className="py-4 text-orange-500 cursor-pointer"
          >
            {uploading ? "Uploading..." : "Upload"}
          </label>
          <input
            type="file"
            id="single"
            style={{ visibility: "hidden", position: "absolute" }}
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
