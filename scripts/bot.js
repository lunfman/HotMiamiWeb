// autor @lunfman
const scroller = document.querySelector(".scroller");
const talkBox = document.querySelector(".talk-box");
const mask = document.querySelector(".mask");
const nav = document.querySelector("nav");

// time cutoff of the bot speech ->  related to messages rows
// example: cutoff is 30s  -> if user spent on the page 15 s the bot will use first row lines for the talk
// if user spent 31 s on the page than bot is going to use second row lines for this page and so on

// roboti kõne ajaline katkestus -> seotud sõnumiridadega
// näide: katkestus on 30 s -> kui kasutaja kulutas lehel 15 s, kasutab bot kõne jaoks esimese rea ridu
// kui kasutaja veetis lehel 31 s, kasutab bot selle lehe jaoks teise rea ridu ja nii edasi
const timeCutOff = 30;

// start next talk if not other rules applied in .... ms
// alustage järgmist kõnet, kui mitte muud reeglid, mida rakendatakse .... ms
const intervalBetweenTalks = 29000;
// duration of the bot talk also in ms
// boti kõne kestus ka ms
const talkDuration = 7000;
// start first talk when page loaded in ... ms
// alustab esimest kõnet, kui leht laaditakse ... ms pärast
const firstTalk = 2000;

// get users screen height on browser init
// saada kasutajate ekraani kõrgus brauseri alglaadimisel
let usersScreenHeight = document.documentElement.clientHeight;
// set current position to home because we start from home page
// määrake praegune asukoht koduks, sest alustame avalehelt
let currentPosition = "home";
// object which is going to store is page already visited by user or note
// objekt, mis salvestatakse, on leht, mida kasutaja või märkus on juba külastanud
let pageVisit = {
  home: true,
  second: false,
  third: false,
  fourth: false,
  fifth: false,
};

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array Ben Aubin
// lisame pythoni sarnast funktisooni .choice()
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// object for storing how much time user spent on each page
// objekt, mis salvestab, kui palju aega kasutaja igal lehel veetis
const timeOnThePage = {
  home: 0,
  second: 0,
  third: 0,
  fourth: 0,
  fifth: 0,
};
// https://en.wikiquote.org/wiki/Hotline_Miami
// messages object which coresponds to the page and time spent on the page 0 means current time cut off is 0 and 1 cutoff is one
// check get row function to get idea how it is working
// sõnumite objekt, mis vastab lehele ja lehel veedetud ajale 0 tähendab, et praegune aeg on 0 ja 1
// piir on üks kontrollimine rea hankimise funktsioon, et saada aimu, kuidas see töötab
const messages = {
  home: {
    0: [
      "Who invited all these morons?",
      "Man, this party stinks. I fucking hate these people",
      "Do you like hurting other people?",
      "Look at my face. We've met before...",
      "You're no guest of mine!",
    ],
    1: [
      "Let s whatch it again",
      "You know if you like this trailer than you might light the game",
    ],
    2: ["It looks like your really like this trailer", "Scroll down dammit"],
    3: [
      "Are you bot?",
      " Where are you right now?",
      "Why are we having this conversation?",
    ],
  },
  second: {
    0: ["No second chance, Just die"],
    1: ["asdddsa", "page 21 s"],
    2: ["Iasddad", "Scroll down adsads"],
    3: ["Are you asdasddasas?"],
  },
  third: {
    0: ["Nice brain soup, dude!"],
  },
  fourth: {
    0: ["One more pizza. please!"],
  },
  fifth: {
    0: [
      "I know these idiots",
      "These idiots are free from exam. Page speaks for it s self!",
    ],
  },
  other: [
    "come one",
    "Some things work out best when you don't try so hard.",
    "You don't look well, sir. Are you alright?",
  ],
};

// save right position of the talk box because of different sizes it should be dynamic
// salvestage kõnekasti õige asend erinevate suuruste tõttu peaks see olema dünaamiline
let talBoxPos;

const startPageTimer = (page) => {
  // start page timer
  // clean prev interval of the timer to prevent async side effects
  //  avalehe taimer
  // Asünkroonsete kõrvalmõjude vältimiseks puhastage taimeri eelmine intervall
  clearInterval(pageTimer);
  // set new timer
  pageTimer = setInterval(countVisitTime, 1000, page);
};

const countVisitTime = (value) => {
  // function for counting time on each page
  // funktsioon aja lugemiseks igal lehel
  timeOnThePage[value]++;
};

const boxPopUp = () => {
  // show talking box
  // näita jutukasti
  talkBox.style.display = "block";
  // change image to action gif because if box pop up than bot should start speaking
  // muuda pilt tegevus-gif-iks, sest kui kast avaneb, peaks bot rääkima
  mask.src = "./assets/mask/speak.gif";
};

const boxHide = () => {
  // hide talking box
  // peida kõnekast
  talkBox.style.display = "none";
  // set image back to default
  // määrake pilt tagasi
  mask.src = "./assets/mask/mask.png";
};

