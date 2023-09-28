"use client";
import React, { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

export default function Notification({ profileId, avatar }) {
  const supabase = createClientComponentClient();
  const [noti, setNoti] = useState([]);
  const [unRead, setUnRead] = useState(0);
  const [open, setOpen] = useState(false);
  const handleReadRef = useRef(false);
  const handleViewRef = useRef(false);

  const getNotification = async () => {
    let { data: notification, error } = await supabase
      .from("notification")
      .select("*")
      .eq("profile_id", profileId)
      .eq("status", "unread")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error From Get Notification`);
    }

    setNoti(notification);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getReadNotification = async () => {
    try {
      let { data: notification, error } = await supabase
        .from("notification")
        .select("*")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(`Error From Get ReadNotification`);
      }

      setNoti(notification);
      handleViewRef.current = true;
    } catch (error) {
      console.log(error);
    }
  };

  const unReadPopUp = () => {
    const result = noti.filter((item) => item.status === "unread");
    setUnRead(result.length);
  };

  const handleRead = async () => {
    try {
      if (!handleReadRef.current) {
        await axios.put("http://localhost:4000/notification/read", {
          profile_id: profileId,
        });
        const updatedNoti = noti.map((item) => {
          if (item.status !== "read") {
            return { ...item, status: "read" };
          }
          return item;
        });
        setNoti([...updatedNoti]);
        handleReadRef.current = true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    unReadPopUp();
    console.log(profileId);
  }, [noti]);

  useEffect(() => {
    getNotification();
  }, []);

  useEffect(() => {
    if (open) {
      handleRead();
    }
  }, [open]);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="relative outline-none">
          <Avatar className="relative flex items-center justify-center bg-utility-bg">
            <AvatarImage
              src="/bell.svg"
              className="w-[18px] h-[18px] opacity-50"
              alt="Notification Bell"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {unRead > 0 && (
            <p className="absolute z-20 w-6 h-6 p-1 text-xs text-center text-white bg-orange-500 rounded-full -top-2 -right-2">
              {unRead}
            </p>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-sm overflow-scroll border border-gray-200 scroll-notification max-h-96 bg-utility-white">
          {noti.map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="flex items-start gap-4 text-gray-700 rounded-none"
            >
              <Avatar className="flex items-center justify-center bg-utility-bg">
                <AvatarImage
                  src={avatar}
                  className="w-8 h-8 rounded-full"
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{item.message}</p>
            </DropdownMenuItem>
          ))}
          {!handleViewRef.current && (
            <p
              onClick={() => getReadNotification()}
              className="text-sm text-center text-orange-500 underline cursor-pointer underline-offset-2"
            >
              View More
            </p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
