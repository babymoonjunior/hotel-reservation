"use client";

import { parse } from 'date-fns';
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
  isCheckOut
}) {
  const checkIn = parse(originalCheckIn, "EEE, dd MMM yyyy", new Date());
  const checkOut = parse(originalCheckOut, "EEE, dd MMM yyyy", new Date());
  const defaultDate = isCheckIn === true ? checkIn || new Date() : checkOut || new Date();
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [localDate, setLocalDate] = useState(date); 
 
  useEffect(() => {
    setLocalDate(selectedDate); // อัปเดต localDate ใน useEffect
  }, [selectedDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] text-left font-normal border border-[#D6D9E4] bg-white flex justify-between",
            !localDate && "text-muted-foreground"
          )}
          onClick={() => onDateChange(localDate)} // เมื่อคลิกปุ่มเลือกวันให้เรียกฟังก์ชัน onDateChange และส่งค่า localDate
        >
          {localDate ? (
            format(localDate, "EEE, dd MMM yyyy")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="mr-2 h-4 w-4  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date); // อัปเดต selectedDate เมื่อเลือกวันที่
            onDateChange(date); // เรียกฟังก์ชัน onDateChange และส่งค่าวันที่ที่เลือก
          }}
          initialFocus
          month={selectedDate}
        />
      </PopoverContent>
    </Popover>
  );
}
