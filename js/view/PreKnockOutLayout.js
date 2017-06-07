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
        quarterTBD = [
            ["TBD","TBD"],
            ["TBD","TBD"],
            ["TBD","TBD"],
            ["TBD","TBD"],
        ],
        semiTBD = [
            ["TBD","TBD"],
            ["TBD","TBD"],
        ],
        finalTBD = [
            ["TBD","TBD"]
        ],
        flagsUrlBase = "/data/flags/";

    function init() {
        var ro16Template = _.template($('#ro16Template').html()),
            quarterTemplate = _.template($('#quarterTemplate').html()),
            semiTemplate = _.template($('#semiTemplate').html()),
            finalTemplate = _.template($('#finalTemplate').html()),
            ro16Vars = {
                matches: matches,
                flagsUrlBase: flagsUrlBase
            },
            quarterVars = {
                matches: quarterTBD,
                flagsUrlBase: flagsUrlBase
            },
            semiVars = {
                matches: semiTBD,
                flagsUrlBase: flagsUrlBase
            },
            finalVars = {
                matches: finalTBD,
                flagsUrlBase: flagsUrlBase
            },
            ro16Compiled = ro16Template(ro16Vars),
            quarterCompiled = quarterTemplate(quarterVars),
            semiCompiled = semiTemplate(semiVars),
            finalCompiled = finalTemplate(finalVars);
        $("#tournamentBracketsEl").append(ro16Compiled);
        $("#tournamentBracketsEl").append(quarterCompiled);  
        $("#tournamentBracketsEl").append(semiCompiled);
        $("#tournamentBracketsEl").append(finalCompiled);
    }
    
    that.init = init;
    return that;
};
