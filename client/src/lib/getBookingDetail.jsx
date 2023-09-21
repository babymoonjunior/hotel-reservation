export default async function getBookingDetails(id) {
  const response = await fetch(
    `http://localhost:4000/booking/booking-customers/${id}`,
    {
      cache: "force-cache",
      // revalidate data every 10 min
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
