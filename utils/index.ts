interface DateRange {
  departure: string;
  return: string;
}

export function formatDate(dates: DateRange): string {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const departureDate = new Date(Date.parse(dates.departure));
  const returnDate = new Date(Date.parse(dates.return));

  const formattedDeparture = `${departureDate.getDate()} ${monthNames[departureDate.getMonth()]}`;
  const formattedReturn = `${returnDate.getDate()} ${monthNames[returnDate.getMonth()]}`;

  return `From ${formattedDeparture} to ${formattedReturn}`;
}

// Function to validate customer information
export function validateCustomerInfo(customerInfo: { name: string; email: string; phoneNumber: string; age: number; gender: string; }): boolean {
  // Check if name is provided
  if (!customerInfo.name) return false;

  // Check if email is valid
  if (!customerInfo.email || !validateEmail(customerInfo.email)) return false;

  // Check if phone number is provided
  if (!customerInfo.phoneNumber) return false;

  // Check if age is within a reasonable range
  if (customerInfo.age <= 0 || customerInfo.age > 120) return false;

  // Check if gender is provided (could be optional based on your application requirements)
  if (!customerInfo.gender) return false;

  // All validations passed
  return true;
}

// Function to validate payment type
export function validatePaymentInfo(paymentType: string): boolean {
  // Check if paymentType is one of the acceptable values
  const validPaymentTypes = ['transfer', 'paypal', 'revolut'];
  return validPaymentTypes.includes(paymentType);
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
