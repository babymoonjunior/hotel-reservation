"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Avatar({ url, size, onUpload, setAvatar }) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
      console.log("Avatar URL set to:", url);
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
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
      setLink(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const handleDeleted = async () => {
    try {
      console.log("Deleting avatar with URL:", avatarUrl);
      console.log("link:", link);
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([link]);

      setAvatar(null);
      setAvatarUrl(null);

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`);
      }

      setAvatar(null);
    } catch (error) {
      console.error("Error deleting profile image:", error.message);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <div className="relative w-fit">
          <Image
            className="object-cover cursor-pointer w-44 h-44"
            alt="avatar"
            src={avatarUrl}
            width={0}
            height={0}
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
          className="bg-gray-200 hover:bg-gray-400 w-[180px] h-[180px] flex flex-col justify-center items-center cursor-pointer"
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
