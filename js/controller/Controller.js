var WMVis = WMVis || {};
var Controller = Controller || {};
WMVis.Controller = function () {
    "use strict";

    var that = new EventPublisher(),
        preTournamentController,
        elemBracketController,
        stageSlider;

    function init() {
        stageSlider = document.querySelector("#stage-slider");
        stageSlider.addEventListener("input", onSliderChange);

        initPreTournamentController();
        initElemBracketController();
    }

    function initPreTournamentController() {
        preTournamentController = new Controller.PreTournamentController();
        preTournamentController.init();
        preTournamentController.addEventListener("nationCardHovered", onNationCardHovered);
        preTournamentController.addEventListener("nationCardLeft", onNationCardLeft);
        preTournamentController.addEventListener("nationCardClicked", onNationCardClicked);
    }

    function initElemBracketController() {
        elemBracketController = new Controller.ElemBracketController();
        elemBracketController.init();
        elemBracketController.addEventListener("teamHovered", onTeamHovered);
        elemBracketController.addEventListener("teamHovereLeft", onTeamHoverLeft);
        elemBracketController.addEventListener("teamClicked", onTeamClicked);
    }

    function onSliderChange() {
        var newStage = stageSlider.value;
        that.notifyAll("stageSliderChanged", newStage);
    }

    function onTeamHovered(event) {
        that.notifyAll("teamHovered", event.data);
    }

    function onTeamHoverLeft(event) {
        that.notifyAll("teamHovereLeft", event.data);
    }

    function onTeamClicked(event) {
        onNationCardClicked(event);
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

    that.initElemBracketController = initElemBracketController;
    that.init = init;
    return that;
};
