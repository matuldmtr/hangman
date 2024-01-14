import wordsList from "./words-list.json" assert { type: "json" };

let currentWord;
let wrongGuessCount = 0;
const maxGuesses = 6;
let correctLetters = [];

const showStartModal = () => {
  const body = document.querySelector("body");

  body.innerHTML += `
    <div class="modal">
      <h4>Hungman</h4>
      <button id="start" class="modal-btn">Start Game</button>
    </div>`;
};

window.addEventListener("load", showStartModal);

// finctional

const init = () => {
  const startBtn = document.getElementById("start");
  startBtn.addEventListener("click", () => {
    hideModal();
    showMainContent();
    generateKeybord();
    startGame();
    // playAgain();
  });
};

window.addEventListener("load", init);

const hideModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};

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

    <div class="modal-finish hide">
      <div class="modal-wrap">
        <img src="images/loss.gif" alt="" />
        <h4>Game Over!</h4>
        <p>The correct word was: <b>kurwa</b></p>
        <button id="play-again" class="modal-btn">Play again</button>
      </div>
    </div>
  </div>
  `;
};

const generateKeybord = () => {
  const keybord = document.querySelector(".keyboard");

  for (let i = 97; i <= 122; i += 1) {
    keybord.innerHTML += `<button value="${String.fromCharCode(
      i
    )}">${String.fromCharCode(i)}</button>`;
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

  currentWord = word.toLowerCase();
};

const restartGame = () => {
  const modal = document.querySelector(".modal-finish");
  const hungmanImage = document.querySelector(".hangman-box img");
  const guessesText = document.querySelector(".guesses b");
  const keybordBtns = document.querySelectorAll(".keyboard button");

  modal.classList.add("hide");
  wrongGuessCount = 0;
  correctLetters = [];
  hungmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keybordBtns.forEach((btn) => (btn.disabled = false));
};

const startGame = () => {
  const keybordBtns = document.querySelectorAll(".keyboard button");
  const wordText = document.querySelector(".word");
  const guessesText = document.querySelector(".guesses b");
  const hungmanImage = document.querySelector(".hangman-box img");

  restartGame();
  generateRandomWord();

  keybordBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let currentLetter = e.target.value;
      console.log(correctLetters, wrongGuessCount);

      if (currentWord.includes(currentLetter)) {
        [...currentWord].forEach((letter, index) => {
          if (letter === currentLetter) {
            correctLetters.push(letter);
            wordText.querySelectorAll("li")[index].innerText = letter;
            wordText.querySelectorAll("li")[index].classList.add("guessed");
          }
        });
      } else {
        wrongGuessCount += 1;
        hungmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
      }
      btn.disabled = true;
      guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

      if (wrongGuessCount === maxGuesses) return gameOver(false);
      if (correctLetters.length === currentWord.length) return gameOver(true);
    });
  });
};

const gameOver = (isWin) => {
  const modal = document.querySelector(".modal-finish");
  const madalImg = document.querySelector(".modal-wrap img");
  const title = document.querySelector(".modal-wrap h4");
  const text = document.querySelector(".modal-wrap p");

  const modalImgSrc = isWin ? "images/win.gif" : "images/loss.gif";
  const titleText = isWin ? "Congratulations , you win!!" : "Sorry, you loss!!";
  const modalText = isWin ? "You found the word:" : "The correct word was:";

  setTimeout(() => {
    modal.classList.remove("hide");
    madalImg.src = modalImgSrc;
    title.innerText = titleText;
    text.innerHTML = `${modalText} <b>${currentWord}</b>`;
  }, 300);
};

const playAgain = () => {
  const playAgainBtn = document.getElementById("play-again");
  playAgainBtn.addEventListener("click", () => startGame());
};
