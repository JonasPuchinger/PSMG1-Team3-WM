var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
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
                flagsUrlBase: flagsUrlBase,
                dictionary: options.dictionary
            },
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
