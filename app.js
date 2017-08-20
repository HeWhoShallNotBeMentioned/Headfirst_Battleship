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
//Testing if view works
view.displayMiss("00");
view.displayMiss("64");
view.displayMiss("26");
view.displayHit("41");
view.displayHit("56");
view.displayHit("32");
view.displayMessage('Tap...tap...Is this thing on?');
