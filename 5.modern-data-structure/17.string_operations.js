/**
 * String is a primitive data type, we can't call methods on it.
 * But when we call a method on String, JavaScript automatically converts the String into String Objects
 */
console.log(new String("hello")); // converts string 'hello' to an String Object ->
console.log(typeof new String("jonas")); // -> object

const airline = "TAP Air Portugal";
const plane = "A320";

// Access characters of string
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]); // direct

// Get length of the string
console.log(airline.length);

/**
 * indexOf()
 * Get the index of position of character or word in a string
 */
console.log(airline.indexOf("r")); // first occurence of 'r' -> 6
console.log(airline.lastIndexOf("r")); // last occurence of 'r' -> 10
console.log(airline.indexOf("Portugal")); // -> 8
console.log(airline.indexOf("portugal")); // 'portugal' doesn't exist -> -1

/**
 * slice()
 * Extract part of string
 * Syntax: String.slice(beginIndex, endIndex)
 */
console.log(airline.slice(4)); // -> Air Portugal
console.log(airline.slice(4, 7)); // -> Air

console.log(airline.slice(0, airline.indexOf(" "))); // -> TAP
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // -> Portugal

// Negative index
console.log(airline.slice(-1)); // get last character -> l
console.log(airline.slice(-2)); // -> al
console.log(airline.slice(1, -1)); // -> AP Air Portuga

/**
 * toLowerCase & toUpperCase
 */
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix sting: first letter uppercase rest lower case
const firstLetterUpper = (str) => {
  const strLower = str.toLowerCase();
  return strLower[0].toUpperCase() + strLower.slice(1);
};

console.log(firstLetterUpper("hElLo")); // -> Hello

/**
 * trim(), trimStart() & trimEnd()
 */
const email = "  Hello@JohN.Io \n";
const fixEmail = email.toLowerCase().trim();
console.log(fixEmail); // -> hello@john.io

/**
 * replace()
 * Replace part of string
 * Syntax: replace(what to replace, what to replace with)
 */
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replace("door", "gate")); // replace first occurence of door
console.log(announcement.replaceAll("door", "gate")); // replace all occurence of door
console.log(announcement.replace(/door/g, "gate")); // RegX: replace all occurence of door

/**
 * Booleans: includes(), startsWith() & endsWith()
 */
const airPlane = "Airbus A320neo";
console.log(airPlane.includes("A320")); // -> true
console.log(airPlane.includes("Boeing")); // -> false
console.log(airPlane.startsWith("Airb")); // -> true
console.log(airPlane.endsWith("neo")); // -> true

// Practice exercise
// check if baggage contains knife or gun
const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); // always turn string to lower case before comparing

  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are NOT allowed on board");
  } else {
    console.log("Welcome aboard!");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

/**
 * split() & join()
 *
 * split: Splits the string into individual elements based on divider and returns an array
 * join: Joins array elements and returns a string seperated by given argument
 */
console.log("a+very+nice+string".split("+")); // -> [ 'a', 'very', 'nice', 'string' ]
console.log("John Doe".split(" ")); // -> [ 'John', 'Doe' ]

const [firstName, lastName] = "John Doe".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName); // -> Mr. John Doe

// Practice Excercise
// capitalize first letter of each word of given string
const capitalizeName = (str) => {
  const names = str.split(" "); // split string into an array of words
  const fixName = [];

  for (const n of names) {
    // push fixed word into an array
    // fixName.push(n[0].toUpperCase() + n.slice(1)); // using slice
    fixName.push(n.replace(n[0], n[0].toUpperCase())); // using replace
  }
  console.log(fixName.join(" ")); // join the array of fixed words into a string seperated by space
};

capitalizeName("jessica ann smith davis"); // -> Jessica Ann Smith Davis
capitalizeName("john doe"); // -> John Doe

/**
 * padStart() & padEnd()
 *
 * Add padding to Strings till the given length
 * Syntax: padStart(total length of string after padding, character/word to pad with)
 */
const message = "Go to gate 23!";
console.log(message.padStart(25, "+")); // -> +++++++++++Go to gate 23!
console.log(message.padStart(20, "+").padEnd(30, "+")); // -> ++++++Go to gate 23!++++++++++
console.log("John".padStart(20, "+").padEnd(30, "+")); // -> ++++++++++++++++John++++++++++

// Practice Exercise: Display only last 5 digits of the credit card
const maskCreditCard = (num) => {
  const strNum = String(num);
  return strNum.slice(-5).padStart(strNum.length, "*");
};

console.log(maskCreditCard(64637836)); // -> ***37836
console.log(maskCreditCard(43378463864647384)); // -> ************47384
console.log(maskCreditCard("334859493847755774747")); // -> ****************74747

/**
 * repeat()
 *
 * Repeat the string x times
 * Syntax: String.repeat(number of times to repeat)
 */
const message2 = "Bad waether... All Departues Delayed... ";
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
};
planesInLine(5); // -> There are 5 planes in line 🛩🛩🛩🛩🛩
planesInLine(3); // -> There are 3 planes in line 🛩🛩🛩
planesInLine(12); // -> There are 12 planes in line 🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩
