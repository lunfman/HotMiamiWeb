const scroller = document.querySelector('.scroller');
const talkBox = document.querySelector('.talk-box')
let usersScreenHeight = document.documentElement.clientHeight

const boxPopUp = () => {
    talkBox.style.display = 'block'
}

const boxHide = () => {
    talkBox.style.display = 'none'
}

const resetTimer = () => {

}

const talk = () => {
    boxPopUp()
    setTimeout(boxHide, 3000)
}

let timer = setInterval(talk, 6000)


const scrollEvent = () => {
    if(scroller.scrollTop == 1){
        boxPopUp()
        talkBox.textContent = 'Home page'
        console.log('home-page')
    }
    if(scroller.scrollTop == usersScreenHeight){
        boxHide()
        // clearInterval(timer)
        console.log('sceond page')
        talkBox.textContent = 'second page'
    }
    if(scroller.scrollTop == usersScreenHeight* 2){
        boxHide()
        console.log('third page')
        talkBox.textContent = 'third page'
    }
    if(scroller.scrollTop == usersScreenHeight *3){
        boxHide()
        console.log('forth page')
        talkBox.textContent = 'forth page'
    }
  }
  
scroller.addEventListener('scroll', scrollEvent);

console.log(document.documentElement.clientHeight)


window.addEventListener('resize', function() {
    usersScreenHeight = document.documentElement.clientHeight
}, true);