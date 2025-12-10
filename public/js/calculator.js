const units = {
  Fahrenheit: {
    Celsius: (f) => Math.round((f - 32) * (5 / 9)),
  },
  Celsius: {
    Fahrenheit: (c) => Math.round(c * (9 / 5) + 32),
  },
  "Sticks of butter": {
    Grams: (s) => Math.round(s * 113),
    Cups: (s) => s / 2,
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
input.value = 0;
inputWrapper.appendChild(inputDropdown);
inputWrapper.appendChild(input);
calculator.appendChild(inputWrapper);

inputDropdown.addEventListener("change", (e) => {
  selectedInput = units[Object.keys(units)[e.target.selectedIndex]];
  populateOutputFields(selectedInput);
});

input.addEventListener("change", (e) => {
  output.value = selectedOutput(e.target.value);
});

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
