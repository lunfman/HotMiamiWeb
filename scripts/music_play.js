// autor @lunfman
const el = document.querySelectorAll(".album");
let palyStatus, track, audio;
music = ["turf", "pertubator", "byrne", "scattle"];

audio = new Audio(`./assets/audio/turf.mp3`);

const reset = () => {
  // set back default styles to all disks
  // määrake kõikidele ketastele tagasi vaikestiilid
  el.forEach((album) => {
    album.classList.remove("playing");
    album.classList.add("stop");
    album.querySelector(".dot").style.background = "";
  });
};

const addPlayStyle = (element) => {
  // set play style to current element
  // määrake esitusstiil praegusele elemendile
  element.classList.add("playing");
  element.classList.remove("stop");
  dot.style.background = "red";
};

const playSong = (element, name) => {
  // function which handles sound play back and which song should play at the moment
  // funktsioon, mis tegeleb heli taasesitusega ja milline lugu peaks hetkel mängima

  // select dot element of current album
  // vali praeguse albumi punktielement
  dot = element.querySelector(".dot");

  if (track != name) {
    // if track not equal to name -> new track is going to play
    // init new track playback
    // kui lugu ei võrdu nimega -> esitatakse uus lugu
    // uue loo taasesituse alustamine
    audio.src = `./assets/audio/${name}.mp3`;
    palyStatus = true;
    track = name;
    reset();
    audio.play();
    addPlayStyle(element);
  } else if (track == name) {
    // if track equal to current track check if track was paused or we should pause it
    // and toggle the play status to opposite one
    // kui lugu on võrdne praeguse rajaga, kontrollige, kas lugu on peatatud või peaksime selle peatama
    // ja lülitage esituse olek vastupidiseks
    (palyStatus && audio.pause()) || reset();
    !palyStatus && audio.play() && addPlayStyle(element);
    palyStatus = !palyStatus;
  }
};

//  apply click event to every album and use bind function to use arguments inside of addEventListener
// rakendage klõpsusündmust igale albumile ja kasutage sidumisfunktsiooni, et kasutada argumente addEventListeneri sees
el.forEach((album, index) => {
  console.log(music[index]);
  album.addEventListener("click", playSong.bind(null, album, music[index]));
});
