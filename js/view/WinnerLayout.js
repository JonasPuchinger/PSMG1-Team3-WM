/*jslint nomen: true*/
/*global $, _*/

var d3 = d3 || {},
    WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};

View.WinnerLayout = function (options) {
    "use strict";
    var that = new EventPublisher(),
        TBD = "TBD",
        flagsUrlBase = "/data/flags/",
        compiledWinner,
        compiledTBD;

    function init() {
        var winnerTemplate = _.template($('#winnerTemplate').html()),
            varsTBD = {
                winner: TBD,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
            varsWinner = {
                winner: options.data,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            };
        compiledWinner = winnerTemplate(varsWinner);
        compiledTBD = winnerTemplate(varsTBD);
    }

    function appendMatches(selector) {
        $(selector).parent().append(compiledWinner);
    }

    function appendTBD(selector) {
        $(selector).parent().append(compiledTBD);
    }

    that.appendMatches = appendMatches;
    that.appendTBD = appendTBD;
    that.init = init;
    return that;
};
