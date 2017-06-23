var WMVis = WMVis || {};
WMVis.View = function () {
    "use strict";

    const stages = ["Before Tournament", "Before Matchday 1", "Matchday 1", "Matchday 2", "Matchday 3", "Before Knockout-Stage", "Round of 16", "Quarterfinal", "Semifinal", "Final"];

    var that = new EventPublisher(),
      preTournamentLayout,
      groupLayout,
      stageLabel;

    function init() {
      stageLabel = document.querySelector("#stageLabel");
      $(".stage-menu-fixed").stick_in_parent();
    }

    function changeStageLabel(stage) {
        stageLabel.innerHTML = stages[stage];
    }
    
    function changeLayout(layout, data, games){
        document.querySelector("#groupsListEl").innerHTML = "";
        document.querySelector("#resultEl").innerHTML = "";
        //document.querySelector("#tournamentBracketsEl").innerHTML = "";
        switch(layout){
            case 0:
                preTournamentLayout = new View.PreTournamentLayout();
                preTournamentLayout.init();
                console.log(games);
                break;
            case 1:
                groupLayout = new View.GroupLayout();  
                console.log(games);
                groupLayout.init(data, games);
                break;
            case 2:
                //Aufruf von Jakobs Methode
                break;
                
        }
    }

    that.init = init;
    that.stages = stages;
    that.changeStageLabel = changeStageLabel;
    that.changeLayout = changeLayout;
    return that;
    };
