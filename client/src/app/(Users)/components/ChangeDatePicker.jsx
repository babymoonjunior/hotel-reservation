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

export function ChangeDatePicker({
  date,
  onDateChange,
  originalCheckIn,
  originalCheckOut,
  isCheckIn,
  isCheckOut,
}) {
  // const checkIn = parse(originalCheckIn, "EEE, dd MMM yyyy", new Date());
  // const checkOut = parse(originalCheckOut, "EEE, dd MMM yyyy", new Date());
  const checkIn = originalCheckIn;
  const checkOut = originalCheckOut;
  const dateCalendar = new Date(date);
  const defaultDateStr =
    isCheckIn === true ? checkIn || new Date() : checkOut || new Date();
  const defaultDate = new Date(defaultDateStr); // แปลงเป็นวัตถุ Date
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  // const [newCheckInDate, setNewCheckInDate] = useState(selectedDate);
  // const [newCheckOutDate, setNewCheckOutDate] = useState(selectedDate);

  // if (isCheckIn) {
  //   setNewCheckInDate(selectedDate);
  //   console.log(newCheckInDate);
  // }else{
  //   setNewCheckInDate(defaultDate);
  // }

  // if (isCheckOut) {
  //   setNewCheckOutDate(selectedDate);
  //   console.log(newCheckOutDate);
  // }else{
  //   setNewCheckOutDate(defaultDate);
  // }


  useEffect(() => {
    // console.log(dateCalendar);
    console.log(defaultDate);
    // console.log(localDate);
    // console.log(selectedDate);
    // console.log(new Date());
    console.log(checkIn,originalCheckIn);
    console.log(checkOut,originalCheckOut);

    // console.log(defaultDate,selectedDate);
    // console.log(new Date(selectedDate));
  }, []);

  useEffect(() => {
    setSelectedDate(selectedDate); // อัปเดต localDate ใน useEffect
    console.log(selectedDate);
  }, [selectedDate]);

  // const disabledDays = [
  //   new Date(2022, 5, 10),
  //   new Date(2022, 5, 12),
  //   new Date(2022, 5, 20),
  //   { from: new Date(2022, 4, 18), to: new Date(2022, 4, 29) }
  // ];

//เงื่อนไขการ disabled
  const disabledDays = (date) => {
    // ตรวจสอบว่าวันนี้เป็นวันในอดีตของวันปัจจุบัน
    const isPastDay = date < new Date();

    // ตรวจสอบว่าวันนี้เป็นวันที่จองไปแล้ว
    const isBookedDay = isBooked(date);

    // ถ้าวันนี้เป็นวันในอดีตของวันปัจจุบันหรือวันที่จองไปแล้ว ให้ปิดใช้งาน
    return isPastDay || isBookedDay;
  }

//วันที่จองแล้ว 
  const [bookedRange, setBookedRange] = useState({
    from: new Date(originalCheckIn), // วัน check-in
    to: new Date(originalCheckOut),   // วัน check-out
  });

  const isBooked = (day) => {
    // ตรวจสอบว่าวันที่ที่ส่งเข้ามาอยู่ในช่วงวันที่จองหรือไม่
    return (
      day >= bookedRange.from && day <= bookedRange.to
    );
  };

  const footer = isBooked(selectedDate)
  ? 'This day is already booked!'
  : 'Try to pick a booked day.';

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
          {console.log(selectedDate)}
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
            console.log(dateCalendar);
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
              backgroundColor: 'lightgrey', // สีพื้นหลังสำหรับวันที่จองแล้ว
              color: 'white',          // สีตัวหนังสือสำหรับวันที่จองแล้ว
            },
          }}
          
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  );
}

// const bookedDays = [new Date(2023, 10, 22), new Date(2023, 9, 29)];
  // const isBooked = (day) => {
  //   // ตรวจสอบว่าวันที่ที่ส่งเข้ามาอยู่ใน bookedDates หรือไม่
  //   return bookedDays.some((bookedDate) => {
  //     return (
  //       day.getFullYear() === bookedDate.getFullYear() &&
  //       day.getMonth() === bookedDate.getMonth() &&
  //       day.getDate() === bookedDate.getDate()
  //     );
  //   });
  // };
  // const [booked, setBooked] = useState(false);
    // const footer = booked
  //   ? 'This day is already booked!'
  //   : 'Try to pick a booked day.';

            // onSelect={(date) => {
          //   // setSelectedDate(new Date(date)); // อัปเดต selectedDate เมื่อเลือกวันที่
          //   // onDateChange(new Date(date)); // เรียกฟังก์ชัน onDateChange และส่งค่าวันที่ที่เลือก
          //   setSelectedDate(new Date()); // อัปเดต selectedDate เมื่อเลือกวันที่
          //   onDateChange(new Date()); // เรียกฟังก์ชัน onDateChange และส่งค่าวันที่ที่เลือก
          // }}
 // onDayClick={handleDayClick}
          // const handleDayClick = (day, modifiers) => {
          //   // setBooked(day && modifiers.booked);
          // };