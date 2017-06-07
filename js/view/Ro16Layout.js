var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.Ro16Layout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        matches = [
            ["BRA", "CHI"],
            ["COL", "URU"],
            ["FRA", "NGA"],
            ["GER", "ALG"],
            ["NED", "MEX"],
            ["CRC", "GRE"],
            ["ARG", "SUI"],
            ["BEL", "USA"]
        ],
        flagsUrlBase = "/data/flags/",
        compiledMatches;

    function init() {
        var ro16Template = _.template($('#ro16Template').html()),
            varsMatches = {
                matches: matches,
                flagsUrlBase: flagsUrlBase
            };
            compiledMatches = ro16Template(varsMatches);
    }

    function appendMatches() {
        $("#tournamentBracketsEl").append(compiledMatches);
    }

    that.appendMatches = appendMatches;
    that.init = init;
    return that;
};
