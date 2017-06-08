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
        groupLayout,
        stageLabel;

    function init(data) {
        stageLabel = document.querySelector("#stageLabel");
        $(".stage-menu-fixed").stick_in_parent();

        ro16Layout = new View.Ro16Layout(data.ro16);
        ro16Layout.init();
        quarterLayout = new View.QuarterLayout(data.quarter);
        quarterLayout.init();
        semiLayout = new View.SemiLayout(data.semi);
        semiLayout.init();
        finalLayout = new View.FinalLayout(data.final);
        finalLayout.init();

    }

    function setLayout() {
        document.querySelector("#groupsListEl").innerHTML = "";
        document.querySelector("#resultEl").innerHTML = "";
        ro16Layout.appendMatches();
        quarterLayout.appendTBD();
        semiLayout.appendTBD();
        finalLayout.appendTBD();
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    function changeLayout(layout, data, games) {
        switch (layout) {
            case 0:
                preTournamentLayout = new View.PreTournamentLayout();
                document.querySelector("#resultEl").innerHTML = "";
                preTournamentLayout.init();
                console.log(games);
                break;
            case 1:
                groupLayout = new View.GroupLayout();
                document.querySelector("#groupsListEl").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                console.log(games);
                groupLayout.init(data, games);
                break;
            case 2:
                break;

        }
    }

    that.init = init;
    that.setLayout = setLayout;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    that.changeLayout = changeLayout;
    return that;
};
