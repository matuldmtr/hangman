import wordsList from "./words-list.json" assert { type: "json" };

const showStartModal = () => {
  const body = document.querySelector("body");

  body.innerHTML = `
    <div class="modal">
      <button id="start">Start Game</button>
    </div>`;
};

window.addEventListener("load", showStartModal);

// finctional

const init = () => {
  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", hideModal);
  startBtn.addEventListener("click", showMainContent);
  startBtn.addEventListener("click", generateKeybord);
  startBtn.addEventListener("click", generateRandomWord);
};

const hideModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};

window.addEventListener("load", init);

const showMainContent = () => {
  const body = document.querySelector("body");

  body.innerHTML = `
  <div class="container">
    <div class="hangman-box">
      <img src="images/hangman-0.svg" alt="hangman-image" />
      <h1>Hangman game</h1>
    </div>
    <div class="game-box">
      <ul class="word"></ul>
      <h4 class="hint">Hint: <b></b>
      </h4>
      <h4 class="guesses">Incorect guesses: <b>0 / 6</b></h4>
      <div class="keyboard"></div>
    </div>
  </div>
  `;
};

const generateKeybord = () => {
  const keybord = document.querySelector(".keyboard");

  for (let i = 97; i <= 122; i += 1) {
    keybord.innerHTML += `<button>${String.fromCharCode(i)}</button>`;
  }
};

const generateRandomWord = () => {
  let randomIndex = Math.floor(Math.random() * wordsList.length);
  const { word, hint } = wordsList[randomIndex];

  const wordText = document.querySelector(".word");
  const hintText = document.querySelector(".hint b");

  wordText.innerHTML = word
    .split("")
    .map(() => `<li class="word-letter"></li>`)
    .join("");

  hintText.innerText = hint;

  // console.log(word);
  // console.log(hint);
};
