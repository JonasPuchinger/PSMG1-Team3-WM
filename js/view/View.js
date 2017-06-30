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
        stageLabel = document.querySelector("#stage-label");
        $(".stage-menu-fixed").stick_in_parent();

        preTournamentLayout = new View.PreTournamentLayout();
        preTournamentLayout.addEventListener("fifaRankingsRequested", requestFifaRankings);
        preTournamentLayout.addEventListener("wcResultsRequested", requestWCResults);
        // preTournamentLayout.init();
        ro16Layout = new View.Ro16Layout(data.ro16);
        ro16Layout.init();
        quarterLayout = new View.QuarterLayout(data.quarter);
        quarterLayout.init();
        semiLayout = new View.SemiLayout(data.semi);
        semiLayout.init();
        finalLayout = new View.FinalLayout(data.final);
        finalLayout.init();

    }

    function requestFifaRankings() {
      that.notifyAll("fifaRankingsRequested");
    }

    function requestWCResults() {
      that.notifyAll("wcResultsRequested");
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    function setData(predData) {
        preTournamentLayout.setData(predData);
    }

    function togglePredictionRow(nationData) {
        preTournamentLayout.togglePredictionRow(nationData);
    }

    function showNationModal(nationData) {
        preTournamentLayout.showNationModal(nationData);
    }

    function changeLayout(layout, data= null, games= null) {
        document.querySelector("#groups-list-el").innerHTML = "";
        document.querySelector("#resultEl").innerHTML = "";
        document.querySelector("#tournamentBracketsEl").innerHTML = "";
        switch (layout) {
            case 0:
                // preTournamentLayout = new View.PreTournamentLayout();
                preTournamentLayout.init(data);
                break;
            case 1:
                groupLayout = new View.GroupLayout();
                console.log(games);
                groupLayout.init(data, games);
                break;
            case 2:
                ro16Layout.appendMatchesWithoutScore();
                quarterLayout.appendTBD();
                semiLayout.appendTBD();
                finalLayout.appendTBD();
                break;
            case 3:
                ro16Layout.appendMatches();
                quarterLayout.appendMatchesWithoutScore();
                semiLayout.appendTBD();
                finalLayout.appendTBD();
                break;
            case 4:
                ro16Layout.appendMatches();
                quarterLayout.appendMatches();
                semiLayout.appendMatchesWithoutScore();
                finalLayout.appendTBD();
                break;
            case 5:
                ro16Layout.appendMatches();
                quarterLayout.appendMatches();
                semiLayout.appendMatches();
                finalLayout.appendMatchesWithoutScore();
                break;
            case 6:
                ro16Layout.appendMatches();
                quarterLayout.appendMatches();
                semiLayout.appendMatches();
                finalLayout.appendMatches();
                break;
        }
    }

    function passFifaRatings(rankings) {
      preTournamentLayout.passFifaRatings(rankings);
    }

    function passWCResults(results) {
      preTournamentLayout.passWCResults(results);
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    that.setData = setData;
    that.togglePredictionRow = togglePredictionRow;
    that.showNationModal = showNationModal;
    that.changeLayout = changeLayout;
    that.passFifaRatings = passFifaRatings;
    that.passWCResults = passWCResults;
    return that;
};
