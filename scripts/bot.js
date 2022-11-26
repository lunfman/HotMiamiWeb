/* 
@lunfman autor

description: script which run bot logic based on parameters

customizable variables:

timeCutOff - time cutoff of the bot speech ->  related to messages rows 
      example: cutoff is 30s  -> if user spent on the page 15 s the bot will use row 0 lines for the talk if user spent 31 s
      on the page than bot is going to use row 1 lines for this page and so on

intervalBetweenTalks -  start next talk in .... ms

talkDuration -  duration of the bot talk also in ms (when talk box appears it is going to be visible for n s)

firstTalk - start first talk in n ms after page load

variables:

usersScreenHeight - heigh of the users screen
currentPosition - first value is home because we start from home section ... logical

pageVisit - object which stores information which page was already visited

timeOnThePage - object which stores how many second user spent on the page

messages - complex object which has key as name of the section and object inside of the key which should have keys from 0 - n. 0 is the row.
          we use this row to show messages based on how many second user spend on the page. Check timeCutOff.

          others - is the key which will be used if there is no more available messages for current section. (keyError)

timer - timer which waits n ms before next talk.
boxTimeOut - timer in how many second box should be closed.

functions:

startPageTimer - take one argument page(key for pageVisit). This function clear previous pageTimer and sets new timer based on current section.

countVisitTime - take one argument value(the same as page in startPageTimer) we use this function inside of startPageTimer.
                 It simply add seconds to timeOnThePage object to the current active key.

boxPopUp - simple function which on call change style of the box to visible and change bot image src to gif.

boxHide - opposite to boxPopUp

resetTimer - function which reset timer and boxTimer. This allow to prevent async side effects.

talk - is the most important function in this script. It allow our bot to talk.
        1. resetTimer to prevent async side effects
        2. set new timers and pass itself to interval. This is like a loop. This function will be called again in n seconds.
        3. call getComment to get bot speech for the current page
        4. boxPopUp - make talking box visible
        5. setTimer to the box so it will disappear in talkDuration ms.

talkStraight - the function which break all the rules of the timers. We need it to activate no mater how long bot talked on prev page. If user scrolled down
                it should speech for this page. We use it only when user visits section for the first time. Your can see this effect if your start scroll
                the section in a row without waiting for the bot speech end. 
                "speak straight away after it was called"

getMessagesRow - take one argument page(key for messages). This function return the row number based on timeCutoff.

getComment - take one argument page(key for messages).
              1. first of all get row for the current page messages.
              2. and return message based on row. If row not found(keyError) than use messages from key other.

setPageVisit - take one argument page(key for pageVisit)
              1. Check if the page was visited.
              2. If page not visited activate straight talk for this page and set that his page is visited.

setPagePosition - function take one argument page(key for setPageVisit and countVisitTime)
              1. set that currentPosition to page argument
              2. call startPageTimer and setPageVisit

scrollEvent - function which is used in scroll event listener. And perform different logical operations based on the section.
              (where user is currently located on the web page).


also we have event listener for resize action. If user try to resize the screen and the height of the browser screen will b changed.
We are going to get new value for usersScreenHeight

#######################################################################################################################################

EE:
kirjeldus: skript, mis käivitab parameetrite alusel robotloogika

kohandatavad muutujad:

timeCutOff – roboti kõne ajaline katkestus –> seotud sõnumiridadega
      näide: katkestus on 30 s -> kui kasutaja kulutas lehel 15 s, kasutab robot kõne jaoks rida 0, kui kasutaja kulutas 31 s
      lehel hakkab bot kasutama selle lehe jaoks rida 1 ja nii edasi

intervalBetweenTalks – alustage järgmist kõnet .... ms pärast

talkDuration – roboti kõne kestus ka ms-des (kui ilmub kõnekast, on see nähtav n s)

firstTalk – alustage esimest kõnet n ms pärast lehe laadimist

muutujad:

usersScreenHeight – kasutajate ekraani kõrgus
currentPosition – esimene väärtus on kodu, sest alustame kodujaotisest ... loogiline

pageVisit - objekt, mis salvestab teabe, millist lehte on juba külastatud

timeOnThePage – objekt, mis salvestab, mitu sekundit kasutaja lehel veetis

sõnumid - kompleksobjekt, mille jaotise nimeks on võti ja võtme sees olev objekt, millel peaksid olema võtmed vahemikus 0–n. 0 on rida.
          kasutame seda rida sõnumite kuvamiseks selle põhjal, mitu sekundit kasutaja lehel kulutab. Kontrollige TimeCutOff.

          teised – on võti, mida kasutatakse juhul, kui praeguses jaotises pole enam sõnumeid. (keyError)

taimer – taimer, mis ootab n ms enne järgmist kõnet.
boxTimeOut – taimer, mitu sekundit tuleb kasti sulgeda.

funktsioonid:

startPageTimer – võtke üks argumendileht (pageVisit võti). See funktsioon tühjendab eelmise leheTaimeri ja seab uue taimeri praeguse jaotise alusel.

countVisitTime – võtke üks argumendi väärtus (sama, mis lehel startPageTimeris), me kasutame seda funktsiooni startPageTimeris.
                 See lihtsalt lisab praegusele aktiivsele võtmele timeOnThePage objektile sekundeid.

boxPopUp – lihtne funktsioon, mis muudab kõne korral kasti stiili nähtavaks ja muudab roboti pildi src gif-vorminguks.

boxHide – boxPopUpi vastas

resetTimer – funktsioon, mis lähtestab taimeri ja boxTimer. See võimaldab vältida asünkroonseid kõrvalmõjusid.

talk – on selle skripti kõige olulisem funktsioon. See võimaldab meie robotil rääkida.
        1. resetTimer asünkroonimise kõrvalmõjude vältimiseks
        2. seadke uued taimerid ja suunake end intervallile. See on nagu silmus. Seda funktsiooni kutsutakse uuesti n sekundi pärast.
        3. Praeguse lehe robotkõne saamiseks helistage getCommentile
        4. boxPopUp – tee jutukast nähtavaks
        5. Seadke Taimer kasti, et see kaoks kõne kestuse ms jooksul.

talkStraight – funktsioon, mis rikub kõiki taimerite reegleid. Vajame seda aktiveerimiseks olenemata sellest, kui kaua bot eelmisel lehel rääkis. Kui kasutaja keris alla
                see peaks selle lehe jaoks kõne olema. Kasutame seda ainult siis, kui kasutaja külastab jaotist esimest korda. Seda efekti näete, kui alustate kerimist
                osa järjest, ootamata robotkõne lõppu.
                "Rääkige kohe pärast helistamist"

getMessagesRow – võtke üks argumendileht (sõnumite võti). See funktsioon tagastab rea numbri, mis põhineb timeCutoffil.

getComment – ​​võtke üks argumentide leht (sõnumite võti).
              1. kõigepealt hankige aktiivse lehe sõnumite rida.
              2. ja tagastab rea alusel sõnumi. Kui rida ei leitud (keyError), kasutage teise võtme sõnumeid.

setPageVisit – võtke üks argument leht (pageVisit võti)
              1. Kontrollige, kas lehte külastati.
              2. Kui lehte pole külastatud, aktiveerige selle lehe jaoks otsekõne ja määrake, et tema lehte külastatakse.

setPagePosition – funktsioon võtab ühe argumendi leht (võti setPageVisit ja countVisitTime jaoks)
              1. määrake praeguse positsiooni argumendiks leht
              2. helistage startPageTimerile ja määrakePageVisit

scrollEvent – ​​funktsioon, mida kasutatakse kerimissündmuste kuulajas. Ja sooritage lõigu alusel erinevaid loogilisi toiminguid.
              (kus kasutaja hetkel veebilehel asub).


Meil on ka sündmuste kuulaja suuruse muutmiseks. Kui kasutaja proovib ekraani suurust muuta, muutub brauseri ekraani kõrgus b.
Saame kasutajatele ekraanikõrguse jaoks uue väärtuse
*/

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array Ben Aubin
// lisame pythoni sarnast funktisooni .choice()
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const scroller = document.querySelector(".scroller");
const talkBox = document.querySelector(".talk-box");
const mask = document.querySelector(".mask");
const nav = document.querySelector("nav");

