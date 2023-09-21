export default async function getBooking() {
  const res = await fetch("http://localhost:4000/booking/booking-customers", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
