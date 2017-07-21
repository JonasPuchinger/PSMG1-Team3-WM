/*jslint nomen: true*/
/*global $, _*/

var d3 = d3 || {},
    WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};
View.WinnerLayout = function (options) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [{
            winner: "TBD"
        }],
        Winner = [{
            winner: "ARG"
        }]
        flagsUrlBase = "/data/flags/",
        compiledWinner,
        compiledTBD;

    function init() {
        var winnerTemplate = _.template($('#winnerTemplate').html()),
            varsTBD = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
            varsWinner = {
                matches: winner,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            };
        compiledWinner = finalTemplate(varsWinner);
        compiledTBD = finalTemplate(varsTBD);
    }

    function appendMatches(selector) {
        $(selector).append(compiledWinner);
    }

    function appendTBD(selector) {
        $(selector).append(compiledTBD);
    }

    function appendMatchesWithoutScore(selector) {
        $(selector).append(compiledMatchesWithoutScore);
    }

    that.appendMatches = appendMatches;
    that.appendTBD = appendTBD;
    that.appendMatchesWithoutScore = appendMatchesWithoutScore;
    that.init = init;
    return that;
};
