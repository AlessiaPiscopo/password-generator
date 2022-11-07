const generatePasswordBtn = document.getElementById("generate-password-btn");
const passwordEl = document.getElementById("password");
const copyPasswordBtn = document.getElementById("copy-password-btn");
const tooltipEl = document.getElementById("tooltip");
const lengthSliderEl = document.getElementById("password-length-slider");
const selectedLengthEl = document.getElementById("selected-length");
const symbolsToggleEl = document.getElementById("symbols-toggle");
const numbersToggleEl = document.getElementById("numbers-toggle");

let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];
let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let characters = letters.concat(symbols, numbers);

lengthSliderEl.value = 15;
selectedLengthEl.textContent = lengthSliderEl.value;
symbolsToggleEl.checked = true;
numbersToggleEl.checked = true;

// set characters based on symbols/numbers toggles
const setCharactersArray = () => {
  if (symbolsToggleEl.checked === false && numbersToggleEl.checked === false) {
    characters = letters;
  } else if (
    symbolsToggleEl.checked === false &&
    numbersToggleEl.checked === true
  ) {
    characters = letters.concat(numbers);
  } else if (
    numbersToggleEl.checked === false &&
    symbolsToggleEl.checked === true
  ) {
    characters = letters.concat(symbols);
  } else {
    characters = letters.concat(symbols, numbers);
  }
};

setCharactersArray();

// default password length
let passwordLength = 15;
let minLength = lengthSliderEl.min;
let maxLength = lengthSliderEl.max;

const getRandomCharacter = () => {
  let randomIndex = Math.floor(Math.random() * characters.length);
  let randomCharacter = characters[randomIndex];
  return randomCharacter;
};

const generatePassword = () => {
  let randomPassword = "";
  for (i = 0; i < passwordLength; i++) {
    randomPassword += getRandomCharacter();
  }
  passwordEl.textContent = randomPassword;
  // re-display copy icon instead of check mark
  copyPasswordBtn.innerHTML = `
    <i class="fa-regular fa-copy"></i>
`;
  return randomPassword;
};

// generate and display first random password on load
passwordEl.textContent = generatePassword();

const copyPassword = async () => {
  try {
    await navigator.clipboard.writeText(passwordEl.textContent);
    console.log("Password copied to clipboard");
    // display check mark
    copyPasswordBtn.innerHTML = `
      <i class="fa-solid fa-check"></i>
    `;
  } catch (err) {
    console.log("Failed to copy: ", err);
  }
};

const setPasswordLength = () => {
  let selectedLength = lengthSliderEl.value;
  selectedLengthEl.textContent = selectedLength;
  passwordLength = selectedLength;
};

// event listeners
generatePasswordBtn.addEventListener("click", generatePassword);
copyPasswordBtn.addEventListener("click", copyPassword);
lengthSliderEl.addEventListener("input", setPasswordLength);
symbolsToggleEl.addEventListener("change", setCharactersArray);
numbersToggleEl.addEventListener("change", setCharactersArray);
