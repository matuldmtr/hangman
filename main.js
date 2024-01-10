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
  startBtn.addEventListener("click", startGame);
};

const hideModal = () => {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";
};

window.addEventListener("load", init);

const startGame = () => {
  const body = document.querySelector("body");

  body.innerHTML = `
  <div class="container">
    <div class="hangman-box">
      <img src="images/hangman-0.svg" alt="hangman-image" />
      <h1>Hangman game</h1>
    </div>
    <div class="game-box">
      <ul class="word">
        <li class="word-letter"></li>
        <li class="word-letter guessed">A</li>
        <li class="word-letter"></li>
        <li class="word-letter"></li>
        <li class="word-letter"></li>
      </ul>
      <h4 class="hint">
        Hint:
        <b
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
          unde.</b
        >
      </h4>
      <h4 class="guesses">Incorect guesses: <b>0 / 6</b></h4>
      <div class="keyboard">
        <button>a</button>
        <button>b</button>
      </div>
    </div>
  </div>
  `;
};
