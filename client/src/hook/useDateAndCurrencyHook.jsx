function useDateAndCurrencyHook() {
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

  // Function Change to Currency like 2,300.00
  const formatNumberWithCommasAndTwoDecimals = (input) => {
    const amount = typeof input === "string" ? parseFloat(input) : input;
    if (isNaN(amount)) {
      return "Invalid input";
    }
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedAmount;
  };

  // Covert special Request
  const convertPrice = (request) => {
    switch (request) {
      case "Baby cot":
        return "400.00";
      case "Airport transfer":
        return "200.00";
      case "Extra bed":
        return "500.00";
      case "Extra pillows":
        return "100.00";
      case "Phone chargers and adapters":
        return "100.00";
      case "Breakfast":
        return "150.00";
      default:
        return "0.00";
    }
  };

  return { convertDate, formatNumberWithCommasAndTwoDecimals, convertPrice };
}

export default useDateAndCurrencyHook;
