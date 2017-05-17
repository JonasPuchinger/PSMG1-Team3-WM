var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
        stageLabel;

    function init() {
        stageLabel = document.querySelector("#stageLabel");

        // jQuery to implement sticky behaviour of stage selector
        $(".stage-menu-fixed").stick_in_parent();
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    return that;
    };
