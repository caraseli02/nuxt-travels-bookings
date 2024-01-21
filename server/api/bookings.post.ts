// File: server/api/bookings.post.ts
import { defineEventHandler } from "h3";
import { addBooking } from "../bookingsData";

export default defineEventHandler((event) => {
  const newBooking = readBody(event);
  return addBooking(newBooking);
});
