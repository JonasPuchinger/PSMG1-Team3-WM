var WMVis = WMVis || {};
var Controller = Controller || {};
WMVis.Controller = function () {
    "use strict";

    var that = new EventPublisher(),
        preTournamentController,
        elemBracketController,
        stageSlider;

    function init() {
        preTournamentController = new Controller.PreTournamentController();
        preTournamentController.init();
        preTournamentController.addEventListener("nationCardHovered", onNationCardHovered);
        preTournamentController.addEventListener("nationCardLeft", onNationCardLeft);
        preTournamentController.addEventListener("nationCardClicked", onNationCardClicked);

        elemBracketController = new Controller.ElemBracketController();
        elemBracketController.init();

        stageSlider = document.querySelector("#stage-slider");
        stageSlider.addEventListener("input", onSliderChange);
    }

    function onSliderChange() {
        var newStage = stageSlider.value;
        that.notifyAll("stageSliderChanged", newStage);
    }

    function onNationCardHovered(event) {
        that.notifyAll("nationCardHovered", event.data);
    }

    function onNationCardLeft(event) {
        that.notifyAll("nationCardLeft", event.data);
    }

    function onNationCardClicked(event) {
        that.notifyAll("nationCardClicked", event.data);
    }

    that.init = init;
    return that;
};
