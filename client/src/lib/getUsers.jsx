const useUserAddress = async () => {
  let address = {};
  let response = await fetch("http://localhost:4000/users/profiles");

  if (response) {
    let data = await response.json();
    if (data) address = data;
  }

  return address;
};

export default useUserAddress;
