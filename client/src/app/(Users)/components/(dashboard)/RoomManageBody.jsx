"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function RoomManageBody() {
  const [room, setRoom] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClientComponentClient();

  const getData = async () => {
    try {
      const result = await supabase
        .from("rooms")
        .select(
          `room_id,room_number,room_status,room_types(room_type_id,roomtypetitle,bedtype)`
        );

      setRoom(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="h-full w-full flex bg-utility-bg p-10">
        <div className="h-full w-full  rounded-md overflow-hidden flex flex-col">
          <div className="flex justify-between items-center bg-gray-300 py-2 px-5 h-10 text-gray-800 font-sans font-medium mb-1 shadow-sm">
            <div className="basis-1/5">Room no.</div>
            <div className="basis-3/5">Room type</div>
            <div className="basis-2/5">Bed type</div>
            <div className="basis-2/5">Status</div>
          </div>
          {room.map((room) => {
            return (
              <>
                <div
                  className="flex justify-between items-center bg-utility-white py-2 px-5 w-full h-[70px] mb-1 shadow-sm"
                  id="room.room_id"
                >
                  <div className="basis-1/5">{room.room_number}</div>
                  <div className="basis-3/5">
                    {room.room_types.roomtypetitle}
                  </div>
                  <div className="basis-2/5">{room.room_types.bedtype}</div>
                  <div className="basis-2/5">{room.room_status}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
