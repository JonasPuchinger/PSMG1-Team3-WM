var WMVis = WMVis || {};
WMVis = (function () {
    "use strict";

    var that = {},
        controller,
        dataModel,
        view,
        gamesData,
        elemBracketPredView,
        currentStage = 0;

    function initView() {
        var optionsView = {
                ro16: gamesData.getGamesOfDay(3),
                quarter: gamesData.getGamesOfDay(4),
                semi: gamesData.getGamesOfDay(5),
                final: gamesData.getGamesOfDay(6),
                dictionary: dataModel.getCountryDictionary()
            },
            optionsPred = {
                ro16: dataModel.getMatchday(4),
                quarter: dataModel.getMatchday(5),
                semi: dataModel.getMatchday(6),
                final: dataModel.getMatchday(7)
            };
        view = new WMVis.View();
        view.init(optionsView);

        elemBracketPredView = new WMVis.ElemBracketShowPred(optionsPred);
    }

    function initCanvas() {
        initView();
        preTournament();
    }

    function init() {
        gamesData = new WMVis.GamesData();
        initController();
        initCanvas();
    }

    function loadDataModel() {
        dataModel = new WMVis.DataModel();
        dataModel.addEventListener("finishedLoading", init);
        dataModel.init();
    }

    function initController() {
        controller = new WMVis.Controller();
        controller.init();
        controller.addEventListener("stageChanged", onStageChanged);
        controller.addEventListener("nationCardHovered", showCalcResult);
        controller.addEventListener("nationCardLeft", removeCalcResult);
        controller.addEventListener("nationCardClicked", onNationCardClicked);
        controller.addEventListener("showCalcResult", showCalcResult);
        controller.addEventListener("hideCalcResult", removeCalcResult);
        controller.addEventListener("showModal", onNationCardClicked);
        controller.addEventListener("teamHovered", onTeamHovered);
        controller.addEventListener("teamHoverLeft", onTeamHoverLeft);
        controller.addEventListener("teamClicked", onTeamClicked);
    }

    function onStageChanged(event) {
        currentStage = parseInt(event.data.replace(/\D+/g, ""), 10);

        view.changeStage(currentStage);
        switch (currentStage) {
            case 0:
                preTournament();
                break;
            case 1:
            case 2:
            case 3:
                groupDay();
                break;
            case 4:
                ko();
                break;
            case 5:
                ro16();
                break;
            case 6:
                quarter();
                break;
            case 7:
                semi();
                break;
            case 8:
                final();
                break;
        }
    }

    function getProbabilities(data, nation) {
        var probabilities = Array(3);
        for (let i = 0; i < data.length; i++) {
            if (data[i].country_id === nation) {
                probabilities[0] = data[i].win_group;
                probabilities[1] = data[i].sixteen - probabilities[0];
                probabilities[2] = 1 - data[i].sixteen;
            }
        }
        return probabilities;
    }

    function getMostProbableResult(data) {
        var probabilities = [],
            sixteen,
            one,
            two,
            values,
            chance;
        for (let i = 0; i < parseInt(data.length / 4); i++) {
            values = [];
            one = [];
            two = [];
            for (let j = 0; j < 4; j++) {
                one.push(data[i * 4 + j].win_group);
                two.push(data[i * 4 + j].sixteen - one[j]);
            }
            chance = ['x', 'x', 'x', 'x'];
            var maxOne = getMaxIndex(one);
            chance[maxOne] = '1';
            var maxTwo = getMaxIndex(two);
            chance[maxTwo] = '2';
            for (var k = 0; k < chance.length; k++) {
                switch (chance[k]) {
                    case '1':
                        values.push(data[i * 4 + k].win_group);
                        break;
                    case '2':
                        values.push(data[i * 4 + k].sixteen - data[i * 4 + k].win_group);
                        break;
                    case 'x':
                        values.push(1 - data[i * 4 + k].sixteen);
                        break;
                    default:
                        values.push(0);
                        break;
                }
            }
            probabilities.push([chance, values]);
        }
        return probabilities;
    }

    function getMaxIndex(arr) {
        var max = arr[0];
        var maxIndex = 0;
        for (var k = 1; k < arr.length; k++) {
            if (arr[k] > max) {
                maxIndex = k;
                max = arr[k];
            }
        }
        return maxIndex;
    }

    function preTournament() {
        var pt = dataModel.getMatchday(0),
            groups = [],
            nations = [],
            ids = [];

        for (var i = 0; i < pt.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for (var j = i; j < (i + 4); j++) {
                nationsGroup.push(pt[j].country);
                idsGroup.push(pt[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(pt[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations),
            initDelay = 60;
        view.changeLayout(0, [pt, groups, nations, ids, abbrs], null);
        setTimeout(function () {
            controller.initPreTournamentController();
        }, initDelay);
    }

    function groupDay() {
        var matchday = dataModel.getMatchday(currentStage),
            groups = [],
            nations = [],
            ids = [];
        for (var i = 0; i < matchday.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for (var j = i; j < (i + 4); j++) {
                nationsGroup.push(matchday[j].country);
                idsGroup.push(matchday[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(matchday[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        var probabilities = getMostProbableResult(matchday);
        view.changeLayout(1, [matchday, groups, nations, ids, abbrs], gamesData.getGamesOfDay(currentStage - 1), probabilities, currentStage);
        setTimeout(function () {
            controller.initGroupController();
        }, 40);
    }

    function ko() {
        view.changeLayout(2);
    }

    function ro16() {
        view.changeLayout(3);
    }

    function quarter() {
        view.changeLayout(4);
    }

    function semi() {
        view.changeLayout(5);
    }

    function final() {
        view.changeLayout(6);
    }

    function onNationCardClicked(event) {
        var nation = event.data.parentElement.id,
            probabilities,
            index = 0;
        for (let i = 'A'; i < event.data.getAttribute("group"); i++) {
            index++;
        }
        probabilities = getProbabilities(dataModel.getMatchday(currentStage), nation);
        view.showNationModal(event.data, currentStage, probabilities);
    }

    function onTeamHovered(event) {
        elemBracketPredView.showPredRow(currentStage, event.data);
    }

    function onTeamHoverLeft() {
        elemBracketPredView.resetPreds();
    }

    function onTeamClicked(event) {
        var elem = event.data;
        var parent = $(elem).parents('tr:first');
        var img = parent.find('td.img').get(0).children[0];
        var data = dataModel.getMatchday(currentStage),
            probabilityController = new WMVis.ProbabilityController(),
            probabilities = [],
            id,
            game = undefined,
            versus;
        if (data !== undefined) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].country === img.getAttribute("alt")) {
                    id = data[i].country_id;
                    probabilities.push(probabilityController.getProbability(data[i], currentStage));
                }
            }
            game = gamesData.getGame(currentStage, id);
        }
        versus = "";
        if (game !== undefined) {
            versus = game[1]
            for (let i = 0; i < data.length; i++) {
                if (data[i].country_id === versus) {
                    probabilities.push(probabilityController.getProbability(data[i], currentStage));
                    versus = data[i].country;
                }
            }
        }
        view.showNationModal(img, currentStage, probabilities, versus);
    }

    function showCalcResult(event) {
        var data = dataModel.getMatchday(currentStage),
            flag = event.data.target,
            games,
            group;
        switch (currentStage) {
            case 0:
                games = gamesData.getGroupGames(currentStage, flag.id);
                group = flag.getAttribute("group");
                break;
            case 1:
            case 2:
                games = gamesData.getGames(currentStage, flag.id);
                group = flag.id;
                break;
            default:
                data = null;
                break;
        }
        if (data !== null) {
            var probabilityController = new WMVis.ProbabilityController(),
                probabilities = [];

            for (let i = 0; i < games.length; i++) {
                probabilities.push(probabilityController.calculateResult(games[i].game, data));
            }
            view.showCalcResult(currentStage, group, games, probabilities);
        }
    }

    function removeCalcResult(event) {
        var flag = event.data.target;
        switch (currentStage) {
            case 0:
                view.removeCalcResult(currentStage, flag.getAttribute("group"));
                break;
            case 1:
            case 2:
                view.removeCalcResult(currentStage, flag.id);
                break;
            default:
                break;
        }
    }

    that.loadDataModel = loadDataModel;
    return that;
}());
