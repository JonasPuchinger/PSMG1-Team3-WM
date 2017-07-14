var WMVis = WMVis || {};
WMVis = (function () {
    "use strict";

    var that = {},
        controller,
        probabilityController,
        dataModel,
        view,
        gamesData,
        elemBracketPredView,
        currentState = 0;


    function loadDataModel() {
        dataModel = new WMVis.DataModel();
        dataModel.addEventListener("finishedLoading", init);
        dataModel.init();
    }

    function init() {
        gamesData = new WMVis.GamesData();
        initController();
        initCanvas();
    }

    function initCanvas() {
        let sliderEl = document.querySelector('#stage-slider');
        initView();
        preTournament();
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
    }

    function initView() {
        var optionsView = {
                ro16: gamesData.getGamesOfDay(3),
                quarter: gamesData.getGamesOfDay(4),
                semi: gamesData.getGamesOfDay(5),
                final: gamesData.getGamesOfDay(6)
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

  /*  function getProbabilities(index){
        probabilityController = new WMVis.ProbabilityController();
        var probabilities = [];
        for(var i=0; i<md1.length; i+=4){
            probabilities[i] = [];
            for(var j=0; j<4; j++){
                var probability = 0;
                var games = gamesData.getGroupGames(i, md1[i+j].country_id);
                for(var k=0; k<games.length; k++){
                    probability += probabilityController.calculateProbabilities(games[k].game.split("-"),md1);
                }
                console.log(probability);
                probabilities[i].push(probability);
            }
        }
    }*/
    function getProbabilities(data){
        var probabilities = [],
            one,
            two,
            chance;
        for(let i=0; i<parseInt(data.length/4); i++){
            one = [];
            two = [];
            chance = [];
            for(let j=0; j<4; j++){
                one.push(data[i*4+j].win_group);
                two.push(data[i*4+j].sixteen - one[j]);
            }
            chance = ['x','x','x','x'];
            var maxOne = getMaxIndex(one);
            chance[maxOne] = '1';
            var maxTwo = getMaxIndex(two);
            chance[maxTwo] = '2';
            probabilities.push(chance);
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

        for(let i = 0; i < pt.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for(let j = i; j < (i + 4); j++) {
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
        setTimeout(function() { controller.initPreTournamentController(); } , 60);
    }

    function md1() {
        var md1 = dataModel.getMatchday1(),
            groups = [],
            nations = [],
            ids = [];
        for(let i = 0; i < md1.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for(let j = i; j < (i + 4); j++) {
                nationsGroup.push(md1[j].country);
                idsGroup.push(md1[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md1[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        console.log(md1);
        var probabilities = getProbabilities(md1);
        view.changeLayout(1, [md1, groups, nations, ids, abbrs], gamesData.getGamesOfDay(0), probabilities);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function() { controller.initGroupController(); } , 40);
    }

    function md2() {
        var md2 = dataModel.getMatchday2(),
            groups = [],
            nations = [],
            ids = [];
        for(let i = 0; i < md2.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for(let j = i; j < (i + 4); j++) {
                nationsGroup.push(md2[j].country);
                idsGroup.push(md2[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md2[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        console.log(md2);
        var probabilities = getProbabilities(md2);
        view.changeLayout(1, [md2, groups, nations, ids, abbrs], gamesData.getGamesOfDay(1), probabilities);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function() { controller.initGroupController(); } , 40);
    }

    function md3() {
        var md3 = dataModel.getMatchday3(),
            groups = [],
            nations = [],
            ids = [];
        for(let i = 0; i < md3.length; i += 4) {
            var nationsGroup = [];
            var idsGroup = [];
            for(let j = i; j < (i + 4); j++) {
                nationsGroup.push(md3[j].country);
                idsGroup.push(md3[j].country_id);
            }
            nations.push(nationsGroup);
            ids.push(idsGroup);
            groups.push(md3[i].group.toUpperCase());
        }

        var abbrs = dataModel.getNationsAbbrs(nations);
        console.log(md3);
        var probabilities = getProbabilities(md3);
        view.changeLayout(1, [md3, groups, nations, ids, abbrs], gamesData.getGamesOfDay(2), probabilities);
        // timeout, um zu warten bis template komplett initialisiert ist
        setTimeout(function() { controller.initGroupController(); } , 40);
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
        view.showNationModal(event.data);
    }

    function onTeamHovered(event) {
        elemBracketPredView.showPredRow(currentState, event.data);
    }

    function onTeamHoverLeft(event) {
        elemBracketPredView.resetPreds();
    }

    function showCalcResult(event) {
        var data;
        switch(currentState){
            case 0:
                data = dataModel.getPreTournament();
                break;
            case 1:
                data = dataModel.getMatchday1();
                break;
            case 2:
                data = dataModel.getMatchday2();
                break;
            default:
                data = null;
                break;
        }
        if(data!==null){
            var flag = event.data.target,
                games = gamesData.getGames(currentState, flag.id),
                probabilityController = new WMVis.ProbabilityController(),
                probabilities = [];
            for(let i=0; i<games.length; i++){
                probabilities.push(probabilityController.calculateProbabilities(games[i].game, data)[1]);
            }
            view.showCalcResult(currentState, flag, games, probabilities);
        }
    }

    function removeCalcResult(event){
        if(currentState!==3){
            view.removeCalcResult(currentState, event.data.target);
        }
    }

    that.loadDataModel = loadDataModel;
    return that;
}());
