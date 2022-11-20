const el = document.querySelectorAll(".album");
const dot = document.querySelectorAll(".dot");
let audio;
music = ["turf", "pertubator", "byrne", "scattle"];
let play, click, track;
audio = new Audio(`./assets/audio/${"name"}.mp3`);
console.log(audio.src);

const reset = () => {
  el.forEach((album) => {
    album.classList.remove("playing");
    album.classList.add("stop");
  });
};

function myFunction(element, name) {
  //   reset();
  audio.src = `./assets/audio/${name}.mp3`;
  if (track != name) {
    reset();
    track = name;
    audio.play();
    play = true;
    element.classList.add("playing");
    element.classList.remove("stop");
    dot.style.background = "red";
  } else {
    reset();
    audio.pause();
    // play = false;
    // element.classList.remove("playing");
    // dot.style.background = "";
    // element.classList.add("stop");
  }
}

el.forEach((album, index) => {
  console.log(music[index]);
  album.addEventListener("click", myFunction.bind(null, album, music[index]));
});

// el.addEventListener("click", myFunction);
