const forwardBtn = document.querySelector('#forward');
const backwardBtn = document.querySelector('#backward');
const movableContainer = document.querySelector('#movable');
const slidebox = document.querySelector('#slidebox');
const
  rotationFactor = 10, 
  translateFactor = 10;

let cardWidth = 0;
let cards = Array.from(movableContainer.querySelectorAll('li.card'));
let amount = 0;
let isRunning = false;
let index = 0;
let translations = [];
let activeCard = (cards.length) ? cards[0] : false;
let inCard = false;

const onDocumentMouseMove = (event) => {
    
    if (!activeCard) { return }
    let imageToShow = (index % amount);
    let activeCardIndex = ((imageToShow + 1)  % amount);
     let 
        mouseX = event.pageX - slidebox.offsetLeft - slidebox.offsetWidth/2,
        mouseY = event.pageY - slidebox.offsetTop -  slidebox.offsetHeight/2,
        mousePX = mouseX / activeCard.offsetWidth,
        mousePY = mouseY / activeCard.offsetHeight,
        theta = Math.atan2( event.pageY - (window.innerHeight / 2),  event.pageX - (window.innerWidth / 2)), 
        angle = theta * 180 / Math.PI - 90,  
        rX = mousePX * rotationFactor,
        rY = mousePY * (rotationFactor * -1),
        tX = mousePX * (translateFactor * -1),
        tY = mousePX * (translateFactor * -1),
        scale = (inCard) ? 1.1 : 1,
        mousePositionX = (event.pageX / window.innerWidth) * 100,
        mousePositionY = (event.pageY /  window.innerHeight) * 50,
        shadowH = ((activeCard.offsetWidth / 2 - mouseX) * .1) / 2,
        shadowV = ((activeCard.offsetHeight / 2 - mouseY) * .1) / 2;
  
  const isRotated = activeCard.querySelector('.flip-container').classList.contains('rotated');
  const targetElement = (isRotated) ? 
        activeCard.querySelector('.card-back') : 
        activeCard.querySelector('.card-front');
  
  activeCard.style.transform = `translateX(${translations[activeCardIndex]}px) scale(${scale})`;
  activeCard.querySelector('.container').style.transform = `rotateX(${rY}deg) rotateY(${rX}deg) translateX(${tX}px) translateY(${tY}px)`;
  
 targetElement.style.boxShadow = `${shadowH}px ${shadowV}px 60px -12px #000`;
  targetElement.querySelector('.light-effect').style.background = `linear-gradient(${angle}deg, rgba(255,255,255,.6) 0%,rgba(255,255,255,0) 60%)`;
  activeCard.querySelector('.image-container').style.backgroundPosition = `${mousePositionX}%, ${mousePositionY}%`;
  
 };
  

if (cards.length && cards.length > 1) {
  amount = cards.length;
  cardWidth = parseInt(cards[0].offsetWidth, 10);
  
  cards.forEach((card, counter) => {
      translations[counter] = -cardWidth;
      card.addEventListener('transitionstart', function(e) {
        isRunning = true;
      });
      card.addEventListener('mouseenter', function setRunning() {
        inCard = true;   
      });
      card.addEventListener('mouseleave', function setRunning() {
        inCard = false;   
      });
      card.addEventListener('transitionend', function setRunning() {
        isRunning = false;   
      });
    
      const navClone = card.querySelector('.properties ul').cloneNode(true);
      navClone.classList.add('nav');
      card.querySelector('.header').after(navClone);
      let items = Array.from(navClone.querySelectorAll('li'));
      items.forEach((item) => {
          item.addEventListener('click', () => {
            const box = card.querySelector('.flip-container');
            box.classList.add('rotated');  
          });
      });
      
      items = Array.from(card.querySelectorAll('.properties li'));
      items.forEach((item) => {
          item.addEventListener('click', () => {
            const box = card.querySelector('.flip-container');
            box.classList.add('rotated');  
          });
      });
      
    
    card.querySelector('.card-back').addEventListener('click', () => {
         const box = card.querySelector('.flip-container');
         box.classList.remove('rotated');  
       });
   
    
      bgImage = document.createElement('div');
      let identifier = card.classList[1];
      bgImage.classList.add('bgContainer');
      bgImage.style.backgroundImage = `url(https://assets.codepen.io/513985/bg-${identifier}.png)`;
      if(counter > 0) {
        bgImage.style.opacity = 0;
      }
      document.body.appendChild(bgImage);
    
  });
  movable.insertBefore(cards[(cards.length - 1)], cards[0]);

  const moving = (outerIndex, direction) => {
    cards = Array.from(movableContainer.querySelectorAll('li.card'));
    bgImages = Array.from(document.querySelectorAll('.bgContainer'));
    for (let i = 0; i < amount; i++) {
      const slide = cards[i]; 
      const pos = translations[i] + (cardWidth * direction);
      Object.assign(slide.style, {
        transform: `scale(1) translateX(${pos}px`,
        opacity: 1
      });
      translations[i] = pos;
    }
    const toSlide =cards[outerIndex];
    const pos = translations[outerIndex] + (cardWidth*amount) * (direction *-1);
    Object.assign(toSlide.style, {
      transform: `translateX(${pos}px`,
      opacity: 0
    });
    translations[outerIndex] = translations[outerIndex]+(cardWidth * (direction *-1)) *(amount);
    let imageToShow = (index % amount);
    let activeCardIndex = ((imageToShow + 1)  % amount)
  
    for (let i = 0; i < amount; i++) {
      if (i !== imageToShow) {
        bgImages[i].style.opacity = 0;
      }
    }
   bgImages[imageToShow].style.opacity = 1;
   activeCard = cards[activeCardIndex];
  };

  
   const goBack = () => {
    if (isRunning) { return }
    index--;
    if (index == -1) { index = amount-1; }
    moving((index % amount), 1);
  }
  
  const goFoward = () => {
    if (isRunning) { return }
    const outerIndex = (index) % amount;
    index++;
    moving(outerIndex, -1);
  }
  
 
  document.addEventListener('click', (event) => {
      isLeft = (window.innerWidth / 2) > event.pageX;
      if (inCard) {
        return;
      }
      if (isLeft) {
        goBack();
      } else {
        goFoward();
      }
  });
}

 document.addEventListener('mousemove', onDocumentMouseMove);
