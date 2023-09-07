"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function BookNow() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    // โค้ดเช็คสถานะการเข้าสู่ระบบจริง

    const userIsLoggedIn = true; 
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  // ฟังก์ชันเมื่อคลิกปุ่ม "Book Now"
  const handleBookNowClick = () => {
    // ถ้ายังไม่ได้ Log-in ให้ redirect ไปที่หน้า Log-in
    if (!isLoggedIn) {
      router.push("/login"); //
      return;
    }

    // ถ้า Log-in แล้ว ให้ไปที่หน้า Payment 
    router.push("/payment"); 
  };

  return (
    <>
      <Button onClick={handleBookNowClick}>Book Now</Button>
    </>
  );
}
