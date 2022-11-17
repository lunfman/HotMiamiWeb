const closeButton = document.querySelector('.closebtn')
const buyButton = document.querySelector('.single-link')
const menu = document.querySelector('.overlay')

let open = false

const openMenu = () => {
    //  open pop up menu function
    open ? menu.style.width = '0%' : menu.style.width = '100%'
    toggle()
}

const toggle = () => {
    // change state of the open to opposite bool
    open = !open
}

const closeMenu = () => {
    // close pop up menu
    menu.style.width = '0%'
    toggle()
}

// add event listeners for close and open btn only has effect on mobile phones
buyButton.addEventListener('click', openMenu)
closeButton.addEventListener('click', closeMenu)