// File: server/api/travels/[id].put.ts
import { defineEventHandler } from "h3";
import { updateTravel } from "../../travelsData";

export default defineEventHandler(async (event) => {
  const updatedTravel = await readBody(event);
  if (!event.context.params) return { message: "Travel not found" };
  const travelId = parseInt(event.context.params.id);

  const result = updateTravel(travelId, updatedTravel);
  if (result) {
    return result;
  } else {
    event.res.statusCode = 404;
    return { message: "Travel not found" };
  }
});
