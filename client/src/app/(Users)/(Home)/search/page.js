//localhost:3000/search
"use client";

import "@/app/globals.css";
import SearchBar from "@/components/SearchBar";
import { useSearchContext } from "@/context/searchRoom";
import SearchResultsPage from "../../components/SearchResults";

export const metadata = {
  title: "Search Room",
  description: "ค้นหาห้องพัก",
};

export default function Searchpage() {
  const { data } = useSearchContext();

  return (
    <>
      {/* ใส่ Component2 <Searchbar /> ที่นี่ (Nu) */}
      <SearchBar page="searchpage" />

      {/* <Searchbar /> */}
      {/* ใส่ Component3 <Searchresults /> ที่นี่ (Wen) */}
      <SearchResultsPage roomDataArray={data} />
    </>
  );
}
