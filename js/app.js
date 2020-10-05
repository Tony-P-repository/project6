// jscs:disable validateLineBreaks
// jscs:disable validateQuoteMarks
// jscs:disable disallowMultipleLineBreaks
// jscs:disable requirePaddingNewLinesBeforeLineComments
// jscs:disable requireTrailingComma
// jscs:disable requirePaddingNewLinesAfterBlocks
/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", () => {

  let missed = 0;
  const phrases = [
    "hit for six",
    "easy does it",
    "bite the bullet",
    "lame duck",
    "pass the buck",
    "up the pole",
    "charm offensive",
    "tall story"
  ];

  function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function addPhrasetoDisplay(phrase) {
    for (char in phrase) {
      const li = document.createElement("li");
      li.textContent = phrase[char];
      if (phrase[char] !== String.fromCharCode(32)) {
        li.classList.add("letter");
      }
      displayedPhrase.appendChild(li);
    }
  }

  function checkLetter(button) {
    const char = button.textContent.toLowerCase();
    const lis = displayedPhrase.children;
    let found = false;
    for (let i = 0; i < lis.length; i++) {
      if (char === lis[i].textContent) {
        lis[i].classList.add("show");
        found = true;
      }
    }
    if (found) {
      return char;
    } else {
      return null;
    }
  }

  function checkWin() {
    const numLetters = displayedPhrase.querySelectorAll("li.letter").length;
    const numShown = displayedPhrase.querySelectorAll("li.show").length;
    if (numLetters === numShown) {
      window.setTimeout(() => {
        winOverlay.classList.remove("hidden");
      }, 1000);
    } else if (missed >= 5) {
      window.setTimeout(() => {
        lossOverlay.classList.remove("hidden");
      }, 1000);
    }
  }

  /* ============================================= */
  /*              Selectors                        */
  /* ============================================= */

  const qwerty = document.querySelector("#qwerty");
  const displayedPhrase = document.querySelector("#phrase");
  const startButton = document.querySelector("a.btn__reset");
  const scoreboard = document.querySelector("#scoreboard");
  const startOverlay = document.querySelector("div#overlay");
  const winOverlay = document.querySelector("div.win");
  const lossOverlay = document.querySelector("div.lose");

  /* ============================================= */
  /*              Event handlers                   */
  /* ============================================= */

  startButton.addEventListener("click", () => {
    startOverlay.style.display = "none";

    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);
  });

  qwerty.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const button = event.target;
      button.classList.add("chosen");
      button.disabled = true;
      const letterFound = checkLetter(button);
      if (!letterFound) {
        missed++;
        const tries = scoreboard.querySelectorAll("li.tries");
        tries[5 - missed].children[0].src = "images/lostHeart.png";
      }
      checkWin();
    }
  });

});
