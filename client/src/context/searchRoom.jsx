"use client";
import React, { createContext, useContext, useState } from "react";
import { addDays } from "date-fns";
import axios from "axios";

const SearchContext = createContext({});

export default function SearchRoomProvider({ children }) {
  const [data, setData] = useState([]);
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const theDayAfterTomorrow = addDays(today, 2);
  const [date, setDate] = useState({
    from: tomorrow,
    to: addDays(tomorrow, 1),
  });
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkedIn, setChekedIn] = useState(tomorrow);
  const [checkedOut, setChekedOut] = useState(theDayAfterTomorrow);
  const [customRoomOpen, setCustomRoomOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (checkedin, checkedout, quantity) => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/rooms/available-rooms?check_in_date=${checkedin}&check_out_date=${checkedout}&quantity=${quantity}`
        );
        setData(result.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setTimeout(fetchData, 1000);
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
        handleSearch,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
