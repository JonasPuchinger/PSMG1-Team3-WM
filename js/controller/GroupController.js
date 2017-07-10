var Controller = Controller || {};
Controller.GroupController = function () {
    "use strict";

    var that = new EventPublisher(),
        nationCards;

    function init() {
        $(document).ready(function () {
            setTimeout(function () {
                nationCards = document.querySelectorAll(".nationflag");
                for (let i = 0; i < nationCards.length; i++) {
                    nationCards[i].addEventListener("mouseenter", onShowCalcResult);
                    nationCards[i].addEventListener("mouseout", onHideCalcResult);
                    nationCards[i].addEventListener("click", onShowModal);
                }
            }, 10);
        });
    }

    function onShowCalcResult(event) {
        console.log("show");
        that.notifyAll("showCalcResult", {
            target: event.target,
            event: "enter"
        });
    }

    function onHideCalcResult(event) {
        that.notifyAll("hideCalcResult", {
            target: event.target,
            event: "leave"
        });
    }

    function onShowModal(event) {
        that.notifyAll("showModal", event.target);
    }

    that.init = init;
    return that;
};
