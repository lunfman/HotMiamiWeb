// autor @lunfman
// get form value on submit validate and redirect if good -> also script for checking if age validated or not
let ageForm = document.querySelector("#age-form");

ageForm.addEventListener("submit", function (event) {
  // when form submited prevent default behaviour
  event.preventDefault();
  // get data from submited form
  const data = new FormData(ageForm);
  const ageArr = Array();

  // add value of data to ageArr
  // day, month, year - structure
  for (const [_, value] of data) {
    ageArr.push(value);
  }

  // check if user passed validation
  if (validate(ageArr)) {
    // if user pass validation redirect to homepage and set age to true to prevent double checks
    redirect("index.html");
    localStorage.setItem("age", "true");
    return;
  }
  // if user did not pass validation than submit to failure and save false value to localstore
  localStorage.setItem("age", "false");
  redirect("failure.html");
});

const validate = (arr) => {
  // check if arr > 3 this is impossible in this case , but anyway
  if (arr.length != 3) {
    return false;
  }
  // get values from arr
  let [day, month, year] = arr;
  // create date object from passed values
  const date = new Date(year, month - 1, day);
  // get today date object
  const today = new Date();
  // calculate ms differences
  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  const diffTime = today - date;
  const YearsDiff = diffTime / (1000 * 60 * 60 * 24) / 360;

  // return bool of result
  return YearsDiff > 18 && YearsDiff < 100 ? true : false;
};

const redirect = (path) => {
  window.location.replace(path);
};
