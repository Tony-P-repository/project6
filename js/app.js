// jscs:disable validateLineBreaks
// jscs:disable validateQuoteMarks
// jscs:disable disallowMultipleLineBreaks
// jscs:disable requirePaddingNewLinesBeforeLineComments
// jscs:disable requireTrailingComma
// jscs:disable requirePaddingNewLinesAfterBlocks
/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================================= */
  /*              Declarations                     */
  /* ============================================= */

  let missed = 0;
  const phrases = [
    "hit for six",
    "easy does it",
    "bite the bullet",
    "lame duck",
    "pass the buck",
    "charm offensive",
    "tall story"
  ];

  function getRandomPhraseAsArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function addPhrasetoDisplay(phrase) {
    for (char in phrase) {
      const li = document.createElement("li");
      const divA = document.createElement("div");
      const divB = document.createElement("div");
      li.appendChild(divA);
      li.appendChild(divB);
      divA.textContent = phrase[char];
      divA.classList.add("a");
      divB.classList.add("b");
      if (phrase[char] !== String.fromCharCode(32)) {
        li.classList.add("letter");
      }
      displayedPhrase.children[0].appendChild(li);
    }
  }

  function checkLetter(button) {
    const char = button.textContent.toLowerCase();
    const lis = displayedPhrase.children[0].children;
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
      lossOverlay.classList.remove("hidden");
    }
  }

  function clearPhraseDisplay() {
    const phraseLis = displayedPhrase.querySelectorAll("li");
    for (let i = 0; i < phraseLis.length; i++) {
      phraseLis[i].remove();
    }
  }

  function clearScoreboard() {
    const tries = scoreboard.querySelectorAll("li.tries");
    for (let i = 0; i < tries.length; i++) {
      tries[i].children[0].src = "images/liveHeart.png";
    }
  }

  function clearQwerty() {
    const buttons = qwerty.querySelectorAll("button.chosen");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("chosen");
      buttons[i].disabled = null;
    }
  }

  /* ============================================= */
  /*              Selectors                        */
  /* ============================================= */

  const mainContainer = document.querySelector("div.main-container");
  const qwerty = document.querySelector("#qwerty");
  const displayedPhrase = document.querySelector("#phrase");
  const scoreboard = document.querySelector("#scoreboard");
  const startOverlay = document.querySelector("div.start");
  const winOverlay = document.querySelector("div.win");
  const lossOverlay = document.querySelector("div.lose");

  /* ============================================= */
  /*              Event handlers                   */
  /* ============================================= */

  mainContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn__reset")) {
      startOverlay.classList.add("hidden");
      lossOverlay.classList.add("hidden");
      winOverlay.classList.add("hidden");
      const phraseArray = getRandomPhraseAsArray(phrases);
      clearPhraseDisplay();
      clearQwerty();
      clearScoreboard();
      addPhrasetoDisplay(phraseArray);
      missed = 0;
    }
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
