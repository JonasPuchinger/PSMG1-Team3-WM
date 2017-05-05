var WMVis = WMVis || {};
WMVis = (function() {
  "use strict";

  var that = {},
    controller,
    dataModel,
    view;

  function init() {
    controller = new WMVis.Controller();
    dataModel = new WMVis.DataModel();
    view = new WMVis.View();

    controller.init();
    dataModel.init();
    view.init();

    controller.addEventListener("stageSliderChanged", onStageSliderChanged);
  }

  function onStageSliderChanged(event) {
    var newStage = event.data;
    view.changeStageLabel(newStage);
  }

  that.init = init;
  return that;
}());
