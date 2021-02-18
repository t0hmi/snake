const keys = document.querySelectorAll(".controller_item");
const square = document.querySelector(".square");
const playAgain = document.querySelector('.gameOver_btn');

square.style.width = "6em";
square.style.top = "0px";
square.style.bottom = "0px";
square.style.left = "0px";
square.style.right = "0px";

const WIDTH = square.offsetWidth;
const SPEED = 25;
let POINTS = 0;
let seconds = 60;
let isFinish = false;
document.addEventListener("keydown", move);
document.addEventListener("keyup", removeClass);

playAgain.addEventListener('click',function(){
    location.reload();
})
/**
 *
 * @param {Event} e
 */
function move(e) {
  let key = e.key;
  let activeKey, circle;
  circle = document.querySelector(".circle");
  if (circle === null) {
    POINTS++;
    document.querySelector(".totalPoints span").textContent = POINTS;
    createCircle();
  }
  activeKey = findOneKey(key);
  squarePosition(key);
  removeCircleOnHover();
  activeKey.classList.add("controller_item-active");
}
/**
 *
 * @param {Event} e
 */
function removeClass(e) {
  let activeKey,
    key = e.key;
  activeKey = findOneKey(key);
  activeKey.classList.remove("controller_item-active");
}
/**
 *
 * @param {String} name
 */
function findOneKey(name) {
  let key,
    i = 0;
  while (i <= keys.length - 1) {
    key = keys[i];
    if (key.dataset.name === name) {
      return key;
    }
    i++;
  }
}
/**
 *
 * @param {String} direction
 */
function squarePosition(direction) {
  let value;
  switch (direction) {
    case "ArrowUp":
      value = parseInt(square.style.top.slice(0, square.style.top.length - 2));
      if (value - SPEED >= 0) {
        square.style.top = `${value - SPEED}px`;
      }

      break;
    case "ArrowDown":
      value = parseInt(square.style.top.slice(0, square.style.top.length - 2));
      if (value + SPEED + WIDTH <= window.innerHeight) {
        square.style.top = `${value + SPEED}px`;
      }

      break;
    case "ArrowLeft":
      value = parseInt(
        square.style.left.slice(0, square.style.left.length - 2)
      );
      if (value - SPEED >= 0) {
        square.style.left = `${value - SPEED}px`;
      }
      break;
    case "ArrowRight":
      value = parseInt(
        square.style.left.slice(0, square.style.left.length - 2)
      );
      if (value + WIDTH + SPEED <= window.innerWidth) {
        square.style.left = `${value + SPEED}px`;
      }

      break;

    default:
      break;
  }
}

/**
 * @returns {Object} coords
 */
function getRandomCoords() {
  let coords = {
    x: Number,
    y: Number,
  };

  let windowsWidth, windowHeight;
  windowsWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  coords.x = Math.round(Math.random() * windowsWidth);
  coords.y = Math.round(Math.random() * windowHeight);
  return coords;
}

/**
 * create a circle and add it into the DOM
 */
function createCircle() {
  let coords, circle;
  coords = getRandomCoords();
  circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.bottom = `${coords.y}px`;
  circle.style.left = `${coords.x}px`;
  document.body.appendChild(circle);
}

/**
 * remove the circle when the square is over  him
 */
function removeCircleOnHover() {
  let circle = document.querySelector(".circle");
  let circleCoords = circle.getBoundingClientRect();
  let squareCoords = square.getBoundingClientRect();
  if (
    circleCoords.x >= squareCoords.x - squareCoords.width / 2 &&
    circleCoords.x <= squareCoords.x + squareCoords.width / 2
  ) {
    if (
      circleCoords.y >= squareCoords.y - squareCoords.height / 2 &&
      circleCoords.y <= squareCoords.y + squareCoords.height / 2
    ) {
      circle.remove();
    }
  }
}

function passTime() {
  seconds = seconds - 1;
  document.querySelector(".timer span").textContent = seconds;
  console.log(seconds);
}

function controllerTime(timer){
    if(seconds > 0){
        passTime();
    }else{
        isFinish = true;
        gameOver();
    }
    
}
function finishCheck() {
  let timer;
  timer = setInterval(controllerTime, 1000);
  if(isFinish){
    clearInterval(timer);
  }
}

function gameOver(){
        document.querySelector('.gameOver').classList.add('gameOver-reveal');
        document.querySelector('.gameOver_score span').textContent = POINTS;
}



finishCheck();
createCircle();
