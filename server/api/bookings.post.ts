// File: server/api/bookings.post.ts
import { defineEventHandler } from "h3";
import { addBooking } from "../bookingsData";

export default defineEventHandler(async (event) => {
  const newBooking = await readBody(event);
  return addBooking(newBooking);
});
