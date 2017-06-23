var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.QuarterLayout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [{
                game: ["TBD", "TBD"],
                result: []
            },
            {
                game: ["TBD", "TBD"],
                result: []
            },
            {
                game: ["TBD", "TBD"],
                result: []
            },
            {
                game: ["TBD", "TBD"],
                result: []
            }],
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledTBD,
        compiledMatchesWithoutScore,
        matchesWithoutScore = JSON.parse(JSON.stringify(data)); // Deep Copy

    function init() {
        _.map(matchesWithoutScore, function (match) {
            match.result = ["-", "-"];
            return match;
        });
        var quarterTemplate = _.template($('#quarterTemplate').html()),
            varsTBD = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            },
            varsMatches = {
                matches: data,
                flagsUrlBase: flagsUrlBase
            },
            varsMatchesWithoutScore = {
                matches: matchesWithoutScore,
                flagsUrlBase: flagsUrlBase
            };
        compiledMatches = quarterTemplate(varsMatches);
        compiledMatchesWithoutScore = quarterTemplate(varsMatchesWithoutScore);
        compiledTBD = quarterTemplate(varsTBD);
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
