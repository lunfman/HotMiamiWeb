const scroller = document.querySelector('.scroller');
const talkBox = document.querySelector('.talk-box')
const timeCutOff = 30
let usersScreenHeight = document.documentElement.clientHeight
let currentPosition = 'home'

// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array Ben Aubin
// lisame pythoni sarnast funktisooni .choice() 
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
  }

const timeOnThePage = {
    home: 0,
    second: 0,
}

const messages = {
    home:{
        0: ['Hi, there welcome to blood bath', 'Hi, I am the boss of this page'],
        1: ['Let s whatch it again', 'You know if you like this trailer than you might light the game'],
        2: ['It looks like your really like this trailer', 'Scroll down dammit'],
        3: ['Are you bot?']
    },
    second:{
        0: ['No second chance, Just die'],
        1: ['asdddsa', 'page 21 s'],
        2: ['Iasddad', 'Scroll down adsads'],
        3: ['Are you asdasddasas?']
    }
}

const startPageTimer = (page) => {
    clearTimeout(pageTimer)
    pageTimer = setInterval(countVisitTime ,1000, page)
}

const boxPopUp = () => {
    talkBox.style.display = 'block'
}

const boxHide = () => {
    talkBox.style.display = 'none'   
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
    timer = setInterval(talk, 500)
}

const getMessagesRow = (page) => {
    return Math.floor(timeOnThePage[page] / timeCutOff)
}

const getComment = (page) => {
    return messages[page][getMessagesRow(page)].sample()
}

const countVisitTime = (value) => {
    timeOnThePage[value] ++
}


let timer = setInterval(talk, 2000)
let pageTimer, boxTimeOut
startPageTimer('home')


const  scrollEvent =  () => {
    if(scroller.scrollTop == 1){
        currentPosition = 'home'
        startPageTimer('home')
        boxHide()
    }
    if(scroller.scrollTop == usersScreenHeight){
        currentPosition = 'second'
        startPageTimer('second')
        boxHide()
        talkStraight()
        talkBox.textContent   = getComment('second')

    }
    if(scroller.scrollTop == usersScreenHeight* 2){
        currentPosition = 'home'
        boxHide()
        talkStraight()
        talkBox.textContent = getComment('home')
    }
    if(scroller.scrollTop == usersScreenHeight *3){
        currentPosition = 'forth'
        boxHide()
        talkBox.textContent = 'I know these idiots'
    }
  }
  
scroller.addEventListener('scroll', scrollEvent);

console.log(document.documentElement.clientHeight)

window.addEventListener('resize', function() {
    usersScreenHeight = document.documentElement.clientHeight
}, true);