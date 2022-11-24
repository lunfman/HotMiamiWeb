// autor @lunfman
// get form value on submit validate and redirect if good -> also script for checking if age validated or not
// hankige vormi väärtus esitamisel valideerige ja suunake ümber, kui hea -> ka skript, mis kontrollib, kas vanus on kinnitatud või mitte
let ageForm = document.querySelector("#age-form");

ageForm.addEventListener("submit", function (event) {
  // when form submitted prevent default behaviour
  event.preventDefault();
  // get data from submitted form
  // hankige andmed esitatud vormilt
  const data = new FormData(ageForm);
  const ageArr = Array();

  // add value of data to ageArr
  // andmeväärtuse lisamine ageArrile
  // day, month, year - structure
  for (const [_, value] of data) {
    ageArr.push(value);
  }

  // check if user passed validation
  // kontrollige, kas kasutaja läbis valideerimise
  if (validate(ageArr)) {
    // if user pass validation redirect to homepage and set age to true to prevent double checks
    // kui kasutaja läbib valideerimise suuna avalehele ja sea vanuse väärtuseks Tõene, et vältida topeltkontrolli
    redirect("index.html");
    localStorage.setItem("age", "true");
    return;
  }
  // if user did not pass validation than submit to failure and save false value to localstore
  // kui kasutaja ei läbinud valideerimist, esitage tõrge ja salvestage valeväärtus kohalikku poodi
  localStorage.setItem("age", "false");
  redirect("failure.html");
});

const validate = (arr) => {
  // check if arr > 3 this is impossible in this case , but anyway
  // kontrollige, kas arr > 3 on antud juhul võimatu, aga siiski
  if (arr.length != 3) {
    return false;
  }
  // get values from arr
  // hankige väärtused arr-ist
  let [day, month, year] = arr;
  // create date object from passed values
  // kuupäevaobjekti loomine läbitud väärtustest
  const date = new Date(year, month - 1, day);
  // get today date object
  // hangi tänase kuupäeva objekt
  const today = new Date();
  // calculate ms differences
  // arvutab ms erinevused
  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  const diffTime = today - date;
  const YearsDiff = diffTime / (1000 * 60 * 60 * 24) / 360;

  // return bool of result
  // tagastab tulemuse bool
  return YearsDiff > 18 && YearsDiff < 100 ? true : false;
};

const redirect = (path) => {
  window.location.replace(path);
};
