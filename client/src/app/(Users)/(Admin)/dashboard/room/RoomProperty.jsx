import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import getRoom from "@/lib/getRoom";
import Image from "next/image";
import useDateAndCurrencyHook from "@/hook/useDateAndCurrencyHook";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function RoomProperty() {
  const { formatNumberWithCommasAndTwoDecimals } = useDateAndCurrencyHook();
  let roomData;
  try {
    const res = await getRoom();
    roomData = res.data;
    // console.log("data:", res.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="min-h-screen bg-gray-300 bg-opacity-80">
      {/* Start Navbar */}
      <article className="w-full bg-utility-bg">
        <nav className="flex items-center justify-between px-16 py-6">
          <h1 className="flex-1 text-xl font-semibold text-gray-900">
            Room & Property
          </h1>
          <div className="flex items-center justify-end flex-1 gap-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                className="w-full py-3 pl-12 pr-4 border-2 border-gray-300 rounded-md outline-none"
                placeholder="Search..."
              />
              <FaSearch className="absolute text-xl text-gray-700 text-opacity-50 -translate-y-1/2 top-1/2 left-5" />
            </div>
            <Link href={"/dashboard/room/createroom"}>
              <Button className="px-8 py-4 font-semibold w-fit">
                + Create Room
              </Button>
            </Link>
          </div>
        </nav>
      </article>
      {/* End Navbar */}
      {/* Start Table */}
      <article className="p-16 rounded-t-md">
        <Table className="bg-white">
          <TableHeader className="bg-gray-800 bg-opacity-30 rounded-t-md">
            <TableRow className="font-medium text-gray-800 border-none">
              <TableHead>Image</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Promotion Price</TableHead>
              <TableHead>Guest(s)</TableHead>
              <TableHead>Bed Type</TableHead>
              <TableHead>Room Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roomData.map((item) => (
              <TableRow
                key={item.room_type_id}
                className="border border-gray-300"
              >
                <TableCell>
                  <Image
                    src={item.main_image}
                    alt={item.roomtypetitle}
                    width={120}
                    height={72}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell>{item.roomtypetitle}</TableCell>
                <TableCell>
                  {formatNumberWithCommasAndTwoDecimals(item.fullprice)}
                </TableCell>
                <TableCell>
                  {formatNumberWithCommasAndTwoDecimals(item.discountprice)}
                </TableCell>
                <TableCell> {item.guests} </TableCell>
                <TableCell> {item.bedtype} </TableCell>
                <TableCell> {item.roomarea} sqm </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </article>
      {/* End Table */}
    </section>
  );
}
