var WMVis = WMVis || {},
    Controller = Controller || {},
    EventPublisher = EventPublisher || {},
    $ = $ || {};
Controller.PreTournamentController = function () {
    "use strict";

    var that = new EventPublisher(),
        nationCards;

    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                nationCards = document.querySelectorAll(".nationflag");
                for (let i = 0; i < nationCards.length; i++) {
                    nationCards[i].addEventListener("mouseenter", onNationCardHovered);
                    nationCards[i].addEventListener("mouseout", onNationCardLeft);
                    nationCards[i].addEventListener("click", onNationCardClicked);
                }
                $('.button-collapse').sideNav({
                  closeOnClick: true
                });
            }, 1);
        });
    }

    function onNationCardHovered(event) {
        that.notifyAll("nationCardHovered", {
            target: event.target
        });
    }

    function onNationCardLeft(event) {
        that.notifyAll("nationCardLeft", {
            target: event.target
        });
    }

    function onNationCardClicked(event) {
        that.notifyAll("nationCardClicked", event.target);
    }

    that.init = init;
    return that;
};
