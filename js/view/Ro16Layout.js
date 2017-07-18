/*jslint nomen: true*/
/*global $, _*/

var d3 = d3 || {},
    WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};

View.Ro16Layout = function (options) {
    "use strict";

    var that = new EventPublisher(),
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledMatchesWithoutScore,
        matchesWithoutScore = JSON.parse(JSON.stringify(options.data)); // Deep Copy

    function init() {
        _.map(matchesWithoutScore, function (match) {
            match.result = ["-", "-"];
            return match;
        });
        var ro16Template = _.template($('#ro16Template').html()),
            varsMatches = {
                matches: options.data,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
            varsMatchesWithoutScore = {
                matches: matchesWithoutScore,
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            };
        compiledMatches = ro16Template(varsMatches);
        compiledMatchesWithoutScore = ro16Template(varsMatchesWithoutScore);
    }

    function appendMatches(selector) {
        $(selector).append(compiledMatches);
    }

    function appendMatchesWithoutScore(selector) {
        $(selector).append(compiledMatchesWithoutScore);
    }

    that.appendMatches = appendMatches;
    that.appendMatchesWithoutScore = appendMatchesWithoutScore;
    that.init = init;
    return that;
};
