var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.SemiLayout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [{
                game: ["TBD","TBD"],
                result: []
            },
            {
                game: ["TBD","TBD"],
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
        var semiTemplate = _.template($('#semiTemplate').html()),
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
        compiledMatches = semiTemplate(varsMatches);
        compiledMatchesWithoutScore = semiTemplate(varsMatchesWithoutScore);
        compiledTBD = semiTemplate(varsTBD);
    }

    function appendMatches() {
        $("#tournamentBracketsEl").append(compiledMatches);
    }

    function appendTBD() {
        $("#tournamentBracketsEl").append(compiledTBD);
    }

    function appendMatchesWithoutScore() {
        $("#tournamentBracketsEl").append(compiledMatchesWithoutScore);
    }

    that.appendMatches = appendMatches;
    that.appendTBD = appendTBD;
    that.appendMatchesWithoutScore = appendMatchesWithoutScore;
    that.init = init;
    return that;
};
