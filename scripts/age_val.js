/*
autor @lunfman
Eng version
description: age_val js validate form input values. It checks is user actually is older than 18 y old

validate - function which take one argument arr. Array which we get after form value extraction.
          This array has the next shape [day,month,year].At the beginning function check if array
          has the right shape. If not return false. After we get values from the array. And create a
          date object. Date object will help us to compare two dates. So we do not have to write separate
          code for this process. After we compare the date which user inputted and current day. Date object
          uses ms to calculate diff between two dates. But ms do not tell us anything. So we have to convert
          it to years. For this purpose we used solution from stackoverflow. And in the end we simply return
          true if older than 18 and not older than 100. Other wise true

redirect - simple function which take one argument path in this context name of the html file and redirect
          to this destination.

1. first of all we get form element from html
2. we add event listener on submit event
3. prevent default behaviour of the form. Other wise it is going redirect or refresh the page.
4. Create FormData object and pass ageForm to get form values easily
5. Extract all values from data and save to ageArr
6. validate age 
6.1 if all good redirect to home page and set age value to true in localstore
6.2 otherwise redirect to fail page and set age value to false in localstore

EE version
kirjeldus: age_val js kinnitab vormi sisendväärtused. See kontrollib, kas kasutaja on tõesti vanem kui 18 aastat vana

valide – funktsioon, mis võtab ühe argumendi arr. Massiiv, mille saame pärast vormi väärtuse ekstraheerimist.
          Sellel massiivil on järgmine kuju [päev, kuu, aasta]. Funktsiooni alguses kontrollige, kas massiiv on
          on õige kujuga. Kui ei tagasta vale. Pärast seda, kui saame massiivist väärtused. Ja luua a
          kuupäevaobjekt. Kuupäevaobjekt aitab meil võrrelda kahte kuupäeva. Nii et me ei pea eraldi kirjutama
          kood selle protsessi jaoks. Pärast võrdleme kasutaja sisestatud kuupäeva ja praegust päeva. Kuupäeva objekt
          kasutab kahe kuupäeva erinevuse arvutamiseks ms-i. Aga ms ei ütle meile midagi. Seega peame teisendama
          seda aastateks. Sel eesmärgil kasutasime stackoverflow lahust. Ja lõpuks me lihtsalt pöördume tagasi
          tõene, kui vanem kui 18 ja mitte vanem kui 100. Muu tark tõsi

redirect – lihtne funktsioon, mis võtab selles kontekstis html-faili nimes ühe argumenditee ja suunab ümber
          sellesse sihtkohta.

1. Kõigepealt saame vormielemendi html-ist
2. lisame sündmuse esitamisel sündmusekuulaja
3. takistada vormi vaikekäitumist. Muul juhul suunab see lehe ümber või värskendab seda.
4. Vormiväärtuste hõlpsaks hankimiseks looge objekt FormData ja edastage ageForm
5. Eraldage andmetest kõik väärtused ja salvestage ageArr
6. kinnitada vanus
6.1, kui kõik on korras, suunake ümber avalehele ja määrake kohalikus poes vanuse väärtuseks true
6.2 muul juhul suunake ümber ebaõnnestunud lehele ja määrake kohalikus poes vanuse väärtuseks false
*/
let ageForm = document.querySelector("#age-form");

ageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(ageForm);
  const ageArr = Array();

  for (const [_, value] of data) {
    ageArr.push(value);
  }
  if (validate(ageArr)) {
    redirect("index.html");
    localStorage.setItem("age", "true");
    return;
  }
  localStorage.setItem("age", "false");
  redirect("failure.html");
});

const validate = (arr) => {
  if (arr.length != 3) {
    return false;
  }
  let [day, month, year] = arr;
  const date = new Date(year, month - 1, day);
  const today = new Date();

  if (month > 12 || month < 1 || day > 31 || day < 1){
    return false;
  }
  
  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  const diffTime = today - date;
  const YearsDiff = diffTime / (1000 * 60 * 60 * 24) / 360;

  return YearsDiff > 18 && YearsDiff < 100 ? true : false;
};

const redirect = (path) => {
  window.location.replace(path);
};
