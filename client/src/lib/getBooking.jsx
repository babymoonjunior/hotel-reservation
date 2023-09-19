export default async function getBooking() {
  const res = await fetch("http://localhost:4000/booking/booking-customers", {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
