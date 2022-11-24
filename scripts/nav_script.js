// https://www.w3schools.com/howto/howto_js_fullscreen_overlay.asp
// modified by @lunfman

const closeButton = document.querySelector(".closebtn");
const buyButton = document.querySelector(".single-link");
const menu = document.querySelector(".overlay");

let open = false;

const openMenu = () => {
  //  open pop up menu function
  // by change style width from 0 to 100
  // if user click again on buy btn than it will close
  // avab hüpikmenüü funktsiooni
  // stiili laiuse muutmisega 0-lt 100-le
  // kui kasutaja klõpsab uuesti nupul osta btn
  open ? (menu.style.width = "0%") : (menu.style.width = "100%");
  toggle();
};

const toggle = () => {
  // change state of the open to opposite bool
  // muuda avatud olekut vastupidiseks tõeväärtuseks
  open = !open;
};

const closeMenu = () => {
  // close pop up menu
  // sule hüpikmenüü
  menu.style.width = "0%";
  toggle();
};

// add event listeners for close and open btn only has effect on mobile phones
// avaldab mõju mobiiltelefonidele
buyButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
