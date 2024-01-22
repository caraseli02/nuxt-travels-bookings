export interface Travel {
  id: number | string;
  name: string;
  dates: {
    departure: string;
    return: string;
  };
  image: string;
  description: string;
  price: number;
  averageRating: number;
}

// Use Omit to exclude 'id' and 'averageRating' from Travel
export type SimplifiedTravel = Omit<Travel, "id" | "averageRating">;

export interface CustomerInfo {
  name: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
}

export interface Booking {
  id: number | string;
  travelId: number | string;
  customerInfo: CustomerInfo;
  paymentType: "CreditTransfer" | "PayPal" | "Revolut";
  notes?: string; // Optional field
}

// Use Omit to exclude 'id' from Booking
export type SimplifiedBooking = Omit<Booking, "id">;
