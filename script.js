const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
//Item
const items = [
  { name: "chick", image: "./assets/chick.png" },
  { name: "crocodile", image: "./assets/crocodile.png" },
  { name: "duck", image: "./assets/duck.png" },
  { name: "elephant", image: "./assets/elephant.png" },
  { name: "gorilla", image: "./assets/gorilla.png" },
  { name: "hippo", image: "./assets/hippo.png" },
  { name: "narwhal", image: "./assets/narwhal.png" },
  { name: "owl", image: "./assets/owl.png" },
  { name: "parrot", image: "./assets/parrot.png" },
  { name: "penguin", image: "./assets/penguin.png" },
  { name: "sloth", image: "./assets/sloth.png" },
  { name: "zebra", image: "./assets/zebra.png" },
];
//Jenis Time
let seconds = 0,
  minutes = 0;
//Bnyak gerak
let movesCount = 0,
  winCount = 0;
//Timer
const timeGenerator = () => {
  seconds += 1;
//Jalan waktu
  if (seconds >= 60) {
    result.innerHTML = `<h2>Time Over</h2>
    <h4>You Reached Maximum Times</h4>`;
    stopGame();
  }
  //format time
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
//Hitung gerak
const movesCounter = () => {
  movesCount += 1;
//banyak gerak
  if (movesCount == 20) {
    result.innerHTML = `<h2>Game Over</h2>
    <h4>You Reached Maximum Moves</h4>`;
    stopGame();
  }
  //format gerak
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;

};

//Buat random card
const generateRandom = (size = 4) => {
  //item
  let tempArray = [...items];
  //nilai kartu
  let cardValues = [];
  //ukuran
  size = (size * size) / 2;
  //Random object 
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //hapus begitu ada lain kepilih
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //acak kartu
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //garis
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //kartu
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //kalo ga cocok
      if (!card.classList.contains("matched")) {
        //balik kartu
        card.classList.add("flipped");
        //kalo ga cocok juga
        if (!firstCard) {
          //posisi jadi balik
          firstCard = card;
          //jadi dibalik
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //masukin skor
          movesCounter();
          //kartu dua
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //kalau sama ga bisa lagi
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //ubah jadi ga bisa
            firstCard = false;
            //skor menang
            winCount += 1;
            //kalau skor setengah
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Win</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
            //kalau nga lanjut lagi
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  //tombol stop muncul
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //Hitung jumlah gerak
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//Stop 
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);
//Loading
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};