// get form value on submit validate and redirect if good -> also script for checking if age validated or not

let ageForm = document.querySelector('#age-form')

ageForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const data = new FormData(ageForm);
    const ageArr = Array()

    for (const [_, value] of data) {
      ageArr.push(value)
    }
    
    if(validate(ageArr)){
        redirect("index.html")
        localStorage.setItem('age', 'true');
        return
    }
    localStorage.setItem('age', 'false');
    redirect("failure.html")
    
  })

const validate = (arr) => {
    if(arr.length != 3){
        return false
    }
    let [day, month, year] = arr
    const date = new Date(year, month-1, day)
    const today = new Date()
    // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    const diffTime = today - date;
    const YearsDiff = diffTime / (1000 * 60 * 60 * 24)/360;

    return YearsDiff > 18 && YearsDiff < 100 ? true : false
}

const redirect = (path) => {
    window.location.replace(path);
}