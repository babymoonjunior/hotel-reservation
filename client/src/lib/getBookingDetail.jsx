export default async function getBookingDetails(id) {
  const response = await fetch(
    `http://localhost:4000/booking/booking-customers/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
