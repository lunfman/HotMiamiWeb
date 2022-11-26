/*
- isScrolledIntoView - function from stackoverflow
    https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling by korywka
    this function checks if element from html file in the viewpoint of the users screen. This is going to
    help us with animation. As you can see it gets bounding/border/size of the element and calculate how
    far it is from top and bottom.

@lunfman author
- revealContent - function which allow toggle reveal effect. 
      First of all get all elements from html which have .reveal class
      After we run for loop through all elements. Inside loop we check if element in the view
      by using isScrolledIntoView function. If element in the view -> add class active.(if you are interested
      you can find this class in style.css). Otherwise remove class active.

And in the end we simply add event listener to the scroller element. As you can see we do not have
this element inside of this .js file. Because we can get it from bot.js , because this is the first script
which browser reads in html file.

- isScrolledIntoView - stackoverflow funktsioon
    https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling, autor korywka
    see funktsioon kontrollib, kas element html-failist kasutajate ekraani vaatepunktis on. See läheb
    aidake meid animatsiooniga. Nagu näete, muutub see elemendi piiriks / piiriks / suuruseks ja arvutab, kuidas
    kaugel see ülevalt ja alt.

@lunfman autor
- discoverContent - funktsioon, mis võimaldab paljastamise efekti sisse- ja väljalülitamist.
      Kõigepealt hankige html-ist kõik elemendid, millel on klass .reveal
      Pärast seda, kui jookseme läbi kõigi elementide. Silmuse sees kontrollime, kas element on vaates
      kasutades funktsiooni isScrolledIntoView. Kui element vaates -> lisa klass aktiivne.(kui olete huvitatud
      selle klassi leiate aadressilt style.css). Vastasel juhul eemaldage klass aktiivne.

Ja lõpuks lisame kerimiselemendile lihtsalt sündmustekuulaja. Nagu näete, meil ei ole
see element selles js-failis. Sest me saame selle hankida saidilt bot.js, kuna see on esimene skript
milline brauser loeb html-faili.
*/

const isScrolledIntoView = (el) => {
  let rect = el.getBoundingClientRect();
  let elemTop = rect.top;
  let elemBottom = rect.bottom;

  // Only completely visible elements return true:
  let isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
};

const revealContent = () => {
  let reveals = document.querySelectorAll(".reveal");
  for (const reveal of reveals) {
    isScrolledIntoView(reveal) && reveal.classList.add("active");
    !isScrolledIntoView(reveal) && reveal.classList.remove("active");
  }
};

scroller.addEventListener("scroll", revealContent);
