var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.FinalLayout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        TBD = [
            ["TBD","TBD"],
        ],
        flagsUrlBase = "/data/flags/",
        compiledMatches,
        compiledTBD;

    function init() {
        var finalTemplate = _.template($('#finalTemplate').html()),
            varsTBD = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            },
            varsMatches = {
                matches: TBD,
                flagsUrlBase: flagsUrlBase
            };
            compiledMatches = finalTemplate(varsMatches);
            compiledTBD = finalTemplate(varsTBD);
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
