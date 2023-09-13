"use client"

import * as React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function ChangeDatePicker() {
  const [date, setDate] = useState(new Date())


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] text-left font-normal border border-[#D6D9E4] bg-white flex justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date ? format(date, "EEE, dd MMM yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="mr-2 h-4 w-4  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
