// File: server/api/travelsData.ts

export const travels = [
  {
    id: 1,
    image: "https://picsum.photos/100",
    name: "Paris Getaway",
    dates: {
      departure: "2024-07-14",
      return: "2024-07-20",
    },
    price: 1200,
    averageRating: 3.5,
  },
  {
    id: 2,
    image: "https://picsum.photos/100",
    name: "Venice Adventure",
    dates: {
      departure: "2024-08-05",
      return: "2024-08-12",
    },
    price: 1500,
    averageRating: 4.7,
  },
];

export function findTravelById(id: number) {
  return travels.find((travel) => travel.id === id);
}

export function addTravel(newTravel: any) {
  newTravel.id = travels.length + 1;
  travels.push(newTravel);
  console.log(newTravel);
  return newTravel;
}

export function updateTravel(id: number, updatedTravel: any) {
  const index = travels.findIndex((t) => t.id === id);
  if (index !== -1) {
    travels[index] = updatedTravel;
    return updatedTravel;
  }
  return null;
}

export function deleteTravel(id: number) {
  const index = travels.findIndex(t => t.id === id);
  if (index !== -1) {
    travels.splice(index, 1);
    return true; // Return true to indicate successful deletion
  }
  return false; // Return false if travel not found
}
