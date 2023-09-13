"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/searchRoom";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function BookNow({ roomData }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { rooms } = useSearchContext();
  const disabledButton = roomData.available_rooms_count < rooms;

  // ฟังก์ชันเมื่อคลิกปุ่ม "Book Now"
  const handleBookNowClick = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session !== null) {
      router.push(`/reservations/${roomData.room_type_id}`);
    } else {
      router.push("/login");
    }
    if (error) {
      alert(`${error.message}`);
    }
  };

  return (
    <>
      <Button onClick={() => handleBookNowClick()} disabled={disabledButton}>
        Book Now
      </Button>
    </>
  );
}
