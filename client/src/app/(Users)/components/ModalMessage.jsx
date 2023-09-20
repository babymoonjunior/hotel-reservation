"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ModalMessage({ open, setOpen, message }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] border-orange-500">
        <DialogHeader>
          <DialogTitle>Neatly Hotel Message:</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
