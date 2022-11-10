const isScrolledIntoView = (el) => {
    // https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling by korywka
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // Only completely visible elements return true:
    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}  

const revealContent = () => {
    let reveals = document.querySelectorAll(".reveal");
    for (const reveal of reveals) {
        isScrolledIntoView(reveal) &&  reveal.classList.add("active");
        !isScrolledIntoView(reveal) &&  reveal.classList.remove("active");
}
}


scroller.addEventListener('scroll', revealContent);