var WMVis = WMVis || {};
WMVis = (function() {
    "use strict";

    var that = {},
    controller,
    dataModel,
    view;

    function loadDataModel() {
        dataModel = new WMVis.DataModel();
        dataModel.addEventListener("finishedLoading", init);
        dataModel.init();
    }
    
    function init() {
        controller = new WMVis.Controller();
        view = new WMVis.View();

        controller.init();
        view.init();

        initCanvas();
    }
    
    function initCanvas() {
        preTournament();
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
            case 1: //After Md1
                md1();
                break;
            case 2: //After Md2
                md2();
                break;
            case 3: //After Md3
                md3();
                break;
            case 4: //Before Ro16
                ro16();
                break;
            case 5: //Before Quarter
                quarter();
                break;
            case 6: //Before Semi
                semi();
                break;
            case 7: //Before Finals
                final();
                break;
                        }

    }
                
    function preTournament() {
        console.log(dataModel.getPreTournament());
    }

    function md1() {
        let md1 = dataModel.getMatchday1();
        console.log(md1);
    }   

    function md2() {
        let md2 = dataModel.getMatchday2();
        console.log(md2);
    } 

    function md3() {
        let md3 = dataModel.getMatchday3();
        console.log(md3);
    } 

    function ro16() {
        let ro16 = dataModel.getRo16();
        console.log(ro16);
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
