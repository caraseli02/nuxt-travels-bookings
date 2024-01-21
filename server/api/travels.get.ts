// File: server/api/travels.ts
import { defineEventHandler } from "h3";
import { travels } from "../travelsData";

export default defineEventHandler(() => {
  return travels;
});
