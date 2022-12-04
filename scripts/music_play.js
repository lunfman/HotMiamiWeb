/* @lunfman author

description: music_play script handles music play back on the music page. Also it check which item currently
is playing and apply styles based on current action(pause/play)

music array contains names of tracks
audio = Audio object
el - all albums

reset - function which sets all tracks styles to default

addPlayStyle - function which apply play style to selected item

playSong - main function in this script. Handles playback logic of the element(music disk).
          1. function take two arguments element(disk) and name(track name)
          2. dot is inner element of parent element. Get it.
          3. check if current track equal to name argument
          3.1 if not equal -> we should play a new song.
          3.2 change src of audio object and change play status to true(item is playing)
              and set track to name(current track)
          3.3 use reset and addPlayStyle and play this audio
          4. check if track equal to current track
          4.1 if play status true than pause the track and apply rest function
          4.2 if play status false than play audio and addPlayStyle
          4.3 change paly status to opposite value


add to every album element event listener with playSong function params and trigger on click

kirjeldus: music_play skript käsitleb muusika esitamist muusikalehel. Samuti kontrollib see, milline üksus praegu on
mängib ja rakendage stiile praeguse toimingu põhjal (paus/esitus)

muusikamassiiv sisaldab lugude nimesid
audio = heliobjekt
el - kõik albumid

lähtestamine – funktsioon, mis seab kõik palade stiilid vaikeväärtustele

addPlayStyle – funktsioon, mis rakendab valitud üksusele mängustiili

playSong – selle skripti põhifunktsioon. Käsitseb elemendi (muusikaketta) taasesitusloogikat.
          1. funktsioon võtab kaks argumenti element (ketas) ja nimi (raja nimi)
          2. punkt on emaelemendi sisemine element. Hankige see.
          3. kontrollige, kas praegune rada võrdub nimeargumendiga
          3.1 kui ei ole võrdne -> peaksime mängima uut lugu.
          3.2 muutke heliobjekti src ja muutke esitusolekuks tõene (üksus mängib)
              ja määrake rajale nimi (praegune rada)
          3.3 kasutage lähtestamist ja lisage PlayStyle ning esitage see heli
          4. kontrollige, kas lugu on võrdne praeguse rajaga
          4.1 kui esituse olek on tõene, siis peatage lugu ja rakendage puhkefunktsiooni
          4.2 kui esituse olek on false, siis esita heli ja lisa PlayStyle
          4.3 muutke palli staatus vastupidiseks


lisage igale albumi elemendile sündmuste kuulaja PlaySong funktsiooni parameetritega ja käivitage klõpsamisel
*/
const el = document.querySelectorAll(".album");
let palyStatus, track, audio;
music = ["turf", "pertubator", "byrne", "scattle"];

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
    (palyStatus && audio.pause()) || reset();
    !palyStatus && audio.play() && addPlayStyle(element);
    palyStatus = !palyStatus;
  }
};

el.forEach((album, index) => {
  album.addEventListener("click", playSong.bind(null, album, music[index]));
});
