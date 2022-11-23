const isScrolledIntoView = (el) => {
  // function from stackoverflow
  // https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling by korywka
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;

  // Only completely visible elements return true:
  let isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

// function which allow toggle reveal effect
const revealContent = () => {
  // autor @lunfman
  let reveals = document.querySelectorAll(".reveal");
  for (const reveal of reveals) {
    //  if in element in the view than add to this element class active
    isScrolledIntoView(reveal) && reveal.classList.add("active");
    //  if in element not in the view than remove from this element element class active
    !isScrolledIntoView(reveal) && reveal.classList.remove("active");
  }
};

//  add scroll eventlistener to detect position of the screen and on change of the scroll position activate
// revealContent function
scroller.addEventListener("scroll", revealContent);
