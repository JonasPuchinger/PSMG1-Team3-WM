var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Before Matchday 1", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
        preTournamentLayout,
        preKnockOutLayout,
        stageLabel;

    function init() {
        

        stageLabel = document.querySelector("#stageLabel");


        $(".stage-menu-fixed").stick_in_parent();

    }

    function setLayout(data) {
            preKnockOutLayout = new View.PreKnockOutLayout(data);
            preKnockOutLayout.init();
    }
    
    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    that.init = init;
    that.setLayout = setLayout;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    return that;
};
