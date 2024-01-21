// File: server/api/bookings.ts
import { defineEventHandler } from "h3";
import { bookings } from "../bookingsData";

export default defineEventHandler(() => {
  return bookings;
});
