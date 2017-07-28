var WMVis = WMVis || {};
WMVis = (function () {
    "use strict";

    var that = {},
        controller,
        dataModel,
        view,
        gamesData,
        elemBracketPredView,
        currentState = 0;

     function initView() {
        var optionsView = {
                ro16: gamesData.getGamesOfDay(3),
                quarter: gamesData.getGamesOfDay(4),
                semi: gamesData.getGamesOfDay(5),
                final: gamesData.getGamesOfDay(6),
                dictionary: dataModel.getCountryDictionary()
            },
            optionsPred = {
                ro16: dataModel.getRo16(),
                quarter: dataModel.getQuarter(),
                semi: dataModel.getSemi(),
                final: dataModel.getFinal()
            };
        view = new WMVis.View();
        view.init(optionsView);

        elemBracketPredView = new WMVis.ElemBracketShowPred(optionsPred);
        elemBracketPredView.init();
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
        controller.addEventListener("stageSliderChanged", onStageSliderChanged);
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
  
    function onStageSliderChanged(event) {
        currentState = parseInt(event.data);
        view.changeStageLabel(currentState);

        switch (currentState) {
            case 0: //Before Tournament
                preTournament();
                break;
            case 1: //After Md1
                md1();
                break;
            case 2: //After Md2
                md2();
                break;
            case 3: //After Md3
                md3();
                break;
            case 4: //Before K.O.
                ko();
                break;
            case 5: //After Ro16
                ro16();
                break;
            case 6: //After Quarter
                quarter();
                break;
            case 7: //After Semi
                semi();
                break;
            case 8: //After Finals
                final();
                break;
        }
    }
    
    function getProbabilities(data, nation) {
        var probabilities = Array(3);
        for(let i=0; i<data.length; i++) {
            if(data[i].country_id === nation) {
                probabilities[0] = data[i].win_group;
                probabilities[1] = data[i].sixteen - probabilities[0];
                probabilities[2] = 1 - data[i].sixteen;
            }
        }
        return probabilities;
    }
    
    function getMostProbableResult(data){
        var probabilities = [],
            sixteen,
            one,
            two,
            values,
            chance;
        for(let i=0; i<parseInt(data.length/4); i++){
            values = [];
            one = [];
            two = [];
            for(let j=0; j<4; j++){
                one.push(data[i*4+j].win_group);
                two.push(data[i*4+j].sixteen - one[j]);
            }
            chance = ['x','x','x','x'];
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
        var pt = dataModel.getPreTournament(),
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

        var abbrs = dataModel.getNationsAbbrs(nations);
        // view.setData(pt);
        view.changeLayout(0, [pt, groups, nations, ids, abbrs], null);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function () {
            controller.initPreTournamentController();
        }, 60);
    }

    function md1() {
        var md1 = dataModel.getMatchday1(),
            groups = [],
            nations = [],
            ids = [];
        for (var i = 0; i < md1.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for (var j = i; j < (i + 4); j++) {
                nationsGroup.push(md1[j].country);
                idsGroup.push(md1[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md1[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        var probabilities = getMostProbableResult(md1);
        view.changeLayout(1, [md1, groups, nations, ids, abbrs], gamesData.getGamesOfDay(0), probabilities, currentState);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function () {
            controller.initGroupController();
        }, 40);
    }

    function md2() {
        var md2 = dataModel.getMatchday2(),
            groups = [],
            nations = [],
            ids = [];
        for (var i = 0; i < md2.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for (var j = i; j < (i + 4); j++) {
                nationsGroup.push(md2[j].country);
                idsGroup.push(md2[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md2[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        var probabilities = getMostProbableResult(md2);
        view.changeLayout(1, [md2, groups, nations, ids, abbrs], gamesData.getGamesOfDay(1), probabilities, currentState);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function () {
            controller.initGroupController();
        }, 40);
    }

    function md3() {
        var md3 = dataModel.getMatchday3(),
            groups = [],
            nations = [],
            ids = [];
        for (var i = 0; i < md3.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for (var j = i; j < (i + 4); j++) {
                nationsGroup.push(md3[j].country);
                idsGroup.push(md3[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md3[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        var probabilities = getMostProbableResult(md3);
        view.changeLayout(1, [md3, groups, nations, ids, abbrs], gamesData.getGamesOfDay(2), probabilities, currentState);
        // timeout, um zu warten bis template komplett initialisiert ist
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

    function onStageSliderChanged(event) {
        currentState = parseInt(event.data, 10);
        view.changeStageLabel(currentState);

        switch (currentState) {
            case 0: //Before Tournament
                preTournament();
                break;
            case 1: //After Md1
                md1();
                break;
            case 2: //After Md2
                md2();
                break;
            case 3: //After Md3
                md3();
                break;
            case 4: //Before K.O.
                ko();
                break;
            case 5: //After Ro16
                ro16();
                break;
            case 6: //After Quarter
                quarter();
                break;
            case 7: //After Semi
                semi();
                break;
            case 8: //After Finals
                final();
                break;
        }
    }

    function onNationCardClicked(event) {
        var nation = event.data.parentElement.id,
            probabilities,
            index = 0;
        for(let i='A'; i<event.data.getAttribute("group"); i++) {
            index++;
        }
        probabilities = getProbabilities(dataModel.getMatchday(currentState), nation);
        view.showNationModal(event.data, currentState, probabilities);
    }

    function onTeamHovered(event) {
        elemBracketPredView.showPredRow(currentState, event.data);
    }

    function onTeamHoverLeft() {
        elemBracketPredView.resetPreds();
    }

    function onTeamClicked(event) {
        var elem = event.data;
        var parent = $(elem).parents('tr:first');
        var img = parent.find('td.img').get(0).children[0];
        var data = dataModel.getMatchday(currentState),
            probabilityController = new WMVis.ProbabilityController(),
            probabilities = [],
            id;
        for(let i= 0; i<data.length; i++) {
            if(data[i].country === img.getAttribute("alt")) {
                id = data[i].country_id;
                probabilities.push(probabilityController.getProbability(data[i], currentState));
            }
        }
        var game = gamesData.getGame(currentState, id);
        var versus = "";
        if(game !== undefined) {
            versus = game[1]
            for(let i=0; i<data.length; i++) {
                if(data[i].country_id === versus) {
                    probabilities.push(probabilityController.getProbability(data[i], currentState));
                }
            }
        }
        view.showNationModal(img, currentState, probabilities, versus);
}

    function showCalcResult(event) {
        var data = dataModel.getMatchday(currentState),
            flag = event.data.target,
            games,
            group;
        switch (currentState) {
            case 0:
                games = gamesData.getGroupGames(currentState, flag.id);
                group = flag.getAttribute("group");
                break;
            case 1:
            case 2:
                games = gamesData.getGames(currentState, flag.id);
                group = flag.id;
                break;
            default:
                data = null;
                break;
        }
        if (data !== null) {
            var probabilityController = new WMVis.ProbabilityController(),
                probabilities = [];

            for(let i=0; i<games.length; i++){
                probabilities.push(probabilityController.calculateResult(games[i].game, data));
            }
            view.showCalcResult(currentState, group, games, probabilities);
        }
    }

    function removeCalcResult(event) {
        var flag = event.data.target;
        switch (currentState) {
            case 0:
                view.removeCalcResult(currentState, flag.getAttribute("group"));
                break;
            case 1:
            case 2:
                view.removeCalcResult(currentState, flag.id);
                break;
            default:
                break;
        }
    }

    that.loadDataModel = loadDataModel;
    return that;
}());
