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
    var locations = ship.locations;
    var index = locations.indexOf(guess);
    if (index >= 0){
      ship.hits[index] = "hit";
      return true;
    }    
  }
  return false;
}

};

//Testing if view works
// view.displayMiss("00");
// view.displayMiss("64");
// view.displayMiss("26");
// view.displayHit("41");
// view.displayHit("56");
// view.displayHit("32");
// view.displayMessage('Tap...tap...Is this thing on?');
