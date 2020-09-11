const fields = document.querySelectorAll('.board__item');
const resultBoard = document.querySelector('.resultBoard');
const resetBtn = document.querySelector('.reset');
const board = document.querySelector('.board');
const title = document.querySelector('.title');

let activePlayer = 'X';
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

const displayGameResult = () => {
  resultBoard.classList.remove('offscreen');
  resultBoard.innerText = `Congratulations ${activePlayer}! You won!`;
};

const displayResetBtn = () => {
  resetBtn.classList.remove('offscreen');
};

validateGame = () => {
  for (let i = 0; i <= 7; i++) {
    const [posA, posB, posC] = winningConditions[i];
    const value1 = fieldsArray[posA];
    const value2 = fieldsArray[posB];
    const value3 = fieldsArray[posC];
    if (value1 !== '' && value1 === value2 && value1 === value3) {
      gameActive = false;
      displayGameResult();
      displayResetBtn();
    }
  }
};

fields.forEach(field => {
  field.addEventListener('click', e => {
    const { index } = e.target.dataset;
    if (gameActive && fieldsArray[index] === '') {
      fieldsArray[index] = activePlayer;
      e.target.innerHTML = `${activePlayer}`;
      validateGame();
      activePlayer = activePlayer === 'X' ? 'O' : 'X';
    }
  });
});

resetBtn.addEventListener('click', () => {
  fields.forEach(field => {
    field.innerHTML = '';
  });
  fieldsArray = ['', '', '', '', '', '', '', '', ''];
  activePlayer = 'X';
  board.classList.remove('offscreen');
  resultBoard.classList.add('offscreen');
  resetBtn.classList.add('offscreen');
  title.classList.add('offscreen');
  gameActive = true;
});
