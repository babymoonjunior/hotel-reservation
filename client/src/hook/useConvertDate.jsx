function useConvertDate() {
  // Function to convert to Fri, 20 Jan 2026 format
  const convertDate = (dateInput) => {
    let date = new Date(dateInput);
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayOfWeek = dayNames[date.getUTCDay()];
    let dayOfMonth = date.getUTCDate();
    let month = monthNames[date.getUTCMonth()];
    let year = date.getUTCFullYear();
    let formattedDate =
      dayOfWeek + ", " + dayOfMonth + " " + month + " " + year;
    return formattedDate;
  };

  return { convertDate };
}

export default useConvertDate;
