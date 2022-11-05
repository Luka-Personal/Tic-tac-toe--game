// all variables
const gameEventBOX = document.querySelector(`.game-main`);
const checkedEventBOX = document.querySelectorAll(`.box`);
const activeHeading = document.querySelector(`.heading`);
const resetBTN = document.querySelector(`button`);
// ########################################################################################################
class App {
  #activePlayer = 0;
  #winnerState = 0;
  #boxFilled = 0;
  constructor() {
    gameEventBOX.addEventListener(`click`, this._gameLogic.bind(this));
    resetBTN.addEventListener(`click`, this._init.bind(this));
    this._init();
  }
  _init() {
    gameEventBOX.style.boxShadow = `0 0 30px 10px rgba(0, 0, 0, 0.2)`;
    activeHeading.textContent = `Active Player: 0`;
    checkedEventBOX.forEach((el) => {
      el.innerHTML = ``;
      el.classList.remove(`p-0`);
      el.classList.remove(`p-1`);
    });
    gameEventBOX.style.pointerEvents = `all`;
    this.#activePlayer = 0;
    this.#boxFilled = 0;
    this.#winnerState = 0;
  }
  _displayActive() {
    activeHeading.textContent = `Active Player: ${this.#activePlayer ? 0 : 1}`;
  }
  _endGame() {
    gameEventBOX.style.boxShadow = `0 0 30px 10px rgba(0, 0, 0, 0.7)`;
    gameEventBOX.style.pointerEvents = `none`;
    resetBTN.style.pointerEvents = `all`;
  }
  _gameLogic(e) {
    const targetBOX = e.target.closest(`.box`);
    // we use these two states, to check if box has already been checked(or crossed)
    const stateOne = !e.target.classList.contains(`p-0`);
    const stateTwo = !e.target.classList.contains(`p-1`);
    if (this.#activePlayer === 0 && stateOne && stateTwo) {
      targetBOX.classList.add(`p-0`);
      targetBOX.innerHTML = `<ion-icon class="icons" name="checkmark-outline"></ion-icon>`;
      this._callAllFunc();
      this.#activePlayer = 1;
    } else if (stateOne && stateTwo) {
      targetBOX.classList.add(`p-1`);
      targetBOX.innerHTML = `<ion-icon class="icons" name="close-outline"></ion-icon>`;
      this._callAllFunc();
      this.#activePlayer = 0;
    }
  }
  _callAllFunc() {
    this.#boxFilled++;
    this._displayActive();
    this._winnerLogic(`p-0`);
    this._winnerLogic(`p-1`);
  }
  _winnerLogic(pl) {
    if (this._checkClass(0, pl) && this._checkClass(1, pl) && this._checkClass(2, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(3, pl) && this._checkClass(4, pl) && this._checkClass(5, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(6, pl) && this._checkClass(7, pl) && this._checkClass(8, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(0, pl) && this._checkClass(3, pl) && this._checkClass(6, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(1, pl) && this._checkClass(4, pl) && this._checkClass(7, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(2, pl) && this._checkClass(5, pl) && this._checkClass(8, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(0, pl) && this._checkClass(4, pl) && this._checkClass(8, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this._checkClass(2, pl) && this._checkClass(4, pl) && this._checkClass(6, pl)) {
      this._displayGameState();
      this.#winnerState = 1;
    } else if (this.#boxFilled === 9) {
      this._displayGameState();
    }
  }
  _displayGameState() {
    if (this.#boxFilled === 9 && this.#winnerState === 0) {
      activeHeading.textContent = `DRAW`;
    } else {
      activeHeading.textContent = `Winner Player: ${this.#activePlayer}`;
    }
    this._endGame();
  }
  _checkClass(num, pl) {
    return checkedEventBOX[num].classList.contains(pl);
  }
  _endGame() {
    gameEventBOX.style.boxShadow = `0 0 30px 10px rgba(0, 0, 0, 0.7)`;
    gameEventBOX.style.pointerEvents = `none`;
    resetBTN.style.pointerEvents = `all`;
  }
}
const app = new App();
