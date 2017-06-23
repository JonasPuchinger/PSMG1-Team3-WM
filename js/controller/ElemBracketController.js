var WMVis = WMVis || {};
var Controller = Controller || {};
Controller.ElemBracketController = function () {
    "use strict";

    var that = new EventPublisher(),
        teams;

    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                teams = document.querySelectorAll("#team");
                console.log(teams);
                for (let i = 0; i < teams.length; i++) {
                    teams[i].addEventListener("mouseenter", onMatchHovered);
                    teams[i].addEventListener("mouseout", onMatchLeft);
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
