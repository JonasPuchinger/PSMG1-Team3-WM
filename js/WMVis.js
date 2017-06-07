var WMVis = WMVis || {};
WMVis = (function() {
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
        view.init();

        initCanvas();
    }
    
    function initCanvas() {
        md3();
        let sliderEl = document.querySelector('#stageSlider');
        sliderEl.value = 0;
        controller.addEventListener("stageSliderChanged", onStageSliderChanged);
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
        view.changeLayout(0, pt, null);
    }
    
    function md0() { //+wahrscheinlichkeiten und zukünftige spiele
        let md0 = dataModel.getPreTournament();
        view.changeLayout(1, md0, null);
    }

    function md1() {
        let md1 = dataModel.getMatchday1();
        console.log(md1);
        view.changeLayout(1, md1, gamesData.getGames(0));
        /*probabilityController = new WMVis.ProbabilityController();
        probabilityController.calculateProbabilities(["BRA","CRO",],md1);*/
    }   

    function md2() {
        let md2 = dataModel.getMatchday2();
        console.log(md2);
        view.changeLayout(1, md2, gamesData.getGames(1));
    } 

    function md3() {
        let md3 = dataModel.getMatchday3();
        view.setLayout(md3);
        console.log(md3);
        view.changeLayout(1, md3, gamesData.getGames(2));
    }
    
    function ko() {
        let ro16 = dataModel.getRo16();
    }

    function ro16() {
        let ro16 = dataModel.getRo16();
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

    that.loadDataModel = loadDataModel;
//    that.init = init;
    return that;
}());
