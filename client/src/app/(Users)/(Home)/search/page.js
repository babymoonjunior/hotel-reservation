//localhost:3000/search
import "@/app/globals.css";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "Search Room",
  description: "ค้นหาห้องพัก",
};

export default function Searchpage() {
  return (
    <>
      {/* ใส่ Component2 <Searchbar /> ที่นี่ (Nu) */}
      <div>
        {" "}
        <SearchBar page="searchpage" />
      </div>

      <h2 className="font-sans bg-orange-300 ">Search Results ผลการค้นหา</h2>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      <h1 className="text-5xl">asdfasdfasdf</h1>
      {/* <Searchbar /> */}
      {/* ใส่ Component3 <Searchresults /> ที่นี่ (Wen) */}
    </>
  );
}
