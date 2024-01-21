// File: server/api/travels.post.ts
import { defineEventHandler } from "h3";
import { addTravel } from "../travelsData";

export default defineEventHandler(async (event) => {
  const newTravel = await readBody(event);
  
  return addTravel(newTravel);
});
