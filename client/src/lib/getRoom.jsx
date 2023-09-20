export default async function getRoom() {
  const res = await fetch("http://localhost:4000/rooms/roomdetail/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
