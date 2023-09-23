export default async function getSixRoom() {
  const res = await fetch(
    "http://localhost:4000/rooms/roomdetail/randomforsix/",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
