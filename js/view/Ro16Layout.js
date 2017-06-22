var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.Ro16Layout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledMatchesWithoutScore,
        matchesWithoutScore = JSON.parse(JSON.stringify(data));

    function init() {
        _.map(matchesWithoutScore, function (match) {
            match.result = ["-", "-"];
            return match;
        });
        var ro16Template = _.template($('#ro16Template').html()),
            varsMatches = {
                matches: data,
                flagsUrlBase: flagsUrlBase
            },
            varsMatchesWithoutScore = {
                matches: matchesWithoutScore,
                flagsUrlBase: flagsUrlBase
            };
        compiledMatches = ro16Template(varsMatches),
        compiledMatchesWithoutScore = ro16Template(varsMatchesWithoutScore);
    }

    function appendMatches() {
        $("#tournamentBracketsEl").append(compiledMatches);
    }

    function appendMatchesWithoutScore() {
        $("#tournamentBracketsEl").append(compiledMatchesWithoutScore);
    }

    that.appendMatches = appendMatches;
    that.appendMatchesWithoutScore = appendMatchesWithoutScore;
    that.init = init;
    return that;
};
