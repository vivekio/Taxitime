// const currentTimeandDate = () => {
//   const currentTime = new Date();
//   const formattedDate = currentTime
//     .toISOString()
//     .slice(0, 19)
//     .replace("T", " ");
//   return formattedDate;
// };

// module.exports = currentTimeandDate;


// this is invalied fro a mysql syntext
// const currentTimeandDate = () => {
//   const currentTime = new Date();
//   const options = {
//     timeZone: "Asia/Kolkata", // IST Timezone (Gujarat, India)
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false, // 24-hour format
//   };
//   return new Intl.DateTimeFormat("en-IN", options).format(currentTime).replace(",", "");
// };
// module.exports = currentTimeandDate;


const currentTimeandDate = () => {
  const currentTime = new Date();

  // Convert to IST (Gujarat, India) Timezone
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  };

  // Get formatted date in 'DD/MM/YYYY, HH:MM:SS' format
  let formattedDate = new Intl.DateTimeFormat("en-IN", options).format(currentTime);

  // Convert 'DD/MM/YYYY, HH:MM:SS' to 'YYYY-MM-DD HH:MM:SS' for MySQL
  let [date, time] = formattedDate.split(", ");
  let [day, month, year] = date.split("/"); // Split DD/MM/YYYY
  return `${year}-${month}-${day} ${time}`; // Convert to YYYY-MM-DD HH:MM:SS
};

console.log(currentTimeandDate()); // Test output
module.exports = currentTimeandDate;
