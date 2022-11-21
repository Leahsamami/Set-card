//document.addEventListener('click', myFunction);
var 
  rotationFactor = 10, 
  translateFactor = 20,
  inCard = false,
  card = document.getElementById('rudolph'),
  bg = document.getElementById('rudolph-bg'),
  shine = document.getElementById('rudolph-shine'),
  timeout;

function cardOnMouseLeave() {
  inCard = false;
}

function cardOnMouseEnter() {
  inCard = true;
}

function onDocumentMouseMove(event) {
  var 
    mouseX = event.pageX - card.offsetLeft - card.offsetWidth/2,
    mouseY = event.pageY - card.offsetTop -  card.offsetHeight/2,
    mousePX = mouseX / card.offsetWidth,
    mousePY = mouseY / card.offsetHeight,
    theta = Math.atan2( event.pageY - (window.innerHeight / 2),  event.pageX - (window.innerWidth / 2)), 
    angle = theta * 180 / Math.PI - 90,  
    rX = mousePX * rotationFactor,
    rY = mousePY * (rotationFactor * -1),
    tX = mousePX * (translateFactor * -1),
    tY = mousePX * (translateFactor * -1),
    mousePositionX = (event.pageX / window.innerWidth) * 100,
    mousePositionY = (event.pageY /  window.innerHeight) * 50,
    scale = (inCard) ? 1.1 : 1,
    shadowH = ((card.offsetWidth / 2 - mouseX) * .1) / 2,
    shadowV = ((card.offsetHeight / 2 - mouseY) * .1) / 2;
  
   console.log(tX, card.offsetLeft);
  
  if (!card.classList.contains('focus')) {
    card.classList.add('focus');  
  }
  card.style.transform = `rotateX(${rY}deg) rotateY(${rX}deg) translateX(${tX}px) translateY(${tY}px) scale(${scale})`;
  shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,.6) 0%,rgba(255,255,255,0) 60%)`;
  bg.style.backgroundPosition = `${mousePositionX}%, ${mousePositionY}%`;
  card.style.boxShadow = `${shadowH}px ${shadowV}px 60px -12px rgba(0,0,0,0.78)`;
  if (timeout !== undefined) {
    window.clearTimeout(timeout);
  }
  timeout = window.setTimeout(function () {
    card.classList.remove('focus');
  }, 100);
}

document.addEventListener('mousemove', onDocumentMouseMove);
