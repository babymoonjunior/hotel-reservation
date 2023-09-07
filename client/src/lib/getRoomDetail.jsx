export default async function getRoomDetail(id) {
  const response = await fetch(`http://localhost:4000/rooms/roomdetail/${id}`, {
    next: { revalidate: 600 },
    // revalidate data every 10 min
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
