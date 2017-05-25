var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Before Matchday 1", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
      preTournamentView,
      stageLabel;

    function init() {
      preTournamentView = new View.PreTournamentView();
      stageLabel = document.querySelector("#stage-label");

      preTournamentView.init();
      $(".stage-menu-fixed").stick_in_parent();
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    function setPredictionData(predData) {
      preTournamentView.setPredictionData(predData);
    }

    function togglePredictionRow(nationData) {
      preTournamentView.togglePredictionRow(nationData);
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    that.setPredictionData = setPredictionData;
    that.togglePredictionRow = togglePredictionRow;
    return that;
    };
