//localhost:3000/search
"use client";

import "@/app/globals.css";
import SearchBar from "@/components/SearchBar";
import { useSearchContext } from "@/context/searchRoom";

export const metadata = {
  title: "Search Room",
  description: "ค้นหาห้องพัก",
};

export default function Searchpage() {
  const { data } = useSearchContext();

  console.log(data);
  return (
    <>
      {/* ใส่ Component2 <Searchbar /> ที่นี่ (Nu) */}
      <SearchBar page="searchpage" />

      <h2 className="font-sans bg-orange-300 ">Search Results ผลการค้นหา</h2>

      {/* <Searchbar /> */}
      {/* ใส่ Component3 <Searchresults /> ที่นี่ (Wen) */}
    </>
  );
}
