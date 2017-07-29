var WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Matchday 1", "Matchday 2", "Matchday 3", "Round of 16", "Quarterfinal", "Semifinal", "Final", "Winner"];

    var that = new EventPublisher(),
        preTournamentLayout,
        ro16Layout,
        quarterLayout,
        semiLayout,
        finalLayout,
        winnerLayout,
        groupLayout,
        currentStage = 0,
        backgroundColorHovered = '#A9A9A9',
        backgroundColorNormal = '#FFFFFF',
        fontColorNormal = '#000000';

    function initStageMenu() {
        var stageMenu = document.querySelector('#stage-menu');

        for(var i=0; i< stages.length; i++) {
            var stage = document.createElement('div');
            stage.classList.add('col','s1','stage');
            stage.innerHTML = stages[i];
            stage.setAttribute("id",'stage'+i);
            stageMenu.appendChild(stage);
        }

        changeStage(0);
    }

    function changeStage(newStage, oldStage = currentStage) {
        $('#stage'+oldStage).css({
            'background-color': backgroundColorNormal,
            'font-weight': 'normal',
            'color': fontColorNormal
        });

        $('#stage'+newStage).css({
            'background-color': backgroundColorHovered,
            'font-weight': 'bold',
            'color': backgroundColorNormal
        });
        currentStage = newStage;
    }

    function initElemBrackets(data) {
        var selector1 = '#tournamentBracketsPreKo > div',
            selector2 = '#tournamentBracketsPreQuarter > div',
            selector3 = '#tournamentBracketsPreSemi > div',
            selector4 = '#tournamentBracketsPreFinal > div',
            selector5 = '#tournamentBracketsWinner > div';


        ro16Layout = new View.Ro16Layout({
            data: data.ro16,
            dictionary: data.dictionary
        });
        ro16Layout.init();
        quarterLayout = new View.QuarterLayout({
            data: data.quarter,
            dictionary: data.dictionary
        });
        quarterLayout.init();
        semiLayout = new View.SemiLayout({
            data: data.semi,
            dictionary: data.dictionary
        });
        semiLayout.init();
        finalLayout = new View.FinalLayout({
            data: data.final,
            dictionary: data.dictionary
        });
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

    function setData(predData) {
        preTournamentLayout.setData(predData);
    }

    function showNationModal(nationData, currentStage, probabilities=null, versus = null) {
        preTournamentLayout.showNationModal(nationData, currentStage, probabilities, versus);
    }

    function showCalcResult(currentState, country, game, calcResult) {
        if (currentState === 0) {
            preTournamentLayout.connectRowsForNation(country, game, calcResult);
        } else {
            groupLayout.connectRowsForNation(country, game, calcResult);
        }
    }

    function removeCalcResult(currentState, country) {
        if (currentState === 0) {
            preTournamentLayout.deleteConnectRows(country);
        } else {
            groupLayout.deleteConnectRows(country);
        }
    }

    function changeLayout(layout, data = null, games = null, probabilities = null, currentDay = null) {
        document.querySelector("#groups-list-el").innerHTML = "";
        document.querySelector("#resultEl").innerHTML = "";
        hideAllTournamentBracketLayouts();
        switch (layout) {
            case 0:
                preTournamentLayout.init(data);
                document.querySelector('#hamburger').classList.remove('hidden');
                break;
            case 1:
                groupLayout = new View.GroupLayout();
                groupLayout.init(data, games, probabilities, currentDay);
                document.querySelector('#hamburger').classList.remove('hidden');
                break;
            case 2:
                document.querySelector('#tournamentBracketsPreKo').classList.remove('hidden');
                document.querySelector('#hamburger').classList.add('hidden');
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

    function hideAllTournamentBracketLayouts() {
        document.querySelector('#tournamentBracketsPreKo').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreQuarter').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreSemi').classList.add('hidden');
        document.querySelector('#tournamentBracketsPreFinal').classList.add('hidden');
        document.querySelector('#tournamentBracketsWinner').classList.add('hidden');
    }

    function init(data) {
        initStageMenu();
        initElemBrackets(data);

        $(document).on('click', 'a', function(event){
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top - 100
            }, 500);
        });

        preTournamentLayout = new View.PreTournamentLayout();
        groupLayout = new View.GroupLayout();
    }

    that.changeStage = changeStage;
    that.init = init;
    that.stages = stages;
    that.setData = setData;
    that.showNationModal = showNationModal;
    that.showCalcResult = showCalcResult;
    that.removeCalcResult = removeCalcResult;
    that.changeLayout = changeLayout;
    return that;
};
