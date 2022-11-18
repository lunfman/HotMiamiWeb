const scroller = document.querySelector('.scroller');
const talkBox = document.querySelector('.talk-box')
const mask = document.querySelector('.mask')
// time cutoff of the bot speech -> wait 30 seconds before next talk
const timeCutOff = 30
// get users screen height on browser init
let usersScreenHeight = document.documentElement.clientHeight
// set current position to home because we start from home page
let currentPosition = 'home'
// object which is going to store is page already visited by user or note
let pageVisit = {
    home: true,
    second: false,
    third: false,
    fourth: false,
    fifth: false
}

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array Ben Aubin
// lisame pythoni sarnast funktisooni .choice() 
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

// object for storing how much time user spent on each page
const timeOnThePage = {
    home: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0 
}
// https://en.wikiquote.org/wiki/Hotline_Miami
// messages object which coresponds to the page and time spent on the page 0 means current time cut off is 0 and 1 cutoff is one
// check get row function to get idea how it is working
const messages = {
    home:{
        0: [
            'Who invited all these morons?',
            'Man, this party stinks. I fucking hate these people',
            'Do you like hurting other people?',
            "Look at my face. We've met before...",
            "You're no guest of mine!"
        ],
        1: [
            'Let s whatch it again',
            'You know if you like this trailer than you might light the game'
        ],
        2: [
            'It looks like your really like this trailer',
            'Scroll down dammit'],
        3: [
            'Are you bot?',
            ' Where are you right now?',
            'Why are we having this conversation?']
    },
    second:{
        0: ['No second chance, Just die'],
        1: ['asdddsa', 'page 21 s'],
        2: ['Iasddad', 'Scroll down adsads'],
        3: ['Are you asdasddasas?']
    },
    third:{
        0: ['Nice brain soup, dude!']
    },
    fourth:{
        0: ['One more pizza. please!']
    },
    fifth: {
        0: ['I know these idiots', 'These idiots are free from exam. Page speaks for it s self!']
    },
    other: ['come one', "Some things work out best when you don't try so hard.", "You don't look well, sir. Are you alright?"]
}

const startPageTimer = (page) => {
    // start page timer 
    // clean prev interval of the timer to prevent async side effects
    clearInterval(pageTimer)
    // set new timer
    pageTimer = setInterval(countVisitTime ,1000, page)
}

const countVisitTime = (value) => {
    // function for counting time on each page
    timeOnThePage[value] ++
}

const boxPopUp = () => {
    // show talking box
    talkBox.style.display = 'block'
    // change image to action gif because if box pop up than bot should start speaking
    mask.src="./assets/mask/speak.gif";
}

const boxHide = () => {
    // hide talking box
    talkBox.style.display = 'none'   
    // set image back to default
    mask.src="./assets/mask/mask.png";
}

const resetTimer = () => {
    // resettimer function
    // clean all timers which releated to the bot
    clearInterval(timer)
    clearTimeout(boxTimeOut)
}

const talk = () => {
    resetTimer()
    // set new timer which is going to call this function again like loop each 29s
    timer = setInterval(talk, 29000)
    // get current position of the page and get related message
    talkBox.textContent = getComment(currentPosition)
    // call pop up box 
    boxPopUp()
    // set box timeout -> message is going to last exactly 7 seconds
    boxTimeOut = setTimeout(boxHide, 7000)
}

const talkStraight = () => {
    // talkstraight fucntion allow to by pass all prev rules and clear all timers so the bot start to 
    // speak straight away after it was called 
    resetTimer()
    timer = setInterval(talk, 1000)
}

const getMessagesRow = (page) => {
    // function which calculates message position base on timecutoff
    // > 30 s -> row 1 and so on
    return Math.floor(timeOnThePage[page] / timeCutOff)
}

const getComment = (page) => {
    // get row of the message
    let row = getMessagesRow(page)
    // use this row to retrive message from message object related to current page and time on the page
    // if messages do not have message for this params than return random message from other category
    // if row do not exists will run other sample
    return messages[page][row] ? messages[page][row].sample() : messages['other'].sample()
}

const setPageVisit = (page) => {
    // set that user visited the page for the first time -> start straight talk
    if(!pageVisit[page]){
        talkStraight()
        pageVisit[page] = true
    }
    // if page was visited this function will not apply this effect again
}

const setPagePosition = (page) => {
    // function which sets page position and starts all req functions like
    // startPageTimer to calculate time on the current page and setPageVisited
    currentPosition = page
    startPageTimer(page)
    setPageVisit(page)
}

// init timer and home timer on page init stage
let timer = setInterval(talk, 2000)
let pageTimer, boxTimeOut
startPageTimer('home')


const  scrollEvent =  () => {
    // scroll event function which is trigered on scroll
    // this function also check on which page user located at this moment and allow to 
    // trigger diffirent events based on position on the page 

    // to get page diff we use simple math if we know users screen height than second page this value by 2
    // ofcourse there is a lot of diffirent oportunietises to create this functionality
    if(scroller.scrollTop == 1){
        setPagePosition('home')
    }
    if(scroller.scrollTop >= usersScreenHeight){
        setPagePosition('second')
    }
    if(scroller.scrollTop >= usersScreenHeight * 2){
        setPagePosition('third')
    }
    if(scroller.scrollTop >= usersScreenHeight * 3){
        setPagePosition('fourth')
    }
    if(scroller.scrollTop >= usersScreenHeight * 4){
        setPagePosition('fifth')
    }
  }
  
 //  
scroller.addEventListener('scroll', scrollEvent);

window.addEventListener('resize', function() {
    usersScreenHeight = document.documentElement.clientHeight
}, true);