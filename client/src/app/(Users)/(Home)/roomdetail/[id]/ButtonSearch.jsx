"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/searchRoom";
import Link from "next/link";
import { addDays } from "date-fns";

export default function ButtonSearch() {
  const { handleSearch } = useSearchContext();
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const theDayAfterTomorrow = addDays(today, 2);
  return (
    <Button
      onClick={() => handleSearch(tomorrow, theDayAfterTomorrow, 1)}
      className="w-full"
    >
      <Link href={"/search"}>Book Now</Link>
    </Button>
  );
}
