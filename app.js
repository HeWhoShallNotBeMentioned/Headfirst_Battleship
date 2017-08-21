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
}

};

var controller = {
  guesses: 0,

  processGuess: function(guess) {
    var alphabet = ["A","B","C","D","E","F","G"];

    if (guess === null || guess.length !== 2) {
      alert("Opps, please enter a letter and numbe on the board.");
    } else {
      var firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board");
      } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardsize) {
        alert("Oops,that's off the board!");
      }
    }
  }
};


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
