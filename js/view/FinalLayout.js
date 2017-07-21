/*jslint nomen: true*/
/*global $, _*/

var d3 = d3 || {},
    WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};
View.FinalLayout = function (options) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [{
            game: ["TBD", "TBD"],
            result: []
        }],
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledMatchesWithoutScore,
        compiledTBD,
        matchesWithoutScore = JSON.parse(JSON.stringify(options.data)); // Deep Copy

    function init() {
        _.map(matchesWithoutScore, function (match) {
            match.result = ["-", "-"];
            return match;
        });

        var finalTemplate = _.template($('#finalTemplate').html()),
            varsTBD = {
                matches: TBD,
                winner: 'TBD',
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
            varsMatches = {
                matches: options.data,
                winner: 'ARG',
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
            varsMatchesWithoutScore = {
                matches: matchesWithoutScore,
                winner: 'TBD',
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            };

        compiledMatches = finalTemplate(varsMatches);
        compiledMatchesWithoutScore = finalTemplate(varsMatchesWithoutScore);
        compiledTBD = finalTemplate(varsTBD);
    }

    function appendMatches(selector) {
        $(selector).append(compiledMatches);
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
