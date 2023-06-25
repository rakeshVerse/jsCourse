const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Expected Output:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// get first 3 letters from string
const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const row of flights.split("+")) {
  const [status, from, to, time] = row.split(";");
  const output = `${
    status.startsWith("_Delayed") ? `🔴` : ""
  }${status.replaceAll("_", " ")} from ${getCode(from)} to ${getCode(
    to
  )} (${time.replace(":", "h")})`.padStart(50);
  console.log(output);
}

// Output:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)
