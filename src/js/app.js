const fields = document.querySelectorAll('.board__item');
const infoBoard = document.querySelector('.infoBoard');
const resetBtn = document.querySelectorAll('.reset');
const board = document.querySelector('.board');
const title = document.querySelector('.title');
const startView = document.querySelector('.startView');
const gameView = document.querySelector('.gameView');

let activePlayer = 'X';
infoBoard.innerHTML = `Now play: ${activePlayer}`;

let gameActive = true;

let fieldsArray = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

const displayWinningMessage = () => {
  infoBoard.innerHTML = `Congratulations ${activePlayer === 'X' ? (activePlayer = 'O') : (activePlayer = 'X')}! You won!`;
};

const displayTieMessage = () => {
  infoBoard.innerHTML = `Tie!`;
};

const displayActivePlayer = () => {
  activePlayer = activePlayer === 'X' ? 'O' : 'X';
  infoBoard.innerHTML = `Now play: ${activePlayer}`;
};

const displayResetBtn = () => {
  resetBtn.forEach(btn => btn.classList.remove('offscreen'));
};

const isBoardFull = () => {
  return fieldsArray.find(field => field === '') === undefined;
};

validateGame = () => {
  let gameWon = false;
  for (let i = 0; i <= 7; i++) {
    const [posA, posB, posC] = winningConditions[i];
    const value1 = fieldsArray[posA];
    const value2 = fieldsArray[posB];
    const value3 = fieldsArray[posC];
    if (value1 !== '' && value1 === value2 && value1 === value3) {
      gameWon = true;
      break;
    }
  }
  if (gameWon) {
    gameActive = false;
    displayWinningMessage();
    displayResetBtn();
  } else if (isBoardFull()) {
    gameActive = false;
    displayTieMessage();
    displayResetBtn();
  }
};

fields.forEach(field => {
  field.addEventListener('click', e => {
    const { index } = e.target.dataset;
    if (gameActive && fieldsArray[index] === '') {
      fieldsArray[index] = activePlayer;
      e.target.innerHTML = `${activePlayer}`;
      displayActivePlayer();
      validateGame();
    }
  });
});

resetBtn.forEach(btn =>
  btn.addEventListener('click', () => {
    fields.forEach(field => {
      field.innerHTML = '';
    });
    fieldsArray = ['', '', '', '', '', '', '', '', ''];
    activePlayer = 'X';
    infoBoard.innerHTML = `Now play: ${activePlayer}`;
    gameView.classList.remove('offscreen');
    startView.classList.add('offscreen');
    resetBtn.forEach(btn => btn.classList.add('offscreen'));
    gameActive = true;
  })
);