const timeCutOff = 30;
const intervalBetweenTalks = 29000;
const talkDuration = 7000;
const firstTalk = 2000;

let pageTimer, boxTimeOut;
let usersScreenHeight = document.documentElement.clientHeight;
let currentPosition = "home";
let pageVisit = {
  home: true,
  second: false,
  third: false,
  fourth: false,
  fifth: false,
};

const timeOnThePage = {
  home: 0,
  second: 0,
  third: 0,
  fourth: 0,
  fifth: 0,
};

// https://en.wikiquote.org/wiki/Hotline_Miami
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
    0: ["One more brain shot. please!"],
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

const startPageTimer = (page) => {
  clearInterval(pageTimer);
  pageTimer = setInterval(countVisitTime, 1000, page);
};

const countVisitTime = (value) => {
  timeOnThePage[value]++;
};

const boxPopUp = () => {
  talkBox.style.display = "block";
  mask.src = "./assets/mask/speak.webp";
};

const boxHide = () => {
  talkBox.style.display = "none";
  mask.src = "./assets/mask/mask.png";
};

const resetTimer = () => {
  clearInterval(timer);
  clearTimeout(boxTimeOut);
};

const talk = () => {
  resetTimer();
  timer = setInterval(talk, intervalBetweenTalks);
  talkBox.textContent = getComment(currentPosition);

  boxPopUp();
  boxTimeOut = setTimeout(boxHide, talkDuration);
};

const talkStraight = () => {
  resetTimer();
  timer = setInterval(talk, 1000);
};

const getMessagesRow = (page) => {
  return Math.floor(timeOnThePage[page] / timeCutOff);
};

const getComment = (page) => {
  let row = getMessagesRow(page);
  return messages[page][row]
    ? messages[page][row].sample()
    : messages["other"].sample();
};

const setPageVisit = (page) => {
  if (!pageVisit[page]) {
    talkStraight();
    pageVisit[page] = true;
  }
};

const setPagePosition = (page) => {
  currentPosition = page;
  startPageTimer(page);
  setPageVisit(page);
};

let timer = setInterval(talk, firstTalk);

startPageTimer("home");

const scrollEvent = () => {
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

scroller.addEventListener("scroll", scrollEvent);

window.addEventListener(
  "resize",
  function () {
    usersScreenHeight = document.documentElement.clientHeight;
  },
  true
);
