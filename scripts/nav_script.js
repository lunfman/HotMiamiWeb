const closeButton = document.querySelector('.closebtn')
const buyButton = document.querySelector('.single-link')
const menu = document.querySelector('.overlay')
let open = false

const openMenu = () => {
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

buyButton.addEventListener('click', openMenu)
closeButton.addEventListener('click', closeMenu)