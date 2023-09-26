"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Avatar({ url, onUpload, setAvatar }) {
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
        .createSignedUrl(path, 31536000);

      if (error) {
        throw error;
      }

      const url = data.signedUrl;
      setAvatarUrl(url);
      setAvatar(url);
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
            width={176}
            height={176}
          />
          <button
            type="button"
            onClick={handleDeleted}
            className="absolute px-2 py-1 text-sm font-bold text-white bg-orange-500 rounded-full -right-2 -top-2"
          >
            X
          </button>
        </div>
      ) : (
        <div
          className="bg-gray-200 hover:bg-gray-400 w-[180px] h-[180px] flex flex-col justify-center items-center cursor-pointer"
          onClick={() => document.getElementById("single")}
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
