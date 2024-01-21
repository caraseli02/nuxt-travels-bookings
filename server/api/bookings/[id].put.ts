// File: server/api/bookings/[id].put.ts
import { defineEventHandler } from "h3";
import { updateBooking } from "../../bookingsData";

export default defineEventHandler((event) => {
  const updatedBooking = readBody(event);
  const bookingId = parseInt(event.context.params.id);

  const result = updateBooking(bookingId, updatedBooking);
  if (result) {
    return result;
  } else {
    event.res.statusCode = 404;
    return { message: "Booking not found" };
  }
});
