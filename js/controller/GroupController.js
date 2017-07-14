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
                $('.button-collapse').sideNav({
                  closeOnClick: true
                });
            }, 10);
        });
    }

    function onShowCalcResult(event) {
        that.notifyAll("showCalcResult", {
            target: event.target
        });
    }

    function onHideCalcResult(event) {
        that.notifyAll("hideCalcResult", {
            target: event.target
        });
    }

    function onShowModal(event) {
        that.notifyAll("showModal", event.target);
    }

    that.init = init;
    return that;
};
