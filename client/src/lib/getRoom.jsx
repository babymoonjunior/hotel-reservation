export default async function getRoom() {
  const res = await fetch(
    "https://neatlyhotel.up.railway.app/rooms/roomdetail/",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
