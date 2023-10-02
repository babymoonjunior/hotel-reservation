export default async function getRoomRandom() {
  const res = await fetch(
    "https://neatlyhotel.up.railway.app/rooms/randomroom",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
