var WMVis = WMVis || {};
var Controller = Controller || {};
WMVis.Controller = function () {
    "use strict";

    var that = new EventPublisher(),
        preTournamentController,
        groupController,
        elemBracketController,
        stageMenu;

    function init() {
        stageMenu = document.querySelector("#stage-menu");
        stageMenu.addEventListener("click", onStageChange);
        initElemBracketController();
    }

    function initPreTournamentController() {
        preTournamentController = new Controller.PreTournamentController();
        preTournamentController.init();
        preTournamentController.addEventListener("nationCardHovered", onNationCardHovered);
        preTournamentController.addEventListener("nationCardLeft", onNationCardLeft);
        preTournamentController.addEventListener("nationCardClicked", onNationCardClicked);
    }

    function initGroupController() {
        groupController = new Controller.GroupController();
        groupController.init();
        groupController.addEventListener("showCalcResult", onShowCalcResult);
        groupController.addEventListener("hideCalcResult", onHideCalcResult);
        groupController.addEventListener("showModal", onShowModal);
    }

    function initElemBracketController() {
        elemBracketController = new Controller.ElemBracketController();
        elemBracketController.init();
        elemBracketController.addEventListener("teamHovered", onTeamHovered);
        elemBracketController.addEventListener("teamHoverLeft", onTeamHoverLeft);
        elemBracketController.addEventListener("teamClicked", onTeamClicked);
    }

    function onStageChange(event) {
        var newStage = event.target.id;
        that.notifyAll("stageChanged", newStage);
    }

    function onTeamHovered(event) {
        that.notifyAll("teamHovered", event.data);
    }

    function onTeamHoverLeft(event) {
        that.notifyAll("teamHoverLeft", event.data);
    }

    function onTeamClicked(event) {
        that.notifyAll("teamClicked", event.data);
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

    function onShowCalcResult(event) {
        that.notifyAll("showCalcResult", event.data);
    }

    function onHideCalcResult(event) {
        that.notifyAll("hideCalcResult", event.data);
    }

    function onShowModal(event) {
        that.notifyAll("showModal", event.data);
    }

    that.initPreTournamentController = initPreTournamentController;
    that.initGroupController = initGroupController;
    that.init = init;
    return that;
};
