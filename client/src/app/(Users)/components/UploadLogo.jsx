"use client"; 

import { useState, useEffect } from "react"; // นำเข้า useState และ useEffect จาก React เพื่อใช้ในการจัดการสถานะและการเรียกใช้เอฟเฟกต์ของ React
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"; // นำเข้าฟังก์ชันสร้าง Supabase client จาก Supabase auth-helpers-nextjs
import Image from "next/image"; // นำเข้าคอมโพเนนต์ Image จาก Next.js เพื่อแสดงรูปภาพ

export default function UploadLogo({ url, onUpload, setAvatar }) {
  const supabase = createClientComponentClient(); // สร้าง Supabase client โดยใช้ฟังก์ชันที่นำเข้ามา
  const [avatarUrl, setAvatarUrl] = useState(null); // สร้างสถานะสำหรับ URL ของรูปภาพโปรไฟล์
  const [link, setLink] = useState(""); // สร้างสถานะสำหรับลิงก์
  const [uploading, setUploading] = useState(false); // สร้างสถานะสำหรับการกำลังอัปโหลด

  useEffect(() => {
    if (url) downloadImage(url); // เมื่อ URL เปลี่ยนแปลงให้ดาวน์โหลดรูปภาพ
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("logo")
        .createSignedUrl(path, 31536000); // สร้าง URL ที่อนุญาตให้ดาวน์โหลดรูปภาพ

      if (error) {
        throw error; // หากเกิดข้อผิดพลาดในการดาวน์โหลด ให้โยนข้อผิดพลาด
      }

      const url = data.signedUrl;
      setAvatarUrl(url); // ตั้งค่า URL ของรูปภาพ
      setAvatar(url); // เรียกฟังก์ชัน onUpload เพื่ออัปเดต URL ของรูปภาพ
    } catch (error) {
      console.log(`Error downloading image:`, error.message); // แสดงข้อความข้อผิดพลาดหากเกิดข้อผิดพลาดในการดาวน์โหลด
    }
  }

  async function uploadAvatar(event) {
    // try {
      setUploading(true); // เริ่มการอัปโหลดและตั้งค่าสถานะ uploading เป็น true
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error(`You must select an image to upload`); // โยนข้อผิดพลาดหากไม่มีไฟล์หรือไฟล์ว่าง
      }

      const file = event.target.files[0]; // รับไฟล์ที่เลือกจากอินพุต
      console.log(file);
      const fileExt = file.name.split(".").pop(); // ดึงนามสกุลของไฟล์
      console.log(fileExt);
      const fileName = `${Math.random()}.${fileExt}`; // สร้างชื่อไฟล์แบบสุ่ม
      console.log(fileName);
      const filePath = `${fileName}`; // กำหนดเส้นทางไฟล์
      console.log(filePath);

      let { error: uploadError } = await supabase.storage
        .from("logo")
        .upload(filePath, file); // ทำการอัปโหลดไฟล์โดยใช้ Supabase storage

      if (uploadError) {
        console.log(uploadError);
        throw uploadError; // โยนข้อผิดพลาดหากเกิดข้อผิดพลาดในการอัปโหลด
      }

      onUpload(filePath); // เรียกฟังก์ชัน onUpload เพื่ออัปเดตลิงก์
      setLink(filePath); // ตั้งค่าลิงก์
    // } catch (error) {
    //   console.log(error.message);
    //   alert(error.message); // แสดงหน้าต่างแจ้งเตือนในกรณีเกิดข้อผิดพลาด
    // } finally {
    //   setUploading(false); // หยุดการอัปโหลดและตั้งค่าสถานะ uploading เป็น false
    // }
  }

  const handleDeleted = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("logo")
        .remove([link]); // ลบไฟล์โปรไฟล์โดยใช้ Supabase storage

      setAvatar(null); // รีเซ็ตค่ารูปภาพโปรไฟล์
      setAvatarUrl(null); // รีเซ็ต URL ของรูปภาพโปรไฟล์

      if (error) {
        throw new Error(`Cannot Delete Profile Image: ${error.message}`); // โยนข้อผิดพลาดหากไม่สามารถลบรูปภาพโปรไฟล์ได้
      }

      setAvatar(null); // รีเซ็ตค่ารูปภาพโปรไฟล์
    } catch (error) {
      console.error("Error deleting profile image:", error.message); // แสดงข้อความข้อผิดพลาดในกรณีเกิดข้อผิดพลาดในการลบรูปภาพ
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <div className="relative w-fit">
          <Image
            className="object-cover cursor-pointer w-44 h-44"
            alt="logo"
            src={avatarUrl}
            width={176}
            height={176}
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
