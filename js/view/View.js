var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

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

        initElemBrackets(data);

        preTournamentLayout = new View.PreTournamentLayout();
        groupLayout = new View.GroupLayout();
        preTournamentLayout.addEventListener("fifaRankingsRequested", requestFifaRankings);
        preTournamentLayout.addEventListener("wcResultsRequested", requestWCResults);
        // preTournamentLayout.init();
    }

    function initElemBrackets(data) {
        var selector1 = '#tournamentBracketsPreKo';
        var selector2 = '#tournamentBracketsPreQuarter';
        var selector3 = '#tournamentBracketsPreSemi';
        var selector4 = '#tournamentBracketsPreFinal';
        var selector5 = '#tournamentBracketsWinner';


        ro16Layout = new View.Ro16Layout(data.ro16);
        ro16Layout.init();
        quarterLayout = new View.QuarterLayout(data.quarter);
        quarterLayout.init();
        semiLayout = new View.SemiLayout(data.semi);
        semiLayout.init();
        finalLayout = new View.FinalLayout(data.final);
        finalLayout.init();

        ro16Layout.appendMatchesWithoutScore(selector1);
        quarterLayout.appendTBD(selector1);
        semiLayout.appendTBD(selector1);
        finalLayout.appendTBD(selector1);

        ro16Layout.appendMatches(selector2);
        quarterLayout.appendMatchesWithoutScore(selector2);
        semiLayout.appendTBD(selector2);
        finalLayout.appendTBD(selector2);

        ro16Layout.appendMatches(selector3);
        quarterLayout.appendMatches(selector3);
        semiLayout.appendMatchesWithoutScore(selector3);
        finalLayout.appendTBD(selector3);

        ro16Layout.appendMatches(selector4);
        quarterLayout.appendMatches(selector4);
        semiLayout.appendMatches(selector4);
        finalLayout.appendMatchesWithoutScore(selector4);

        ro16Layout.appendMatches(selector5);
        quarterLayout.appendMatches(selector5);
        semiLayout.appendMatches(selector5);
        finalLayout.appendMatches(selector5);
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
    
    function showCalcResult(country, game, calcResult) {
        groupLayout.connectRowsForNation(country, game, calcResult);
    }
    
    function removeCalcResult(country){
        groupLayout.deleteConnectRows(country);
    }

    function changeLayout(layout, data= null, games= null, probabilities= null) {
        document.querySelector("#groups-list-el").innerHTML = "";
        document.querySelector("#resultEl").innerHTML = "";
        hideAllTournamentBracketLayouts();
        switch (layout) {
            case 0:
                preTournamentLayout.init(data);
                break;
            case 1:
                groupLayout = new View.GroupLayout();  
                console.log(games);
                groupLayout.init(data, games, probabilities);
                break;
            case 2:
                document.querySelector('#tournamentBracketsPreKo').classList.remove('hidden');
                break;
            case 3:
                document.querySelector('#tournamentBracketsPreQuarter').classList.remove('hidden');
                break;
            case 4:
                document.querySelector('#tournamentBracketsPreSemi').classList.remove('hidden');
                break;
            case 5:
                document.querySelector('#tournamentBracketsPreFinal').classList.remove('hidden');
                break;
            case 6:
                document.querySelector('#tournamentBracketsWinner').classList.remove('hidden');
                break;
        }
    }

    function passFifaRatings(rankings) {
      preTournamentLayout.passFifaRatings(rankings);
    }

    function passWCResults(results) {
      preTournamentLayout.passWCResults(results);
    }

    function hideAllTournamentBracketLayouts() {
        document.querySelector('#tournamentBracketsPreKo').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreQuarter').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreSemi').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreFinal').classList.add('hidden');
        document.querySelector('#tournamentBracketsWinner').classList.add('hidden');
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    that.setData = setData;
    that.togglePredictionRow = togglePredictionRow;
    that.showNationModal = showNationModal;
    that.showCalcResult = showCalcResult;
    that.removeCalcResult = removeCalcResult;
    that.changeLayout = changeLayout;
    that.passFifaRatings = passFifaRatings;
    that.passWCResults = passWCResults;
    return that;
};
