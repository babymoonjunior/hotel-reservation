export default async function getRoomRandom() {
  const res = await fetch("http://localhost:4000/rooms/randomroom", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