const resetTimer = () => {
  // clean all timers which releated to the bot
  // puhastage kõik robotiga seotud taimerid
  clearInterval(timer);
  clearTimeout(boxTimeOut);
};

const talk = () => {
  resetTimer();
  // set new timer which is going to call this function again like loop each 29s
  // määrake uus taimer, mis hakkab seda funktsiooni uuesti kutsuma nagu silmus iga 29 sekundi järel
  timer = setInterval(talk, intervalBetweenTalks);
  // get current position of the page and get related message
  // hankige lehe praegune asukoht ja hankige seotud sõnum
  talkBox.textContent = getComment(currentPosition);
  // call pop up box
  // kutse hüpikaken
  boxPopUp();
  // set box timeout -> message is going to last exactly 7 seconds
  // set box timeout -> teade kestab täpselt 7 sekundit
  boxTimeOut = setTimeout(boxHide, talkDuration);
};

const talkStraight = () => {
  // talkstraight fucntion allow to by pass all prev rules and clear all timers so the bot start to
  // speak straight away after it was called
  // funktsioon talkstraight võimaldab mööda minna kõigist eelmistest reeglitest ja tühjendada kõik taimerid, nii et bot hakkab // rääkima kohe pärast selle väljakutsumist
  resetTimer();
  timer = setInterval(talk, 1000);
};

const getMessagesRow = (page) => {
  // function which calculates message position base on timecutoff
  // > 30 s -> row 1 and so on
  // funktsioon, mis arvutab ajalõigu alusel sõnumi asukoha baasi
  // > 30 s -> rida 1 ja nii edasi
  return Math.floor(timeOnThePage[page] / timeCutOff);
};

const getComment = (page) => {
  // get row of the message
  // hankige sõnumi rida
  let row = getMessagesRow(page);
  // use this row to retrive message from message object related to current page and time on the page
  // if messages do not have message for this params than return random message from other category
  // if row do not exists will run other sample
  // kasutage seda rida praeguse lehe ja lehe ajaga seotud sõnumi objektilt sõnumi toomiseks
  // kui sõnumitel pole selle parameetri jaoks teadet, tagastatakse juhuslik sõnum teisest kategooriast
  // kui rida pole olemas, käivitatakse muu näidis
  return messages[page][row]
    ? messages[page][row].sample()
    : messages["other"].sample();
};

const setPageVisit = (page) => {
  // set that user visited the page for the first time -> start straight talk
  // määrake, et kasutaja külastas lehte esimest korda -> alusta otsest kõnet
  if (!pageVisit[page]) {
    talkStraight();
    pageVisit[page] = true;
  }
  // if page was visited this function will not apply this effect again
  // kui lehte külastati, see funktsioon seda efekti enam ei rakenda
};

const setPagePosition = (page) => {
  // function which sets page position and starts all req functions like
  // startPageTimer to calculate time on the current page and setPageVisited
  // funktsioon, mis määrab lehe asukoha ja käivitab kõik req funktsioonid nagu
  // startPageTimer, et arvutada praegusel lehel aega ja määrataPageVisited
  currentPosition = page;
  startPageTimer(page);
  setPageVisit(page);
};

// init timer and home timer on page init stage
// init taimer ja kodutaimer lehel init etapis
let timer = setInterval(talk, firstTalk);
let pageTimer, boxTimeOut;
startPageTimer("home");

const scrollEvent = () => {
  // scroll event function which is trigered on scroll
  // this function also check on which page user located at this moment and allow to
  // trigger diffirent events based on position on the page

  // to get page diff we use simple math if we know users screen height than second page this value by 2
  // ofcourse there is a lot of diffirent oportunietises to create this functionality
  // sündmuse kerimisfunktsioon, mis käivitub kerimisel
  // see funktsioon kontrollib ka, millisel lehel kasutaja hetkel asub ja lubab seda teha
  // käivitavad erinevad sündmused, mis põhinevad positsioonil lehel

  // lehe erinevuse saamiseks kasutame lihtsat matemaatikat, kui teame kasutaja ekraani kõrgust kui teise lehe kõrgust 2 võrra
  // loomulikult on selle funktsiooni loomiseks palju erinevaid võimalusi
  if (scroller.scrollTop == 1) {
    setPagePosition("home");
  }
  if (scroller.scrollTop >= usersScreenHeight) {
    setPagePosition("second");
  }
  if (scroller.scrollTop >= usersScreenHeight * 2) {
    setPagePosition("third");
  }
  if (scroller.scrollTop >= usersScreenHeight * 3) {
    setPagePosition("fourth");
    nav.style.opacity = 1;
    mask.style.opacity = 1;
    talkBox.style.opacity = 1;
  }
  if (scroller.scrollTop >= usersScreenHeight * 4) {
    nav.style.opacity = 0;
    mask.style.opacity = 0;
    talkBox.style.opacity = 0;
  }
  if (scroller.scrollTop >= usersScreenHeight * 5) {
  }
};

//
scroller.addEventListener("scroll", scrollEvent);

window.addEventListener(
  "resize",
  function () {
    usersScreenHeight = document.documentElement.clientHeight;
  },
  true
);
