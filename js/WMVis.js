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
  }

  that.init = init;
  return that;
}());
