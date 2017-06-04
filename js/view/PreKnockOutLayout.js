var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreKnockOutLayout = function (data) {
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
        flagsUrlBase = "/data/flags/";

    function init() {
        var ro16Template = _.template($('#knockoutMatchTemplate').html()),
            vars = {
            matches: matches,
            flagsUrlBase: flagsUrlBase
        };
        var compiled = ro16Template(vars);
        $("#tournamentBracketsEl").append(compiled);
    }
    
    that.init = init;
    return that;
};
