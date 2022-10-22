// all variables
const gameEventBOX = document.querySelector(`.game-main`);
const checkedEventBOX = document.querySelectorAll(`.box`);
const activeHeading = document.querySelector(`.heading`);
const resetBTN = document.querySelector(`button`);
// ########################################################################################################
// declarations
let activePlayer = 0;
let fillcounter = 0;
// ########################################################################################################
// init
const init = function () {
  gameEventBOX.style.boxShadow = `0 0 30px 10px rgba(0, 0, 0, 0.2)`;
  fillcounter = 0;
  activeHeading.textContent = `Active Player: 0`;
  activePlayer = 0;
  checkedEventBOX.forEach((el) => {
    el.innerHTML = ``;
    el.classList.remove(`p-0`);
    el.classList.remove(`p-1`);
  });
  gameEventBOX.style.pointerEvents = `all`;
};
// ########################################################################################################
// function to check if p-0 or p-1 class is present in (checkedEventBOX)
const checkClass = (num, pl) => checkedEventBOX[num].classList.contains(pl);
// ########################################################################################################
// call all functions(and counter) related to winner checking
const callAllFunc = () => {
  fillcounter++; // if this gets to 9, that means all box-es in 3x3 square is filled :)
  displayGame(activePlayer);
  checkWinner(`p-0`);
  checkWinner(`p-1`);
};
// ########################################################################################################
// end the game(runs after winning)
const endGame = () => {
  gameEventBOX.style.boxShadow = `0 0 30px 10px rgba(0, 0, 0, 0.7)`;
  gameEventBOX.style.pointerEvents = `none`;
  if (fillcounter === 9) activeHeading.textContent = `DRAW`;
};
// ########################################################################################################
// display game state
const displayGame = (state) => {
  if (state !== 3) {
    activeHeading.textContent = `Active Player: ${activePlayer ? 0 : 1}`;
  } else {
    activeHeading.textContent = `Winner Player: ${activePlayer}`;
    endGame();
  }
};
// ########################################################################################################
// self explanatory, checks the winner player
const checkWinner = function (pl) {
  console.log(fillcounter);
  if (fillcounter !== 9) {
    if (checkClass(0, pl) && checkClass(1, pl) && checkClass(2, pl)) {
      displayGame(3);
    } else if (checkClass(3, pl) && checkClass(4, pl) && checkClass(5, pl)) {
      displayGame(3);
    } else if (checkClass(6, pl) && checkClass(7, pl) && checkClass(8, pl)) {
      displayGame(3);
    } else if (checkClass(0, pl) && checkClass(3, pl) && checkClass(6, pl)) {
      displayGame(3);
    } else if (checkClass(1, pl) && checkClass(4, pl) && checkClass(7, pl)) {
      displayGame(3);
    } else if (checkClass(2, pl) && checkClass(5, pl) && checkClass(8, pl)) {
      displayGame(3);
    } else if (checkClass(0, pl) && checkClass(4, pl) && checkClass(8, pl)) {
      displayGame(3);
    } else if (checkClass(2, pl) && checkClass(4, pl) && checkClass(6, pl)) {
      displayGame(3);
    }
  } else {
    endGame(fillcounter);
  }
};
// ########################################################################################################
// add event listener to all 9 boxes
gameEventBOX.addEventListener(`click`, function (e) {
  const targetBOX = e.target.closest(`.box`);
  // we use these two states, to check if box has already been checked(or crossed)
  const stateOne = !e.target.classList.contains(`p-0`);
  const stateTwo = !e.target.classList.contains(`p-1`);
  if (activePlayer === 0 && stateOne && stateTwo) {
    targetBOX.classList.add(`p-0`);
    targetBOX.innerHTML = `<ion-icon class="icons" name="checkmark-outline"></ion-icon>`;
    callAllFunc();
    activePlayer = 1;
  } else if (stateOne && stateTwo) {
    targetBOX.classList.add(`p-1`);
    targetBOX.innerHTML = `<ion-icon class="icons" name="close-outline"></ion-icon>`;
    callAllFunc();
    activePlayer = 0;
  }
});
// ########################################################################################################
resetBTN.addEventListener(`click`, init);
