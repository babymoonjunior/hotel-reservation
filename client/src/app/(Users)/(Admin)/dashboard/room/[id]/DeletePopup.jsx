"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useSearchParams } from "next/navigation";
// import useDateAndCurrencyHook from "@/hook/useDateAndCurrencyHook";
// import ModalMessage from "./ModalMessage";

export default function DeletePopup({ onOpenChange, paramId }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleDeleteRoom = async () => {
    try {
      const { error } = await supabase
        .from("room_types")
        .delete()
        .eq("room_type_id", paramId);

      alert("Roomtype has been deleted");
      router.replace("/dashboard/room");
      if (error) {
        console.log(error);
      }
    } catch (error) {
      alert("Roomtype has not been deleted");
      console.log(error);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <>
      <div className="popup bg-white max-w-[550px] w-full font-sans">
        <div className="flex flex-row justify-between items-center border-b border-[#E4E6ED] px-4 py-2">
          <span className="modal-title text-xl font-semibold leading-[150%] tracking-[-0.4px]">
            Delete Room
          </span>
          {/* <button className="text-[#C8CCDB]" onClick={() => handleClose()}>
            X
          </button> */}
        </div>
        <div className="p-4">
          <p className="modal-question text-[#646D89] text-base font-normal leading-[150%] tracking-[-0.32px] pb-4">
            Are you sure you want to delete this room?
          </p>
          <div className="flex flex-row justify-end">
            <Button
              variant="secondary"
              className="mr-3 left-button w-fit"
              onClick={() => handleDeleteRoom()}
            >
              Yes, I want to delete
            </Button>
            <Button
              // id={booking_id}
              className="right-button w-fit"
              onClick={() => handleClose()}
            >
              No, I don't
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
