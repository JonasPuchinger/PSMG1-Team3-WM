var WMVis = WMVis || {};
var Controller = Controller || {};
Controller.PreTournamentController = function() {
  "use strict";

  var that = new EventPublisher(),
    nationCards;

  function init() {
    $(document).ready(function() {
      setTimeout(function() {
        nationCards = document.querySelectorAll(".nationflag");
        for(let i = 0; i < nationCards.length; i++) {
          nationCards[i].addEventListener("mouseover", onNationCardHover);
          nationCards[i].addEventListener("mouseout", onNationCardLeft);
        }
      }, 1);
    });
  }

  function onNationCardHover(event) {
    that.notifyAll("nationCardHovered", event.target);
  }

  function onNationCardLeft(event) {
    that.notifyAll("nationCardLeft", event.target);
  }

  that.init = init;
  return that;
};
