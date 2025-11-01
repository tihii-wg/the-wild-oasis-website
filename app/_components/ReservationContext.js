"use client";
import { createContext, useContext, useState } from "react";

const ReservationContect = createContext();

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContect.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContect.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContect);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
