"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RoomManageBody() {
  const [room, setRoom] = useState([]);
  const [roomStatus, setRoomStatus] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [order, setOrder] = useState("room_id");
  const [ascending, setAscending] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const statusColors = {
    Vacant: "bg-[#F0F2F8] text-[#006753] font-medium font-sans",
    Dirty: "bg-[#FFE5E5] text-[#A50606] font-medium font-sans",
    Occupied: "bg-[#E4ECFF] text-[#084BAF] font-medium font-sans",
    "Assign Clean": "bg-[#E5FFFA] text-[#006753] font-medium font-sans",
    "Assign Dirty": "bg-[#FFE5E5] text-[#A50606] font-medium font-sans",
    "Out of Service": "bg-[#F0F1F8] text-[#6E7288] font-medium font-sans",
  };

  const handleOnClick = async (status, index) => {
    const statusId = status.room_status_id;
    const roomId = room[index].room_id;

    const { error } = await supabase
      .from("rooms")
      .update({ room_status_id: statusId })
      .eq("room_id", roomId);

    if (error) {
      console.error("Error updating room status:", error);
    } else {
      // Update the local state to reflect the change
      const updatedRoom = [...room];
      updatedRoom[index].room_status.room_status_id = statusId;
      setRoom(updatedRoom);
      router.refresh();
    }
  };

  const getData = async () => {
    try {
      const result = await supabase
        .from("rooms")
        .select(
          `room_id,room_number,room_types(room_type_id,roomtypetitle,bedtype),room_status(room_status_id,room_status)`
        )
        .order(`${order}`, { ascending: `${ascending}` });

      const roomStatusData = await supabase.from("room_status").select("*");
      setRoomStatus(roomStatusData.data);
      setRoom(result.data);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [room, roomStatus]);

  return (
    <>
      <div className="flex justify-evenly gap-20 items-center h-20 sticky top-0 px-[60px] py-4 bg-utility-white font-sans font-semibold text-xl text-gray-900 shadow">
        <div>Room Management</div>
        <div className="flex justify-center items-center border border-gray-400 rounded-sm h-12 px-3 py-4 gap-4">
          <div className="flex justify-center items-center object-cover">
            <Image src="/search.svg" height={24} width={24} alt="search-icon" />
          </div>
          <input
            className="w-full h-6 outline-none font-normal"
            placeholder="Search ..."
          />
        </div>
      </div>
      <div className="h-full w-full flex bg-utility-bg p-10">
        <div className="h-full w-full  rounded-md overflow-hidden flex flex-col">
          <div className="flex justify-between items-center bg-gray-300 py-2 px-5 h-10 text-gray-800 font-sans font-medium mb-1 shadow-sm">
            <div className="basis-1/5">Room no.</div>
            <div className="basis-3/5">Room type</div>
            <div className="basis-2/5">Bed type</div>
            <div className="basis-2/5">Status</div>
          </div>
          {room.map((room, index) => (
            <div
              className="flex justify-between items-center bg-utility-white py-2 px-5 w-full h-[70px] mb-1 shadow-sm font-sans"
              id={room.room_id}
              key={room.room_id}
            >
              <div className="basis-1/5">{room.room_number}</div>
              <div className="basis-3/5">{room.room_types.roomtypetitle}</div>
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
                  <DropdownMenuContent className="bg-utility-white border-none overflow-y-auto w-[200px] h-[200px]">
                    {roomStatus.map((status) => (
                      <DropdownMenuItem
                        id={status.room_status}
                        key={status.room_status_id}
                      >
                        <button
                          onClick={() => handleOnClick(status, index)}
                          className={`px-2 py-1 rounded shadow ${
                            statusColors[status.room_status]
                          }`}
                        >
                          {status.room_status}
                        </button>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
