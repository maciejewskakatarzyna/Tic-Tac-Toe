"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fields = document.querySelectorAll('.board__item');
var infoBoard = document.querySelector('.game__infoBoard');
var resetBtn = document.querySelectorAll('.button');
var board = document.querySelector('.board');
var title = document.querySelector('.game__title');
var startView = document.querySelector('.game__startView');
var gameView = document.querySelector('.game__gameView');
var activePlayer = 'X';
infoBoard.innerHTML = "Now play: ".concat(activePlayer);
var gameActive = true;
var fieldsArray = ['', '', '', '', '', '', '', '', ''];
var winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

var displayWinningMessage = function displayWinningMessage() {
  infoBoard.innerHTML = "Congratulations ".concat(activePlayer === 'X' ? activePlayer = 'O' : activePlayer = 'X', "! You won!");
};

var displayTieMessage = function displayTieMessage() {
  infoBoard.innerHTML = "Tie!";
};

var displayActivePlayer = function displayActivePlayer() {
  activePlayer = activePlayer === 'X' ? 'O' : 'X';
  infoBoard.innerHTML = "Now play: ".concat(activePlayer);
};

var displayResetBtn = function displayResetBtn() {
  resetBtn.forEach(function (btn) {
    return btn.classList.remove('offscreen');
  });
};

var isBoardFull = function isBoardFull() {
  return fieldsArray.find(function (field) {
    return field === '';
  }) === undefined;
};

validateGame = function validateGame() {
  var gameWon = false;

  for (var i = 0; i <= 7; i++) {
    var _winningConditions$i = _slicedToArray(winningConditions[i], 3),
        posA = _winningConditions$i[0],
        posB = _winningConditions$i[1],
        posC = _winningConditions$i[2];

    var value1 = fieldsArray[posA];
    var value2 = fieldsArray[posB];
    var value3 = fieldsArray[posC];

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

fields.forEach(function (field) {
  field.addEventListener('click', function (e) {
    var index = e.target.dataset.index;

    if (gameActive && fieldsArray[index] === '') {
      fieldsArray[index] = activePlayer;
      e.target.innerHTML = "".concat(activePlayer);
      displayActivePlayer();
      validateGame();
    }
  });
});
resetBtn.forEach(function (btn) {
  return btn.addEventListener('click', function () {
    fields.forEach(function (field) {
      field.innerHTML = '';
    });
    fieldsArray = ['', '', '', '', '', '', '', '', ''];
    activePlayer = 'X';
    infoBoard.innerHTML = "Now play: ".concat(activePlayer);
    gameView.classList.remove('offscreen');
    startView.classList.add('offscreen');
    resetBtn.forEach(function (btn) {
      return btn.classList.add('offscreen');
    });
    gameActive = true;
  });
});