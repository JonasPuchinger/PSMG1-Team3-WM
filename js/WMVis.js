var WMVis = WMVis || {};
WMVis = (function() {
    "use strict";

    var that = {},
    controller,
    dataModel,
    view;

    function init() {
        controller = new WMVis.Controller();
        dataModel = new WMVis.DataModel();
        view = new WMVis.View();

        controller.init();
        dataModel.init();
        view.init();

        dataModel.getPreTournament(); //Slider Startet hier

        controller.addEventListener("stageSliderChanged", onStageSliderChanged);
        
        dataModel.addEventListener("recieveMd1", recieveMd1);
        dataModel.addEventListener("recieveMd2", recieveMd2);
        dataModel.addEventListener("recieveMd3", recieveMd3);
        dataModel.addEventListener("recieveRo16", recieveRo16);
        dataModel.addEventListener("recieveQuarter", recieveQuarter);
        dataModel.addEventListener("recieveSemi", recieveSemi);
        dataModel.addEventListener("recieveFinal", recieveFinal);
        dataModel.addEventListener("recievePreTournament", recievePreTournament);


    }

    function onStageSliderChanged(event) {
        var newStage = event.data;
        view.changeStageLabel(newStage);
        
        switch (parseInt(newStage)) {
            case 0: //Before Tournament
                dataModel.getPreTournament();
                break;
            case 1: //After Md1
                dataModel.getMatchday1();
                break;
            case 2: //After Md2
                dataModel.getMatchday2();
                break;
            case 3: //After Md3
                dataModel.getMatchday3();
                break;
            case 4: //Before Ro16
                dataModel.getRo16();
                break;
            case 5: //Before Quarter
                dataModel.getQuarter();
                break;
            case 6: //Before Semi
                dataModel.getSemi();
                break;
            case 7: //Before Finals
                dataModel.getFinal();
                break;
                        }

    }
                
    function recievePreTournament(event) {
        console.log(event.data);
    }

    function recieveMd1(event) {
        console.log(event.data);
    }   

    function recieveMd2(event) {
        console.log(event.data);
    } 

    function recieveMd3(event) {
        console.log(event.data);
    } 

    function recieveRo16(event) {
        console.log(event.data);
    } 

    function recieveQuarter(event) {
        console.log(event.data);
    } 

    function recieveSemi(event) {
        console.log(event.data);
    } 

    function recieveFinal(event) {
        console.log(event.data);
    } 

    that.init = init;
    return that;
}());
