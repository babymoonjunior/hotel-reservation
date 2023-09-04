//localhost:3000/search

import '@/app/globals.css'

export const metadata = {
  title: 'Search Room',
  description: 'ค้นหาห้องพัก',
}

export default function Searchpage() {
  return (
    <>
      <h2 className=" font-sans bg-orange-300 h-[500px]">Search Results ผลการค้นหา</h2>
      {/* ใส่ Component2 <Searchbar /> ที่นี่ (Nu) */}
      {/* <Searchbar /> */}
      {/* ใส่ Component3 <Searchresults /> ที่นี่ (Wen) */}

    </>
  );
}