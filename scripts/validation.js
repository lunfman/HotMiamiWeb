/* autor @lunfman
here is very simple js script. Which check if localStore has age element or not
if age element do not exist than redirect to age validation page
if age element exist and it has value false redirect to fail page

siin on väga lihtne js-skript. Mis kontrollib, kas localStore'il on vanuseelement või mitte
kui elementi vanus pole olemas, siis suunata vanuse kinnitamise lehele, kui vanuseelement
on olemas ja selle väärtus on väär ümbersuunamine ebaõnnestunud lehele
*/
const age = localStorage.getItem("age");
!age && window.location.replace("./age.html");
age === "false" && window.location.replace("./failure.html");
