var nback = {},
    ROUNDS = 20,
    TIME_BETWEEN_ROUNDS = 3000,
    // This must be less than TIME_BETWEEN_ROUNDS
    LIGHT_ON_FOR = 900,
    i, start, checkSameSpace;

// This is how many turns back you will have to remember!
nback.n = 2;

// What round it is
nback.round = 0;

// Which cell is lit
nback.litCell = null;

// Keep track of the lights in the game
nback.previous = [];

// Current index, could probably replace nback.litCell
nback.current = null;

// player points
nback.points = 10;

nback.cells = document.getElementsByClassName('cell');
nback.sameSpaceButton = document.getElementById('same-space');
nback.startButton = document.getElementById('start');
nback.pointsElement = document.getElementById('score');

// There must be punishment for a wrong answer
nback.removePoint = function () {
  nback.points -= 1;
};

// But there are also rewards for a correct answer!
nback.addPoint = function () {
  nback.points += 1;
};

// Display the current points
nback.updatePoints = function () {
  nback.pointsElement.innerHTML = nback.points;
};

// Add the lit class to a cell
nback.lightElement = function (index) {

  // Get the cell to add the lit class to
  var addClassTo = nback.cells[index];
  addClassTo.classList.add('lit');

  // Save this cell as the litCell
  nback.litCell = addClassTo;

  // Keep track of the previous cells
  nback.current = index;
  nback.previous.push(nback.current);
};

// Remove the lit class from a cell
nback.unlightElement = function () {
  // Ensure there is a lit cell
  if (nback.litCell) {
    nback.litCell.classList.remove('lit');
  }
};

nback.next = function () {
  var index;

  // Turn off the button so we can't get mass button spam
  nback.sameSpaceButton.disabled = false;

  // increase the round
  nback.round += 1;

  // Get the next cell to light up
  index = nback.queue.dequeue();
  nback.lightElement(index);

  // Wait a bit and turn off the light
  setTimeout(nback.unlightElement, LIGHT_ON_FOR);

  // End the game after ROUNDS rounds
  if (nback.round >= ROUNDS) {
    nback.endGame();
  }
};

// Setup function
nback.startGame = function () {

  // Make a new game
  nback.queue = new Queue();
  for (i=0; i<ROUNDS; i++) {

    // Populate with random data, less fun than created games
    // but this is way easier to program.
    nback.queue.queue(Math.floor(Math.random() * 9));
  }
  
  // There is no going back!
  nback.startButton.disabled = true;

  // Show the points
  nback.updatePoints();

  // Run the game loop every TIME_BETWEEN_ROUNDS
  nback.intervalId = window.setInterval(nback.next, TIME_BETWEEN_ROUNDS);
};

// Teardown function
nback.endGame = function () {

  // End the game loop
  window.clearInterval(nback.intervalId);

  // Enable the start button for more awesome gamage!
  nback.startButton.disabled = false;
};

// Logic to see if the current light is the same as the light nback.n turns ago
checkSameSpace = function () {

  // Only click the button once per round
  nback.sameSpaceButton.disabled = true;
  
  // length - 1 = last element (aka current light)
  // current light - nback.n = light n turns ago
  if (nback.current === nback.previous[nback.previous.length - 1 - nback.n]) {
    nback.addPoint();
  } else {
    nback.removePoint();
  }
  nback.updatePoints();
};

// onclick handlers
nback.sameSpaceButton.onclick = checkSameSpace;
nback.startButton.onclick = nback.startGame;
