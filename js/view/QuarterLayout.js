// Jakob Fehle

var WMVis = WMVis || {},
    View = View || {},
    EventPublisher = EventPublisher || {};
View.QuarterLayout = function (options) {
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
        matchesWithoutScore = JSON.parse(JSON.stringify(options.data)); // Deep Copy

    function init() {
        _.map(matchesWithoutScore, function (match) {
            match.result = ["-", "-"];
            return match;
        });

        var quarterTemplate = _.template($('#quarterTemplate').html()),
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
