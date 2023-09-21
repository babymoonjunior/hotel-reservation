"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function ImageGallery({ url, onUpload, setImageGallery }) {
  const supabase = createClientComponentClient();
  const [imageUrl, setImageUrl] = useState([]);
  const [link, setLink] = useState([]);
  const [uploading, setUploading] = useState(false);

  async function downloadImages(links) {
    try {
      const imageUrls = [];

      for (const link of links) {
        const { data, error } = await supabase.storage
          .from("imagegallery")
          .createSignedUrl(link, 31536000);

        if (error) {
          throw error;
        }

        const url = data.signedUrl;

        imageUrls.push(url);
      }

      setImageUrl(imageUrls);
      setImageGallery(imageUrls);
    } catch (error) {
      console.log(`Error downloading images:`, error.message);
    }
  }

  useEffect(() => {
    console.log("links:", link);
    if (link.length > 0) {
      downloadImages(link);
    }
  }, [link]);

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length < 4) {
        throw new Error(`You must select at least 4 image to upload`);
      }
      const files = Array.from(event.target.files);
      console.log("files", files);

      const uploadedLinks = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop(); //image.jpg
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        let { error: uploadError } = await supabase.storage
          .from("imagegallery")
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        uploadedLinks.push(filePath);
      }

      setLink(uploadedLinks);

      // Assuming you want to call onUpload for each uploaded file
      for (const uploadedLink of uploadedLinks) {
        onUpload(uploadedLink);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  const handleDeleted = async (indexfromclick) => {
    try {
      const { data, error } = await supabase.storage
        .from("imagegallery")
        .remove([link[indexfromclick]]);

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`);
      }

      setImageUrl((prevUrls) =>
        prevUrls.filter((item, index) => index !== indexfromclick)
      );
    } catch (error) {
      console.error("Error deleting profile image:", error.message);
    }
  };

  useEffect(() => {
    console.log("imageUrl", imageUrl);
    console.log("link", link);
  }, [imageUrl, link]);

  return (
    <div className="flex flex-wrap gap-5">
      {imageUrl &&
        imageUrl.map((url, index) => (
          <div key={index} className="relative w-fit">
            <Image
              className="object-cover w-40 h-40 cursor-pointer"
              alt={`Image ${index + 1}`}
              src={url}
              width={160}
              height={160}
            />
            <button
              type="button"
              onClick={() => handleDeleted(index)}
              className="absolute px-2 py-[2px] text-sm text-white bg-orange-500 rounded-full -right-2 -top-2"
            >
              X
            </button>
          </div>
        ))}
      <div
        className="flex flex-col items-center justify-center w-40 h-40 bg-gray-200 cursor-pointer hover:bg-gray-400"
        onClick={() => document.getElementById("multi").click()}
      >
        <label htmlFor="single" className="py-4 text-orange-500 cursor-pointer">
          {uploading ? "Uploading..." : "Upload"}
        </label>
        <input
          type="file"
          id="multi"
          style={{ visibility: "hidden", position: "absolute" }}
          accept="image/*"
          onChange={uploadAvatar}
          multiple // Allow multiple file selection
          disabled={uploading}
        />
      </div>
    </div>
  );
}
