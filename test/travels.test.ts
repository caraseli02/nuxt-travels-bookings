import { afterAll, afterEach, beforeAll, describe, it, expect } from "vitest";
import { setupServer } from "msw/node";
import { HttpResponse, http } from "msw";
import { bookings } from "../server/bookingsData";

export const restHandlers = [
  http.get("/api/bookings", () => {
    return HttpResponse.json(bookings);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

describe("API: bookings", () => {
  it("fetches booking data", async () => {
    const response = await fetch("http://localhost:3000/api/bookings");
    const data = await response.json();

    expect(response.ok).toBe(true);
    expect(data).toEqual(bookings);
  });

  // Add more tests as needed
});
