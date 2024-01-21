// File: server/api/travels/[id].delete.ts
import { defineEventHandler } from "h3";
import { deleteTravel } from "../../travelsData";

export default defineEventHandler((event) => {
  const travelId = parseInt(event.context.params.id);

  const result = deleteTravel(travelId);
  if (result) {
    return { message: "Travel deleted successfully" };
  } else {
    event.res.statusCode = 404;
    return { message: "Travel not found" };
  }
});
