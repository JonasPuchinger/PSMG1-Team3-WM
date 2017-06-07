var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Before Matchday 1", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
        preTournamentLayout,
        ro16Layout,
        quarterLayout,
        semiLayout,
        finalLayout,
        stageLabel;

    function init() {
        

        stageLabel = document.querySelector("#stageLabel");


        $(".stage-menu-fixed").stick_in_parent();

    }

    function setLayout(data) {
            ro16Layout = new View.Ro16Layout(data);
            ro16Layout.init();
            quarterLayout = new View.QuarterLayout(data);
            quarterLayout.init();
            semiLayout = new View.SemiLayout(data);
            semiLayout.init();
            finalLayout = new View.FinalLayout(data);
            finalLayout.init();

        ro16Layout.appendMatches();
        quarterLayout.appendTBD();
        semiLayout.appendTBD();
        finalLayout.appendTBD();
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
