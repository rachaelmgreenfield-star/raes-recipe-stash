const units = {
  Fahrenheit: {
    Celsius: (f) => Math.round((f - 32) * (5 / 9)),
  },
  Celsius: {
    Fahrenheit: (c) => Math.round(c * (9 / 5) + 32),
  },
  "Ounces(weight)": {
    Grams: (o) => Math.round(o * 28.35),
  },
  "Ounces(volume)": {
    Milliliters: (o) => Math.round(o * 29.57),
  },
  Pounds: {
    Grams: (p) => Math.round(p * 453.6),
  },
  Tablespoons: {
    Milliliters: (t) => t * 15,
    Cups: (t) => t / 16,
  },
  "Sticks of butter": {
    Grams: (s) => Math.round(s * 113),
    Cups: (s) => s / 2,
  },
  "Cups of flour": {
    Grams: (c) => Math.round(c * 120),
  },
  "Cups of sugar": {
    Grams: (c) => Math.round(c * 200),
  },
  "Cups of oil": {
    Milliliters: (c) => Math.round(c * 225),
  },
};

let selectedInput = units.Fahrenheit;
let selectedOutput = selectedInput.Celsius;

/* Calculator container */

let calculator = document.createElement("div");
calculator.classList.add("calculator-wrapper", "hidden");
document.getElementsByTagName("main")[0].appendChild(calculator);

/* Show/display buttons */

document
  .getElementsByClassName("calculator-icon")[0]
  .addEventListener("click", () => {
    calculator.classList.toggle("hidden");
  });

let closeButton = document.createElement("div");
closeButton.classList.add("calculator-close");
closeButton.addEventListener("click", () => {
  calculator.classList.add("hidden");
});
calculator.appendChild(closeButton);

/* Input fields */

let inputWrapper = document.createElement("div");
inputWrapper.classList.add("calculator-group");
let inputDropdown = document.createElement("select");
for (let i in units) {
  let opt = document.createElement("option");
  opt.value = units[i];
  opt.innerText = i;
  inputDropdown.appendChild(opt);
}
let input = document.createElement("input");
input.type = "number";
input.value = 350;
inputWrapper.appendChild(inputDropdown);
inputWrapper.appendChild(input);
calculator.appendChild(inputWrapper);

/* Output fields */

let outputWrapper = document.createElement("div");
outputWrapper.classList.add("calculator-group");
let outputDropdown = document.createElement("select");
let output = document.createElement("input");
output.classList.add("no-arrows");
output.type = "number";
populateOutputFields(selectedInput);
outputWrapper.appendChild(outputDropdown);
outputWrapper.appendChild(output);
calculator.appendChild(outputWrapper);

/* Field calculation handlers */

function populateOutputFields() {
  outputDropdown.innerHTML = "";

  selectedOutput = selectedInput[Object.keys(selectedInput)[0]];
  for (let i in selectedInput) {
    let opt = document.createElement("option");
    opt.value = units[i];
    opt.innerText = i;
    outputDropdown.appendChild(opt);
  }
  output.value = selectedOutput(input.value);
}

outputDropdown.addEventListener("change", (e) => {
  selectedOutput =
    selectedInput[Object.keys(selectedInput)[e.target.selectedIndex]];
  output.value = selectedOutput(input.value);
});

inputDropdown.addEventListener("change", (e) => {
  let unit = Object.keys(units)[e.target.selectedIndex];
  selectedInput = units[unit];
  switch (unit) {
    case "Fahrenheit":
      input.value = 350;
      break;
    case "Celsius":
      input.value = 180;
      break;
    default:
      input.value = 1;
      break;
  }
  populateOutputFields(selectedInput);
});

["keyup", "touchend", "change"].forEach(function (event) {
  input.addEventListener(event, (e) => {
    output.value = selectedOutput(e.target.value);
  });
});
