var WMVis = WMVis || {};
WMVis.ElemBracketShowPred = function (predData) {

    "use strict";

    var that = new EventPublisher(),
        preRo16 = predData.ro16,
        preQuarter = predData.quarter,
        preSemi = predData.semi,
        preFinal = predData.final;

    function init() {

    }

    function showPredRow(state, data) {
        var country;
        switch (parseInt(state)) {
            case 5: //Pre Ro16
                country = data.target.children[1].innerText;

                break;
            case 6: //Pre Quarter

                break;
            case 7: //Pre Semi

                break;
            case 8: //Pre Final

                break;
                    }

    }

    function injectPreds() {

    }


    that.showPredRow = showPredRow;
    that.init = init;
    return that;
}
