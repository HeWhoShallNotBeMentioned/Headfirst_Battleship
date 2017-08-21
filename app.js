var view = {
  displayMessage: function(msg) {
    var messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = msg;
  },

  displayHit: function(location) {
    var hitHTML = document.getElementById(location);
    hitHTML.classList.add("hit");
    //book uses setAttribute
  },

  displayMiss: function(location) {
    var missHTML = document.getElementById(location);
    missHTML.classList.add("miss");
    //book uses setAttribute
  }

};

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [{
    locations: ["06", "16", "26"], hits: ["","",""]
  },

  {
    locations: ["24", "34", "44"], hits: ["","",""]
  },
   {
    locations: ["10", "11", "12"], hits: ["","",""]
  }],

  fire: function (guess) {

    for (var j = 0; j < this.numShips; j++) {
      var ship = this.ships[j];
      var index = ship.locations.indexOf(guess);
      if (index >= 0){
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("Hit!");
        if(this.isSunk(ship)) {
          view.displayMessage("You sank my Battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed. Haaa Haaaa!");
    return false;
  },

  isSunk: function (ship) {
    for (var j = 0; j < this.shipLength; j++) {
      if (ship.hits[j] !== "hit"){
        return false;
      }
    }
    return true;
  },

  generateShipLocations: function(){
    var locations;
    for (var j = 0; j < this.numShips; j++){
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships(j).locations = locations;
    }
  },

  generateShip: function () {
    var direction = Math.floor(Math.random() * 2);
    var row;
    var col;
    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * this.boardSize - (this.shipLength + 1));
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * this.boardSize - (this.shipLength + 1));
    }

    var newShipLocations = [];
    for (var j = 0; j < this.shipLength; j++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + j));
      } else {
        newShipLocations.push((row + j) + "" + col);
      }
    }
    return newShipLocations;
  }

};

function parseGuess(guess) {
  var alphabet = ["A","B","C","D","E","F","G"];

  if (guess === null || guess.length !== 2) {
    alert("Opps, please enter a letter and numbe on the board.");
  } else {
    var firstChar = guess.charAt(0).toUpperCase();
    var row = alphabet.indexOf(firstChar);
    var column = guess.charAt(1);

    if (isNaN(row) || isNaN(column)) {
      alert("Oops, that isn't on the board");
    } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
      alert("Oops,that's off the board!");
    } else {
      return row + column;
    }
  }
  return null;
}

var controller = {
  guesses: 0,

  processGuess: function(guess){
    var location = parseGuess(guess);
    if(location){
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");
        formDisplay = document.getElementById("inputForm");
        formDisplay.style.display = 'none';
      }
    }
  }
};

function handleFireButton () {
  var guessInput = document.getElementById("guessInput");
  var guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

function init () {
  var fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  var guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
}

function handleKeyPress (e) {
  //console.log(e);
  var fireButton = document.getElementById("fireButton");
  if(e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;

/*
Testing if view works
view.displayMiss("00");
view.displayMiss("64");
view.displayMiss("26");
view.displayHit("41");
view.displayHit("56");
view.displayHit("32");
view.displayMessage('Tap...tap...Is this thing on?');
*/

/*Testing model*/
// model.fire("53");
//
// model.fire("06");
// model.fire("16");
// model.fire("26");
//
// model.fire("34");
// model.fire("24");
// model.fire("44");
//
// model.fire("12");
// model.fire("11");
// model.fire("10");

//Testing parseGuess
// controller.processGuess("A0");
// controller.processGuess("B6");
// controller.processGuess("A6");
// controller.processGuess("C6");
// controller.processGuess("C4");
// controller.processGuess("D4");
// controller.processGuess("E4");
// controller.processGuess("B0");
// controller.processGuess("B1");
// controller.processGuess("B2");
