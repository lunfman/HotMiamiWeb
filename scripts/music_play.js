const el = document.querySelectorAll(".album");
// const dot = document.querySelectorAll(".dot");
let audio;
music = ["turf", "pertubator", "byrne", "scattle"];
let click, track;
audio = new Audio(`./assets/audio/turf.mp3`);

const reset = () => {
  el.forEach((album) => {
    album.classList.remove("playing");
    album.classList.add("stop");
    album.querySelector(".dot").style.background = "";
  });
};

function myFunction(element, name) {
  dot = element.querySelector(".dot");

  // this if allow to reset if user clicked on the same track two times
  if (click == 2) {
    click = 0;
    track = "";
  }
  // set new source
  audio.src = `./assets/audio/${name}.mp3`;
  // check if current track name is the same or not
  if (track != name) {
    // set click to 1 , track to current track and apply reset function to remove any side effects
    click = 1;
    track = name;
    reset();
    audio.play();
    play = true;
    // apply css classes to current playing item
    element.classList.add("playing");
    element.classList.remove("stop");
    dot.style.background = "red";
  } else {
    // if clicked on pause than click is going to be 2 also apply reset ?
    click = 2;
    reset();
    audio.pause();
  }
}

//  apply click event to every album and use bind function to use arguments inside of addEventListener
el.forEach((album, index) => {
  console.log(music[index]);
  album.addEventListener("click", myFunction.bind(null, album, music[index]));
});
