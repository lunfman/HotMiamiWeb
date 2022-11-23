// autor @lunfman
const el = document.querySelectorAll(".album");
// const dot = document.querySelectorAll(".dot");
let audio;
music = ["turf", "pertubator", "byrne", "scattle"];
let palyStatus, track;
audio = new Audio(`./assets/audio/turf.mp3`);

const reset = () => {
  el.forEach((album) => {
    album.classList.remove("playing");
    album.classList.add("stop");
    album.querySelector(".dot").style.background = "";
  });
};

const addPlayStyle = (element) => {
  element.classList.add("playing");
  element.classList.remove("stop");
  dot.style.background = "red";
};

const playSong = (element, name) => {
  dot = element.querySelector(".dot");

  if (track != name) {
    audio.src = `./assets/audio/${name}.mp3`;
    palyStatus = true;
    track = name;
    reset();
    audio.play();
    addPlayStyle(element);
  } else if (track == name) {
    console.log(palyStatus);
    (palyStatus && audio.pause()) || reset();
    !palyStatus && audio.play() && addPlayStyle(element);
    palyStatus = !palyStatus;
  }
};

//  apply click event to every album and use bind function to use arguments inside of addEventListener
el.forEach((album, index) => {
  console.log(music[index]);
  album.addEventListener("click", playSong.bind(null, album, music[index]));
});
