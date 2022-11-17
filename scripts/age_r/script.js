// get form value on submit validate and redirect if good -> also script for checking if age validated or not

let ageForm = document.querySelector('#age-form')

ageForm.addEventListener("submit", function(event) {
    // prevent default behaviour of the form
    event.preventDefault();
    // get data of the form
    const data = new FormData(ageForm);
    // array for storing extracted data of the data
    const ageArr = Array()

    for (const [_,value] of data) {
        // value in the next order day month year
      ageArr.push(value)
    }
    // check if validation passed and redirect to home page
    if(validate(ageArr)){
        redirect()
    }
  })

const validate = (arr) => {
    // if arr more than 3 elements return false, because it can not happen
    if(arr.length != 3){
        return false
    }
    let [day, month, year] = arr

    // using date object to calculate current day and entered day diffirances
    const date = new Date(year, month-1, day)
    const today = new Date()
    // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    const diffTime = Math.abs(date - today);
    // converting ms to years diff
    const YearsDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24))/360;
    // return bool if year > 18
    // fix 
    return YearsDiff > 18 ? true : false
}

const redirect = () => {
    // redirect tot home page
    window.location.replace("/index.html");
}