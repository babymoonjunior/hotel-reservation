//localhost:3000/search
"use client";

import "@/app/globals.css";
import SearchBar from "@/components/SearchBar";
import { useSearchContext } from "@/context/searchRoom";
import SearchResultsPage from "../../components/SearchResults";
import Spinner from "@/components/ui/Spinner";

export const metadata = {
  title: "Search Room",
  description: "ค้นหาห้องพัก",
};

export default function Searchpage() {
  const { data, loading } = useSearchContext();

  return (
    <>
      {/* ใส่ Component2 <Searchbar /> ที่นี่ (Nu) */}
      <section className="sticky w-full bg-white top-[100px] z-50">
        <SearchBar page="searchpage" />
      </section>

      {/* <Searchbar /> */}
      {/* ใส่ Component3 <Searchresults /> ที่นี่ (Wen) */}
      {loading ? <Spinner /> : <SearchResultsPage roomDataArray={data} />}
    </>
  );
}
