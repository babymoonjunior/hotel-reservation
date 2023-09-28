export default async function getBooking(sort, order) {
  const res = await fetch(
    `http://localhost:4000/booking/booking-customers/${order}/${sort}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
