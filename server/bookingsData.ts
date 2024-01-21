// File: server/api/bookingsData.ts

export const bookings = [
  // Initial mock data for bookings
  {
    id: 1,
    travelId: "1",
    customerInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phoneNumber: "123-456-7890",
      age: 30,
      gender: "Male",
    },
    paymentType: "CreditTransfer",
    notes: "Allergic to peanuts",
  },
  {
    id: 2,
    travelId: "2",
    customerInfo: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNumber: "098-765-4321",
      age: 25,
      gender: "Female",
    },
    paymentType: "PayPal",
    notes: "Window seat preferred",
  },
  // Add more mock bookings if needed
];

export function addBooking(newBooking: any) {
  newBooking.id = bookings.length + 1;
  bookings.push(newBooking);
  return newBooking;
}

export function updateBooking(id: number, updatedBooking: any) {
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index] = updatedBooking;
    return updatedBooking;
  }
  return null;
}

export function deleteBooking(id: number) {
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings.splice(index, 1);
    return true;
  }
  return false;
}
