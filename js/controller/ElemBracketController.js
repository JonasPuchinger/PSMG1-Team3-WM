var WMVis = WMVis || {};
var Controller = Controller || {};
Controller.ElemBracketController = function () {
    "use strict";

    var that = new EventPublisher();

    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                var teams = $('#tournamentBracketsPreKo .ro16 tr#team, #tournamentBracketsPreQuarter .quarter tr#team, #tournamentBracketsPreSemi .semi tr#team, #tournamentBracketsPreFinal .final tr#team');
                for (let i = 0; i < teams.length; i++) {
                    teams[i].addEventListener("mouseenter", onMatchHovered);
                    teams[i].addEventListener("mouseleave", onMatchLeft);
                    teams[i].addEventListener("click", onMatchClicked);
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
