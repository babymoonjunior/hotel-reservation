// const useUserAddress = async (id) => {
//   let address = {};
//   let response = await fetch(`http://localhost:4000/users/profiles/${id}`);

//   if (response) {
//     let data = await response.json();
//     if (data) address = data;
//   }

//   return address;
// };

// export default useUserAddress;

// export default async function useUserAddress(id) {
//   try {
//     let response = await fetch(`http://localhost:4000/users/profiles/${id}`);

//     if (!response.ok) {
//       throw new Error("Request failed"); // Handle non-2xx response status
//     }

//     const data = await response.json();

//     if (!data) {
//       throw new Error("Empty response data"); // Handle empty response data
//     }

//     return data.data; // Assuming the address is in the "data" field of the response
//   } catch (error) {
//     console.error("Error fetching user address:", error);
//     throw error;
//   }
// }

export default async function useUserAddress(id) {
  const response = await fetch(`http://localhost:4000/users/profiles/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
