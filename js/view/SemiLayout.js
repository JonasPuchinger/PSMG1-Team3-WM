var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.SemiLayout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [
            ["TBD","TBD"],
            ["TBD","TBD"],
        ],
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledTBD;

    function init() {
        var semiTemplate = _.template($('#semiTemplate').html()),
            varsTBD = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            },
            varsMatches = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            };
            compiledMatches = semiTemplate(varsMatches);
            compiledTBD = semiTemplate(varsTBD);
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
