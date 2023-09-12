"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/searchRoom";

export default function BookNow({ roomData }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { rooms } = useSearchContext();
  const disabledButton = roomData.available_rooms_count < rooms;

  // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    // โค้ดเช็คสถานะการเข้าสู่ระบบจริง

    const userIsLoggedIn = true;
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  // ฟังก์ชันเมื่อคลิกปุ่ม "Book Now"
  const handleBookNowClick = () => {
    // ถ้ายังไม่ได้ Log-in ให้ redirect ไปที่หน้า Log-in
    // if (!isLoggedIn) {
    //   router.push("/login"); //
    //   return;
    // }
    // ถ้า Log-in แล้ว ให้ไปที่หน้า Payment
    // router.push(`/reservations/${id}`);
  };

  return (
    <>
      <Link href={`/reservations/${roomData.room_type_id}`}>
        <Button disabled={disabledButton}>Book Now</Button>
      </Link>
    </>
  );
}
