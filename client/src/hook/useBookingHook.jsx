"use client";
import React, { useEffect } from "react";

function useBookingHook(
  roomPrice,
  specialRequest,
  checkedIn,
  checkedOut,
  setTotalPrice,
  setNight,
  night,
  rooms
) {
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (isNaN(roomPrice)) {
        setTotalPrice("Invalid room price");
        return;
      }

      const specialRequestTotal = specialRequest.reduce((total, request) => {
        const requestPrice = parseFloat(convertPrice(request));
        if (!isNaN(requestPrice)) {
          return total + requestPrice;
        }
        return total;
      }, 0);

      const totalRoomPrice = roomPrice * rooms;
      const totalPrice = totalRoomPrice * night + specialRequestTotal;
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [roomPrice, specialRequest, night, setTotalPrice]);

  useEffect(() => {
    const calculateDateDifference = () => {
      const date1 = new Date(checkedIn);
      const date2 = new Date(checkedOut);
      const differenceInMilliseconds = date2 - date1;

      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
      setNight(differenceInDays);
      return differenceInDays;
    };
    calculateDateDifference();
  }, [checkedIn, checkedOut, setNight]);

  const convertPrice = (request) => {
    switch (request) {
      case "Baby cot":
        return "400.00";
      case "Airport transfer":
        return "200.00";
      case "Extra bed":
        return "500.00";
      case "Extra pillows":
        return "100.00";
      case "Phone chargers and adapters":
        return "100.00";
      case "Breakfast":
        return "150.00";
      default:
        return "0.00";
    }
  };

  const formatNumberWithCommasAndTwoDecimals = (input) => {
    const amount = typeof input === "string" ? parseFloat(input) : input;
    if (isNaN(amount)) {
      return "Invalid input";
    }
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedAmount;
  };

  const convertDate = (dateInput) => {
    let date = new Date(dateInput);
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = dayNames[date.getUTCDay()];
    let dayOfMonth = date.getUTCDate();
    let month = monthNames[date.getUTCMonth()];
    let year = date.getUTCFullYear();
    let formattedDate =
      dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
    return formattedDate;
  };

  return { convertPrice, formatNumberWithCommasAndTwoDecimals, convertDate };
}

export default useBookingHook;
