"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import axios from "axios";

export default function ModalDiscountPrice({
  updateRoomData,
  room,
  formatNumberWithCommasAndTwoDecimals,
}) {
  const [newDiscountPrice, setNewDiscountPrice] = useState(room.discountprice);
  const [open, setOpen] = useState(false);

  const updateFullPrice = async () => {
    try {
      await axios.put(`http://localhost:4000/rooms/change/discountprice/`, {
        discountprice: newDiscountPrice,
        room_type_id: room.room_type_id,
      });
      updateRoomData({ ...room, discountprice: newDiscountPrice });
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {formatNumberWithCommasAndTwoDecimals(room.discountprice)}
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>
            Are you sure absolutely sure to change Discount Price ?
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="fullprice">Discountprice Price</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md"
                value={newDiscountPrice}
                onChange={(e) => setNewDiscountPrice(e.target.value)}
              />
              <Button className="self-end" onClick={updateFullPrice}>
                Change
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
