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

        initElemBrackets(data);
    }

    function initElemBrackets(data) {
        var selector1 = '#tournamentBracketsPreKo';
        var selector2 = '#tournamentBracketsPreQuarter';
        var selector3 = '#tournamentBracketsPreSemi';
        var selector4 = '#tournamentBracketsPreFinal';
        var selector5 = '#tournamentBracketsWinner';

        preTournamentLayout = new View.PreTournamentLayout();
        preTournamentLayout.init();
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

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    function setPredictionData(predData) {
        preTournamentLayout.setPredictionData(predData);
    }

    function togglePredictionRow(nationData) {
        preTournamentLayout.togglePredictionRow(nationData);
    }

    function showNationModal(nationData) {
        preTournamentLayout.showNationModal(nationData);
    }

    function changeLayout(layout, data = null, games = null) {
        switch (layout) {
            case 0:
                preTournamentLayout = new View.PreTournamentLayout();
                hideAllTournamentBracketLayouts();
                document.querySelector("#resultEl").innerHTML = "";
                preTournamentLayout.init();
                break;
            case 1:
                groupLayout = new View.GroupLayout();
                hideAllTournamentBracketLayouts();
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                groupLayout.init(data, games);
                break;
            case 2:
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                hideAllTournamentBracketLayouts();
                document.querySelector('#tournamentBracketsPreKo').classList.remove('hidden');
                break;
            case 3:
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                hideAllTournamentBracketLayouts();
                document.querySelector('#tournamentBracketsPreQuarter').classList.remove('hidden');
                break;
            case 4:
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                hideAllTournamentBracketLayouts();
                document.querySelector('#tournamentBracketsPreSemi').classList.remove('hidden');
                break;
            case 5:
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                hideAllTournamentBracketLayouts();
                document.querySelector('#tournamentBracketsPreFinal').classList.remove('hidden');
                break;
            case 6:
                document.querySelector("#groups-list-el").innerHTML = "";
                document.querySelector("#resultEl").innerHTML = "";
                hideAllTournamentBracketLayouts();
                document.querySelector('#tournamentBracketsWinner').classList.remove('hidden');
                break;
        }
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
    that.setPredictionData = setPredictionData;
    that.togglePredictionRow = togglePredictionRow;
    that.showNationModal = showNationModal;
    that.changeLayout = changeLayout;
    return that;
};
