var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.Ro16Layout = function (data) {
    "use strict";
    var that = new EventPublisher(),
        flagsUrlBase = "/data/flags/",
        compiledMatches;

    function init() {
        var ro16Template = _.template($('#ro16Template').html()),
            varsMatches = {
                matches: data,
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
