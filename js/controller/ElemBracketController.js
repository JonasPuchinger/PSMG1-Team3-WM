// Jakob Fehle

var d3 = d3 || {},
    WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {},
    Controller = Controller || {};
Controller.ElemBracketController = function () {
    "use strict";

    var that = new EventPublisher();

    // Add customized eventListeners to specific boxes
    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                var teamsHover = $('#tournamentBracketsPreKo .ro16 tr.team,#tournamentBracketsPreQuarter .quarter tr.team, #tournamentBracketsPreSemi .semi tr.team, #tournamentBracketsPreFinal .final tr.team'),
                    teamsClick = $('tr.team:not("[id=r_TBD]"):not("[id=q_TBD]"):not("[id=s_TBD]"):not("[id=f_TBD]"):not("[id=w_TBD]")');

                for (var i = 0; i < teamsHover.length; i++) {
                    teamsHover[i].addEventListener("mouseenter", onMatchHovered);
                    teamsHover[i].addEventListener("mouseleave", onMatchLeft);
                }
                for (var i = 0; i < teamsClick.length; i++) {
                    teamsClick[i].addEventListener("click", onMatchClicked);
                }
            }, 50);
        });
    }

    function onMatchHovered(event) {
        that.notifyAll("teamHovered", event.target);
    }

    function onMatchLeft(event) {
        that.notifyAll("teamHoverLeft");
    }

    function onMatchClicked(event) {
        that.notifyAll("teamClicked", event.target);
    }

    that.init = init;
    return that;
};
