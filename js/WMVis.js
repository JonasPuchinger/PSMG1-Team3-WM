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
        currentState;

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
        controller.addEventListener("teamHovered", onTeamHovered);
        controller.addEventListener("teamHoverLeft", onTeamHoverLeft);
    }

    function initView() {
        var optionsView = {
                ro16: gamesData.getGames(3),
                quarter: gamesData.getGames(4),
                semi: gamesData.getGames(5),
                final: gamesData.getGames(6)
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
        currentState = event.data;
        view.changeStageLabel(currentState);

        switch (parseInt(currentState)) {
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
        view.setPredictionData(pt);
        view.changeLayout(0, pt, null);
        controller.initPreTournamentController();
    }

    function md0() { //+wahrscheinlichkeiten und zukünftige spiele
        let md0 = dataModel.getPreTournament();
        view.changeLayout(1, md0, null);
    }

    function md1() {
        let md1 = dataModel.getMatchday1();
        // probabilityController = new WMVis.ProbabilityController();
        // probabilityController.calculateProbabilities(["BRA","CRO",],md1);
        view.changeLayout(1, md1, gamesData.getGames(0));
    }

    function md2() {
        let md2 = dataModel.getMatchday2();
        view.changeLayout(1, md2, gamesData.getGames(1));
    }

    function md3() {
        let md3 = dataModel.getMatchday3();
        view.changeLayout(1, md3, gamesData.getGames(2));
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

    function togglePredictionRow(event) {
        view.togglePredictionRow(event.data);
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

    that.loadDataModel = loadDataModel;
    return that;
}());
