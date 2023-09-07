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

  checkBox = document.querySelector("input[type=checkbox]"),

  dropDown = document.getElementById("dropdown"),
  dropDownButton = document.getElementById("dropdown-button");

  let remoteCalculation = false; // false - local, true - remote

// Functions -----------------------------------

function checkBoxOnOff() {
  checkBox.addEventListener("change", (e) => {
    if (checkBox.checked) {
      remoteCalculation = true;
    } else {
      remoteCalculation = false;
    }
  });
  buttonIs.addEventListener("click", (e) => {
    if (remoteCalculation === false) {
      calcFiboLocally();
    } else {
      calcFiboServer();
    }
  })
}

checkBoxOnOff()


// for checkbox OFF
function calcFiboLocally() {
  dropDown.classList.add("d-none");
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
    resultHeader.classList.add("d-none");
    tableResults.classList.add("d-none");
    spinnerIcon2.classList.add("d-none");
    dropDownButton.classList.add("d-none");
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
    dropDown.classList.remove("d-none");
    resultHeader.classList.remove("d-none");
    tableResults.classList.remove("d-none");
    spinnerIcon2.classList.remove("d-none");
    const response = await fetch("http://localhost:5050/getFibonacciResults")
    spinnerIcon2.classList.add("d-none");
    const data = await response.json();
    data.results.sort(function (a, b) {
      return b.createdDate - a.createdDate
    });
    tableResults.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      tableResults.innerHTML +=
        `<tr class="results-row">
        <th>The Fibonacci </th>
        <th data-field="number"> Of <b class="number">${data.results[i].number} </b></th> 
        <th> is <b>${data.results[i].result}</b></th>
        <th data-field="date" class="date"> Calculated at: ${new Date(data.results[i].createdDate)}</th>
      </tr>`;
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
      resultHeader.classList.add("d-none");
      tableResults.classList.add("d-none");
      spinnerIcon2.classList.add("d-none");
      dropDownButton.classList.add("d-none");
    }
  }
};


var $table = $('#table')
var $sort = $('#sort')

$(function() {
  $sort.change(function() {
    var field = ''
    var sortOrder = ''

      if (this.value == 'number_asc') {
        field = 'number'
        sortOrder = 'asc'
      } else if (this.value == 'number_desc') {
        field = 'number'
        sortOrder = 'desc'
      } else if (this.value == 'date_asc') {
        field = 'date'
        sortOrder = 'asc'
      } else if (this.value == 'date_asc') {
        field = 'date'
        sortOrder = 'desc'
      } 

      $table.tableResults('sortBy', {
        field: field,
        sortOrder: sortOrder
      })
    })
  })
