var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.QuarterLayout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [{
                game: ["TBD","TBD"],
                result: []
            },
            {
                game: ["TBD","TBD"],
                result: []
            },
            {
                game: ["TBD","TBD"],
                result: []
            },
            {
                game: ["TBD","TBD"],
                result: []
            }],
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledTBD;

    function init() {
        var quarterTemplate = _.template($('#quarterTemplate').html()),
            varsTBD = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            },
            varsMatches = {
                matches: data,
                flagsUrlBase: flagsUrlBase
            };
        compiledMatches = quarterTemplate(varsMatches);
        compiledTBD = quarterTemplate(varsTBD);
    }

    function appendMatches() {
        $("#tournamentBracketsEl").append(compiledMatches);
    }

    function appendTBD() {
        $("#tournamentBracketsEl").append(compiledTBD);
    }

    that.appendMatches = appendMatches;
    that.appendTBD = appendTBD;
    that.init = init;
    return that;
};
