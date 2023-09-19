"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ChangeCheckOutDatePicker({
  date,
  onDateChange,
  originalCheckIn,
  originalCheckOut,
  isCheckIn,
  isCheckOut,
}) {
  const defaultCheckOut = new Date(originalCheckOut); // แปลงเป็น object Date
  const [selectedDate, setSelectedDate] = useState(defaultCheckOut);
  
 useEffect(() => {
 
  if(isCheckOut){
    setSelectedDate(selectedDate);
  }
  }, [selectedDate]);

  //เงื่อนไขการ disabled
  const disabledDays = (date) => {
    // ตรวจสอบว่าวันนี้เป็นวันในอดีตของวันปัจจุบัน
    const isPastDay = date < new Date();

    // ตรวจสอบว่าวันนี้เป็นวันที่จองไปแล้ว
    const isBookedDay = isBooked(date);

    // ถ้าวันนี้เป็นวันในอดีตของวันปัจจุบันหรือวันที่จองไปแล้ว ให้ปิดใช้งาน
    return isPastDay || isBookedDay;
  };

  //วันที่จองแล้ว
  const [bookedRange, setBookedRange] = useState({
    from: new Date(originalCheckIn), // วัน check-in
    to: new Date(originalCheckOut), // วัน check-out
  });

  const isBooked = (day) => {
    // ตรวจสอบว่าวันที่ที่ส่งเข้ามาอยู่ในช่วงวันที่จองหรือไม่
    return day >= bookedRange.from && day <= bookedRange.to;
  };

  const footer = isBooked(selectedDate)
    ? "วันนี้มีคนจองแล้ว!"
    : "กรุณาเลือกวันที่ต้องการ";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] text-left font-normal border border-[#D6D9E4] bg-white flex justify-between",
            !selectedDate && "text-muted-foreground"
          )}
          onClick={() => onDateChange(selectedDate)} // เมื่อคลิกปุ่มเลือกวันให้เรียกฟังก์ชัน onDateChange และส่งค่า selectedDate
        >
          {/* format selectedDate: Mon Sep 25 2023 00:00:00 GMT+0700 (เวลาอินโดจีน) */}
          {/* {console.log(selectedDate)} */}
          {selectedDate ? (
            format(selectedDate, "EEE, dd MMM yyyy")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          required
          selected={selectedDate}
          onSelect={(dateCalendar) => {
            setSelectedDate(dateCalendar); // อัปเดต selectedDate เมื่อเลือกวันที่
            onDateChange(dateCalendar); // เรียกฟังก์ชัน onDateChange และส่งค่าวันที่ที่เลือก
          }}
          initialFocus
          disabled={disabledDays}
          defaultMonth={selectedDate}
          modifiers={{ booked: isBooked }}
          modifiersStyles={{
            disabled: {
              background: "none", // พื้นหลังสีขาว
              color: "gray", // ตัวหนังสือสีเทา
            },
            booked: {
              backgroundColor: "lightgrey", // สีพื้นหลังสำหรับวันที่จองแล้ว
              color: "white", // สีตัวหนังสือสำหรับวันที่จองแล้ว
            },
          }}
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  );
}

