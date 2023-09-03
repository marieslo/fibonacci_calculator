// Elements -----------------------------------
const

  userInput = document.querySelector("input"),
  userOutput = document.querySelector("strong"),

  buttonIs = document.querySelector("button"),

  error50 = document.getElementById("error50"),
  error42 = document.getElementById("error42"),

  spinnerIcon1 = document.getElementById("spinner1"),
  spinnerIcon2 = document.getElementById("spinner2"),

  resultHeader = document.getElementById("prev-results"),
  tableResults = document.getElementById("table-results"),

  checkBox = document.querySelector("input[type=checkbox]")
let remoteCalculation = false; // false - local, true - remote
// EventListeners ----------------------------------

//window.onload = buttonIs.addEventListener("click", calcFiboLocally)

// Functions ---------------------------------------
// function checkBoxOnOff() {
//   if (checkBox.checked === true) {
//     buttonIs.addEventListener("click", calcFiboServer)
//   } else (checkBox.checked === false)
//   buttonIs.addEventListener("click", calcFiboLocally)
// }

// for checkbox OFF
function calcFiboLocally() {
  resultHeader.classList.add("d-none");
  tableResults.classList.add("d-none");
  spinnerIcon2.classList.add("d-none");
  spinnerIcon1.classList.remove("d-none");
  if (userInput.value > 50) {
    error42.classList.add("d-none");
    error50.classList.remove("d-none");
    userOutput.innerHTML = "";
    userInput.style.color = "#D9534F";
    userInput.style.borderColor = "#D9534F";
    spinnerIcon1.classList.add("d-none");
  }
  else {
    userInput.style.color = "#373A3C";
    userInput.style.borderColor = "#CCC";
    userOutput.innerHTML = "";
    error42.classList.add("d-none");
    error50.classList.add("d-none");
    function fib(x) {
      if (x <= 1) {
        return x;
      }
      else {
        return fib(x - 1) + fib(x - 2);
      }
    }
  }
  setTimeout(() => {
    error42.classList.add("d-none");
    document.querySelector("strong").innerHTML = `${fib(userInput.value)}`
    spinnerIcon1.classList.add("d-none");
  }, "1000");
}

// for checkbox ON
async function calcFiboServer() {
  spinnerIcon1.classList.remove("d-none");
  if (userInput.value > 50) {
    error42.classList.add("d-none");
    error50.classList.remove("d-none");
    userOutput.innerHTML = "";
    userInput.style.color = "#D9534F";
    userInput.style.borderColor = "#D9534F";
    spinnerIcon1.classList.add("d-none");
  }
  else {
    userInput.style.color = "#373A3C";
    userInput.style.borderColor = "#CCC";
    userOutput.innerHTML = "";
    error42.classList.add("d-none");
    error50.classList.add("d-none");
    resultHeader.classList.remove("d-none");
    tableResults.classList.remove("d-none");
    spinnerIcon2.classList.remove("d-none");
    const response = await fetch("http://localhost:5050/getFibonacciResults")
    spinnerIcon2.classList.add("d-none");
    const data = await response.json();
    data.results.sort(function (a, b) {
      return b.createdDate - a.createdDate
    });
    spinnerIcon1.classList.add("d-none");
    tableResults.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      tableResults.innerHTML +=
        `<ul class="border-dark border-bottom mb-3 pb-2">
                        The Fibonacci Of <b>${data.results[i].number}</b>
                        is <b>${data.results[i].result}</b>
                          Calculated at: ${new Date(data.results[i].createdDate)}</ul>`;
    }
    try {
      const response = await fetch(`http://localhost:5050/fibonacci/${userInput.value}`);
      const data = await response.json();
      userOutput.innerHTML = data.result;
      spinnerIcon1.classList.add("d-none");
    }
    catch (e) {
      error42.classList.remove("d-none");
      userOutput.innerHTML = "";
      userInput.style.color = "#373A3C";
      userInput.style.borderColor = "#CCCCCC";
      spinnerIcon1.classList.add("d-none");
    }
  }
}


function main() {
  checkBox.addEventListener('change', (e) => {
    if (checkBox.checked) {
      remoteCalculation = true;
    } else {
      remoteCalculation = false;
    }
  });

  buttonIs.addEventListener('click', (e) => {
    if (remoteCalculation === false) {
      calcFiboLocally();
    } else {
      calcFiboServer();
    }
  })
}

main();