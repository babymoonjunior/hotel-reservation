"use client";
import { useState } from "react";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RoomManageBody() {
  const [room, setRoom] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState("room_id");
  const [ascending, setAscending] = useState(true);
  const supabase = createClientComponentClient();

  const statusColors = {
    Vacant: "bg-green-500",
    Dirty: "bg-red-500",
    Occupied: "bg-red-500",
    "Assign Clean": "bg-green-500",
    "Assign Dirty": "bg-red-500",
    "Out of Service": "bg-gray-500",
  };

  const getData = async () => {
    try {
      const result = await supabase
        .from("rooms")
        .select(
          `room_id,room_number,room_types(room_type_id,roomtypetitle,bedtype),room_status(room_status_id,room_status)`
        )
        // room_id,room_number,room_status,room_types(room_type_id,roomtypetitle,bedtype),room_status_types(id,room_status)
        .order("room_id", { ascending: true });
      // .order("room_types(room_type_id)", { ascending: true });
      // .order("room_types(bedtype)", { ascending: true });
      // .order("room_status", { ascending: true });
      const roomStatusData = await supabase
        .from("room_status")
        .select("room_status");
      setRoomStatus(roomStatusData.data);
      console.log(roomStatusData.data);
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
                  id={room.room_id}
                >
                  <div className="basis-1/5">{room.room_number}</div>
                  <div className="basis-3/5">
                    {room.room_types.roomtypetitle}
                  </div>
                  <div className="basis-2/5">{room.room_types.bedtype}</div>
                  <div className="basis-2/5">
                    <DropdownMenu className="outline-none">
                      <DropdownMenuTrigger
                        className={`outline-none px-2 py-1 rounded ${
                          statusColors[room.room_status.room_status]
                        }`}
                      >
                        {room.room_status.room_status}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-utility-white border-none">
                        {roomStatus.map((status) => {
                          return (
                            <>
                              <DropdownMenuItem
                                id={status.room_status}
                                className={`px-2 py-1 rounded ${
                                  statusColors[status.room_status]
                                }`}
                              >
                                {status.room_status}
                              </DropdownMenuItem>
                            </>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
