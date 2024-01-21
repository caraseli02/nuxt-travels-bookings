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
