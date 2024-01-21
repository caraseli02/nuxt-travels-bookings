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
export type SimplifiedTravel = {
  image: string;
  name: string;
  dates: {
    departure: string;
    return: string;
  };
  price: string;
  description: string;
};

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
