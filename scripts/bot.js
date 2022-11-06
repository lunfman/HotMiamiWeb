const scroller = document.querySelector('.scroller');
const talkBox = document.querySelector('.talk-box')
const mask = document.querySelector('.mask')

const timeCutOff = 30
let usersScreenHeight = document.documentElement.clientHeight
let currentPosition = 'home'
let secondPageVisited = false
// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array Ben Aubin
// lisame pythoni sarnast funktisooni .choice() 
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

const timeOnThePage = {
    home: 0,
    second: 0,
}
// https://en.wikiquote.org/wiki/Hotline_Miami
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
    other: ['come one', "Some things work out best when you don't try so hard.", "You don't look well, sir. Are you alright?"]
}

const startPageTimer = (page) => {
    clearInterval(pageTimer)
    pageTimer = setInterval(countVisitTime ,1000, page)
}

const countVisitTime = (value) => {
    timeOnThePage[value] ++
}

const boxPopUp = () => {
    talkBox.style.display = 'block'
    mask.src="./assets/mask/speak.gif";
}

const boxHide = () => {
    talkBox.style.display = 'none'   
    mask.src="./assets/mask/mask.png";
}

const resetTimer = () => {
    clearInterval(timer)
    clearTimeout(boxTimeOut)
}

const talk = () => {
    resetTimer()
    timer = setInterval(talk, 29000)
    talkBox.textContent = getComment(currentPosition)
    boxPopUp()
    boxTimeOut = setTimeout(boxHide, 7000)

}

const talkStraight = () => {
    resetTimer()
    timer = setInterval(talk, 1000)
}

const getMessagesRow = (page) => {
    return Math.floor(timeOnThePage[page] / timeCutOff)
}

const getComment = (page) => {
    let row = getMessagesRow(page)
    return row <= 3 ? messages[page][row].sample() : messages['other'].sample()
}


let timer = setInterval(talk, 2000)
let pageTimer, boxTimeOut
startPageTimer('home')


const  scrollEvent =  () => {
    if(scroller.scrollTop == 1){
        currentPosition = 'home'
        startPageTimer('home')
    }
    if(scroller.scrollTop == usersScreenHeight){
        currentPosition = 'second'
        startPageTimer('second')
        if(!secondPageVisited){
            talkStraight()
            secondPageVisited = true
        }
    }
    if(scroller.scrollTop == usersScreenHeight* 2){
        currentPosition = 'third'
    }
    if(scroller.scrollTop == usersScreenHeight *3){
        currentPosition = 'forth'
    }
  }
  
scroller.addEventListener('scroll', scrollEvent);

window.addEventListener('resize', function() {
    usersScreenHeight = document.documentElement.clientHeight
}, true);