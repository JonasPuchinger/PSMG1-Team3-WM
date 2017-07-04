var WMVis = WMVis || {};
WMVis = (function () {
    "use strict";

    var that = {},
        controller,
        probabilityController,
        dataModel,
        view,
        gamesData,
        stage;

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
        controller.addEventListener("nationCardHovered", togglePredictionRow);
        controller.addEventListener("nationCardLeft", togglePredictionRow);
        controller.addEventListener("nationCardClicked", onNationCardClicked);
        controller.addEventListener("showCalcResult", showCalcResult);
        controller.addEventListener("hideCalcResult", removeCalcResult);
        controller.addEventListener("showModal", showModal);
    }

    function initView() {
        view = new WMVis.View();
        var options = {
            ro16: gamesData.getGamesOfDay(3),
            quarter: gamesData.getGamesOfDay(4),
            semi: gamesData.getGamesOfDay(5),
            final: gamesData.getGamesOfDay(6)
        };
        view.init(options);
    }

    function onStageSliderChanged(event) {
        var newStage = event.data;
        view.changeStageLabel(newStage);
        switch (parseInt(newStage)) {
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
        stage = parseInt(newStage);
    }
    
    /*function getProbabilities(index){
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
        let pt = dataModel.getPreTournament();
        view.setPredictionData(pt);
        view.changeLayout(0, pt, null);
        controller.initPreTournamentController();
    }

    function md1() {
        let md1 = dataModel.getMatchday1();
        console.log(md1);
        var probabilities = getProbabilities(md1);
        view.changeLayout(1, md1, gamesData.getGamesOfDay(0), probabilities);
        controller.initGroupController();
    }   

    function md2() {
        let md2 = dataModel.getMatchday2();
        console.log(md2);
        var probabilities = getProbabilities(md2);
        view.changeLayout(1, md2, gamesData.getGamesOfDay(1), probabilities);
        controller.initGroupController();
    } 

    function md3() {
        let md3 = dataModel.getMatchday3();
        console.log(md3);
        view.changeLayout(1, md3, gamesData.getGamesOfDay(2), probabilities);
        controller.initGroupController();
    }

    function ko() {
        view.changeLayout(2);
        controller.initElemBracketController();
    }

    function ro16() {
        view.changeLayout(3);
        controller.initElemBracketController();
    }

    function quarter() {
        view.changeLayout(4);
        controller.initElemBracketController();
    }

    function semi() {
        view.changeLayout(5);
        controller.initElemBracketController();
    }

    function final() {
        view.changeLayout(6);
        controller.initElemBracketController();
    }

    function togglePredictionRow(event) {
        view.togglePredictionRow(event.data);
    }

    function onNationCardClicked(event) {
        view.showNationModal(event.data);
    }

    function togglePredictionBracket(event) {

    }
    
    function showCalcResult(event) {
        var country = event.data.target,
            game = gamesData.getGame(stage, country.id),
            data;
        switch(stage){
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
            view.showCalcResult(game, new WMVis.ProbabilityController().calculateProbabilities(game, data)[1]);
        }
    }
    
    function removeCalcResult(event){
        view.removeCalcResult();
    }
    
    function showModal(event){
        
    }

    that.loadDataModel = loadDataModel;
    //    that.init = init;
    return that;
}());
