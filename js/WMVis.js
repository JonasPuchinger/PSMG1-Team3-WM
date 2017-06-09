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
        controller = new WMVis.Controller();
        view = new WMVis.View();
        gamesData = new WMVis.GamesData();

        controller.init();
        controller.addEventListener("stageSliderChanged", onStageSliderChanged);
        controller.addEventListener("nationCardHovered", togglePredictionRow);
        controller.addEventListener("nationCardLeft", togglePredictionRow);
        controller.addEventListener("nationCardClicked", onNationCardClicked);
        // view.init();

        initCanvas();
    }

    function initCanvas() {
        let sliderEl = document.querySelector('#stage-slider');
        initView();
        preTournament();
    }

    function initView() {
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
                semi()
                break;
            case 9: //After Finals
                final();
                break;

        }

    }

    function preTournament() {
        let pt = dataModel.getPreTournament();
        console.log(pt);
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
        // probabilityController = new WMVis.ProbabilityController();
        // probabilityController.calculateProbabilities(["BRA","CRO",],md1);
        view.changeLayout(1, md1, gamesData.getGames(0));
    }

    function md2() {
        let md2 = dataModel.getMatchday2();
        console.log(md2);
        view.changeLayout(1, md2, gamesData.getGames(1));
    }

    function md3() {
        let md3 = dataModel.getMatchday3();
        console.log(md3);
        view.changeLayout(1, md3, gamesData.getGames(2));
    }

    function ko() {
        let ro16 = dataModel.getRo16();
        view.setLayout();
    }

    function ro16() {
        let ro16 = dataModel.getRo16();
        console.log(ro16);
        let preKnockOutLayout = new View.PreKnockOutLayout(ro16);
    }

    function quarter() {
        let quarter = dataModel.getQuarter();
        console.log(quarter);
    }

    function semi() {
        let semi = dataModel.getSemi();
        console.log(semi);
    }

    function final() {
        let final = dataModel.getFinal();
        console.log(final);
    }

    function togglePredictionRow(event) {
      view.togglePredictionRow(event.data);
    }

    function onNationCardClicked(event) {
      view.showNationModal(event.data);
    }

    that.loadDataModel = loadDataModel;
    //    that.init = init;
    return that;
}());
