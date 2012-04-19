var nback = {},
    ROUNDS = 20,
    TIME_BETWEEN_ROUNDS = 3000,
    LIGHT_ON_FOR = 900,
    i, start, checkSameSpace;

nback.cells = document.getElementsByClassName('cell');
nback.nextCounter = 0;
nback.litCell = null;
nback.previous = [];
nback.current = null;
nback.n = 2;
nback.sameSpaceButton = document.getElementById('same-space');
nback.startButton = document.getElementById('start');
nback.pointsElement = document.getElementById('score');
nback.points = 10;

nback.removePoint = function () {
  nback.points -= 1;
};

nback.addPoint = function () {
  nback.points += 1;
};

nback.updatePoints = function () {
  nback.pointsElement.innerHTML = nback.points;
};

nback.lightElement = function (index) {
  var addClassTo = nback.cells[index];
  addClassTo.classList.add('lit');
  nback.litCell = addClassTo;
  if (nback.current) {
    nback.previous.push(nback.current);
  }
  nback.current = index;
};

nback.unlightElement = function () {
  if (nback.litCell) {
    nback.litCell.classList.remove('lit');
  }
};

nback.next = function () {
  nback.sameSpaceButton.disabled = false;
  nback.nextCounter += 1;
  var index = nback.queue.dequeue();
  nback.lightElement(index);
  setTimeout(nback.unlightElement, LIGHT_ON_FOR);
  if (nback.nextCounter >= ROUNDS) {
    nback.endGame();
  }
};

nback.startGame = function () {
  nback.queue = new Queue();
  for (i=0; i<ROUNDS; i++) {
    nback.queue.queue(Math.floor(Math.random() * 9));
  }
  nback.startButton.disabled = true;
  nback.updatePoints();
  nback.intervalId = window.setInterval(nback.next, TIME_BETWEEN_ROUNDS);
};

nback.endGame = function () {
  window.clearInterval(nback.intervalId);
  nback.startButton.disabled = false;
};

checkSameSpace = function () {
  nback.sameSpaceButton.disabled = true;
  console.log(nback.previous);
  console.log("current:" + nback.current);
  console.log("previous:"+  nback.previous[nback.previous.length - nback.n]);
  if (nback.current === nback.previous[nback.previous.length - nback.n]) {
    nback.addPoint();
  } else {
    nback.removePoint();
  }
  nback.updatePoints();
};

nback.sameSpaceButton.onclick = checkSameSpace;
nback.startButton.onclick = nback.startGame;
