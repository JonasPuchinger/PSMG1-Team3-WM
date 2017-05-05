var WMVis = WMVis || {};
WMVis.Controller = function() {
  "use strict";

  var that = new EventPublisher(),
    stageSlider;

  function init() {
    stageSlider = document.querySelector("#stageSlider");
    stageSlider.addEventListener("input", onSliderChange);
  }

  function onSliderChange() {
    var newStage = stageSlider.value;
    that.notifyAll("stageSliderChanged", newStage);
  }

  that.init = init;
  return that;
};
