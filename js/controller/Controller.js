var WMVis = WMVis || {};
WMVis.Controller = function() {
  "use strict";

  var that = new EventPublisher(),
    preTournamentController,
    stageSlider;

  function init() {
    preTournamentController = new Controller.PreTournamentController();
    preTournamentController.init();
    preTournamentController.addEventListener("nationCardHovered", onNationCardHovered);
    preTournamentController.addEventListener("nationCardLeft", onNationCardLeft);

    stageSlider = document.querySelector("#stage-slider");
    stageSlider.addEventListener("input", onSliderChange);
  }

  function onSliderChange() {
    var newStage = stageSlider.value;
    that.notifyAll("stageSliderChanged", newStage);
  }

  function onNationCardHovered(event) {
    that.notifyAll("nationCardHovered", event.data);
  }

  function onNationCardLeft(event) {
    that.notifyAll("nationCardLeft", event.data);
  }

  that.init = init;
  return that;
};
