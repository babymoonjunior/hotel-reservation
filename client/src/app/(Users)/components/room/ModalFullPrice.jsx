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

export default function ModalFullPrice({
  updateRoomData,
  room,
  formatNumberWithCommasAndTwoDecimals,
}) {
  const [newPrice, setNewPrice] = useState(room.fullprice);
  const [open, setOpen] = useState(false);

  const updateFullPrice = async () => {
    try {
      await axios.put(`http://localhost:4000/rooms/change/fullprice/`, {
        fullprice: newPrice,
        room_type_id: room.room_type_id,
      });
      updateRoomData({ ...room, fullprice: newPrice });
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {formatNumberWithCommasAndTwoDecimals(room.fullprice)}
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle>
            Are you sure absolutely sure to change Full Price ?
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="fullprice">Full Price</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
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
