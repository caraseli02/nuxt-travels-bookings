// File: server/api/bookings/[id].delete.ts
import { defineEventHandler } from "h3";
import { deleteBooking } from "../../bookingsData";

export default defineEventHandler((event) => {
  if (!event.context.params) return { message: "Booking not found" };
  const bookingId = parseInt(event.context.params.id);

  const result = deleteBooking(bookingId);
  if (result) {
    return { message: "Booking deleted successfully" };
  } else {
    event.res.statusCode = 404;
    return { message: "Booking not found" };
  }
});
