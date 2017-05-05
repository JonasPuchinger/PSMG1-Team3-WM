var WMVis = WMVis || {};
WMVis.View = function() {
  "use strict";

  var that = new EventPublisher(),
    stages = ["Before Tournament", "After Matchday 1", "After Matchday 2", "After Matchday 3", "Before Knockoutstage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

  function init() {

  }

  that.init = init;
  return that;
};
