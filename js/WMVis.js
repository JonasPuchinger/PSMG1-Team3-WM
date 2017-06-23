var WMVis = WMVis || {};
WMVis = (function () {
    "use strict";

    var that = {},
        controller,
        probabilityController,
        dataModel,
        view,
        gamesData;

    function loadDataModel() {
        dataModel = new WMVis.DataModel();
        dataModel.addEventListener("finishedLoading", init);
        dataModel.init();
    }

    function init() {
        gamesData = new WMVis.GamesData();
        initCanvas();
        initController();
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
    }

    function initView() {
        view = new WMVis.View();
        var options = {
            ro16: gamesData.getGames(3),
            quarter: gamesData.getGames(4),
            semi: gamesData.getGames(5),
            final: gamesData.getGames(6)
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
            case 1: //Before Md1
                md0();
                break;
            case 2: //After Md1
                md1();
                break;
            case 3: //After Md2
                md2();
                break;
            case 4: //After Md3
                md3();
                break;
            case 5: //Before K.O.
                ko();
                break;
            case 6: //After Ro16
                ro16();
                break;
            case 7: //After Quarter
                quarter();
                break;
            case 8: //After Semi
                semi();
                break;
            case 9: //After Finals
                final();
                break;
        }
    }
    
    function getProbabilities(index){
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
    }
  
    function preTournament() {
        let pt = dataModel.getPreTournament();
        view.setPredictionData(pt);
        view.changeLayout(0, pt, null);
    }

    function md0() { //+wahrscheinlichkeiten und zukünftige spiele
        let md0 = dataModel.getPreTournament();
        view.changeLayout(1, md0, null);
    }

    function md1() {
        let md1 = dataModel.getMatchday1();
        console.log(md1);
        var probabilities = getProbabilities(1);
        console.log(probabilities);
        view.changeLayout(1, md1, gamesData.getGamesOfDay(0));
    }   

    function md2() {
        let md2 = dataModel.getMatchday2();
        console.log(md2);
        var probabilities = getProbabilities(2);
        view.changeLayout(1, md2, gamesData.getGamesOfDay(1));
    } 

    function md3() {
        let md3 = dataModel.getMatchday3();
        console.log(md3);
        view.changeLayout(1, md3, gamesData.getGamesOfDay(2));;
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

    that.loadDataModel = loadDataModel;
    //    that.init = init;
    return that;
}());
