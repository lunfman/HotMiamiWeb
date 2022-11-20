const el = document.querySelector(".huero");
const dot = document.querySelector(".dot");
var audio = new Audio("./assets/audio/turf.mp3");

let play;

function myFunction() {
  if (!play) {
    audio.play();
    play = true;
    el.classList.add("playing");
    el.classList.remove("stop");
    dot.style.background = "red";
  } else {
    audio.pause();
    play = false;
    el.classList.remove("playing");
    dot.style.background = "";
    el.classList.add("stop");
  }
}

el.addEventListener("click", myFunction);
