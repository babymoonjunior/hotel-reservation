"use client";
import React, { createContext, useContext, useState } from "react";
import { addDays } from "date-fns";
import axios from "axios";

const SearchContext = createContext({});

export default function SearchRoomProvider({ children }) {
  const [data, setData] = useState([]);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const [date, setDate] = useState({
    from: tomorrow,
    to: addDays(tomorrow, 1),
  });
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [checkedIn, setChekedIn] = useState(null);
  const [checkedOut, setChekedOut] = useState(null);
  const [customRoomOpen, setCustomRoomOpen] = useState(false);

  const handleSearch = async (checkedin, checkedout, guest) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/rooms/available-rooms?check_in_date=${checkedin}&check_out_date=${checkedout}&quantity=${guest}`
      );
      setData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClickSearch = () => {
    const dateFrom = date.from;
    setChekedIn(dateFrom.toISOString().split("T")[0]);
    const dateTo = date.to;
    setChekedOut(dateTo.toISOString().split("T")[0]);
    if (checkedIn && checkedOut && guests >= 1) {
      handleSearch(checkedIn, checkedOut, guests);
    }
  };
  return (
    <SearchContext.Provider
      value={{
        data,
        today,
        date,
        setDate,
        rooms,
        setRooms,
        guests,
        setGuests,
        checkedIn,
        setChekedIn,
        checkedOut,
        setChekedOut,
        customRoomOpen,
        setCustomRoomOpen,
        handleOnClickSearch,
        handleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
