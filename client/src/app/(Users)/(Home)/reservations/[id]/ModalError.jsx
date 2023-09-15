"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ModalError({ open, setOpen, errorMessage }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] border-orange-500">
        <DialogHeader>
          <DialogTitle>Neatly Hotel Message:</DialogTitle>
          <DialogDescription>{errorMessage}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
