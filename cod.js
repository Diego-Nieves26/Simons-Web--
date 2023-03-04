// Variables del DOM
const colors = document.querySelectorAll(".color");

// Variables de logica
let computerSelection = [];
let userSelection = [];
let round = 0;

// TIMER
var timer;
var ele = document.getElementById("timer");

const initTimer = () => {
  var sec01 = 0;
  var sec02 = 0;
  var min01 = 0;
  var min02 = 0;
  console.log("om")

  timer = setInterval(() => {
    if (sec02 == 10) {
      sec01++;
      sec02 = 0;
    }
    if (sec01 == 6) {
      min02++;
      sec01 = 0;
    }
    if (min02 == 10) {
      min01++;
      min02 = 0;
    }
    ele.innerHTML = min01 + "" + min02 + " : " + sec01 + "" + sec02;
    sec02++;
  }, 1000);
}

// Presionar boton "Iniciar"
const startGame = () => {
  stateReset();
  initTimer()
  start();
};

// Iniciar logica
const start = () => {
  document.querySelector("#turn_text").style.color = "rgb(0, 245, 0)";
  updateInfoText("PC", "#turn_text");
  disableUserColor();
  
  // ---------------------------------------
  const newColor = colors[getRandomIndex()];
  computerSelection.push(newColor);
  const userTurnDelay = (computerSelection.length + 1) * 1000;
  
  // ---------------------------------------
  computerSelection.forEach((color, index) => {
    const delay = (index + 1) * 900;

    setTimeout(() => {
      highlightColor(color);
    }, delay);
  });

  // --------------------------------------
  setTimeout(() => {
    updateInfoText("Jugador", "#turn_text");
    enableUserColor();
  }, userTurnDelay);

  // --------------------------------------
  userSelection = [];
  round++;
  updateInfoText(round, "#num_text");
};

// Indice aleatorio
const getRandomIndex = () => {
  return (index = Math.floor(Math.random() * 4));
};

// Actualizar informacion del juego
const updateInfoText = (text, infoId) => {
  document.querySelector(infoId).textContent = text;
};

// Resetear estado
const stateReset = () => {
  computerSelection = [];
  userSelection = [];
  round = 0;
};

// Resaltar color
const highlightColor = (color) => {
  color.style.filter = "brightness(170%)";
  color.style.opacity = "1";

  setTimeout(() => {
    color.style.opacity = "0.4";
  }, 400);
};

// Seleccionar color
const checkUserSelection = (e) => {
  const color = e.target;
  highlightColor(color);
  userSelection.push(color);

  const computerColor = computerSelection[userSelection.length - 1];
  if (color.id !== computerColor.id) {
    alert("Perdiste");
    return;
  }

  if (userSelection.length === computerSelection.length) {
    disableUserColor();
    setTimeout(start, 1000);
  }
};

// Deshabilitar "click" de los colores
const disableUserColor = () => {
  colors.forEach((e) => {
    e.onclick = "";
  });
};

// Habilitar "click" de los colores
const enableUserColor = () => {
  colors.forEach((e) => {
    e.onclick = checkUserSelection;
  });
};

// Cargar pagina
document.addEventListener("DOMContentLoaded", () => {
  updateInfoText("Pesione INICIAR", "#turn_text");
  updateInfoText("---", "#num_text");
});
