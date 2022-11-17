const closeButton = document.querySelector('.closebtn')
const buyButton = document.querySelector('.single-link')
const menu = document.querySelector('.overlay')

let open = false

const openMenu = () => {
    // function 
    open ? menu.style.width = '0%' : menu.style.width = '100%'
    toggle()
}

const toggle = () => {
    open = !open
}

const closeMenu = () => {
    menu.style.width = '0%'
    toggle()
}

// add event listeners for close and open btn only has effect on mobile phones
buyButton.addEventListener('click', openMenu)
closeButton.addEventListener('click', closeMenu)