var WMVis = WMVis || {};
var Controller = Controller || {};
Controller.ElemBracketController = function () {
    "use strict";

    var that = new EventPublisher();

    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                var teamsHover = $('#tournamentBracketsPreKo .ro16 tr.team, #tournamentBracketsPreQuarter .quarter tr.team, #tournamentBracketsPreSemi .semi tr.team, #tournamentBracketsPreFinal .final tr.team'),
                    teamsClick = $('tr.team:not("[id=TBD]")');
                console.log(teamsClick);
                for (let i = 0; i < teamsHover.length; i++) {
                    teamsHover[i].addEventListener("mouseenter", onMatchHovered);
                    teamsHover[i].addEventListener("mouseleave", onMatchLeft);
                }
                for (let i = 0; i < teamsClick.length; i++) {
                    teamsClick[i].addEventListener("click", onMatchClicked);
                }
            }, 1);
        });
    }

    function onMatchHovered(event) {
        that.notifyAll("teamHovered", {
            target: event.target,
            event: "enter"
        });
    }

    function onMatchLeft(event) {
        that.notifyAll("teamHoverLeft", {
            target: event.target,
            event: "leave"
        });
    }

    function onMatchClicked(event) {
        that.notifyAll("teamClicked", event.target);
    }

    that.init = init;
    return that;
};
