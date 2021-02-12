/* Put your javascript in here */
const slideArray = ["images/onigiri_1.png","images/onigiri_2.png","images/onigiri_3.png","images/onigiri_4.png","images/roll_1.png","images/roll_2.png","images/roll_3.png"];

let currentSlideIndex = 0;

function advanceSliderItem() {
  currentSlideIndex++;

  if (currentSlideIndex >= slideArray.length) {
    currentSlideIndex = 0;
  }

  document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';
}

function reverseSliderItem(){
    currentSlideIndex--;
    if (currentSlideIndex <= 0 ){
        currentSlideIndex = slideArray.length - 1;
    }
    
    document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[currentSlideIndex] + '") no-repeat center center; background-size: cover;';
}

function onLoadOfPage(){
    document.querySelector('.slider').style.cssText = 'background: url("' + slideArray[0] + '") no-repeat center center; background-size: cover;';
    document.getElementById("next_button").addEventListener('click', (event) => {
        advanceSliderItem()
    })
    document.getElementById("previous_button").addEventListener('click', (event) => {
        reverseSliderItem()
    })
}

window.onload = onLoadOfPage;

