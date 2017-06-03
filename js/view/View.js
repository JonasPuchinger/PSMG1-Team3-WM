var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Before Matchday 1", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
      preTournamentLayout,
      groupLayout,
      stageLabel;

    function init() {
      //preTournamentLayout = new View.PreTournamentLayout();
      groupLayout = new View.GroupLayout();
      stageLabel = document.querySelector("#stageLabel");

      //preTournamentLayout.init();
      groupLayout.init();
      $(".stage-menu-fixed").stick_in_parent();
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    return that;
    };
