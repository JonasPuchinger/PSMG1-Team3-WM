var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "After Matchday 1", "After Matchday 2", "After Matchday 3", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
        stageLabel;

    function init() {
        stageLabel = document.querySelector("#stageLabel");
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    return that;
    };
