export default async function getBooking(sort, order) {
  const res = await fetch(
    `https://neatlyhotel.up.railway.app/booking/booking-customers/${order}/${sort}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
