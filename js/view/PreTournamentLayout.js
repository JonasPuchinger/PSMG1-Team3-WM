var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreTournamentLayout = function () {
    "use strict";

    const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"],
    nations = [
     ["Brazil", "Mexico", "Croation", "Cameroon"],
     ["Spain", "Chile", "Netherlands", "Australia"],
     ["Colombia", "Ivory Coast", "Greece", "Japan"],
     ["Uruguay", "England", "Italy", "Costa Rica"],
     ["France", "Ecuador", "Switzerland", "Honduras"],
     ["Argentina", "Bosnia and Herzegovina", "Nigeria", "Iran"],
     ["Germany", "Portugal", "USA", "Ghana"],
     ["Belgium", "Russia", "South Korea", "Algeria"]
     ],
    abbrs = [
     ["br", "mx", "hr", "cm"],
     ["es", "cl", "nl", "au"],
     ["co", "ci", "gr", "jp"],
     ["uy", "gb", "it", "cr"],
     ["fr", "ec", "ch", "hn"],
     ["ar", "ba", "ng", "ir"],
     ["de", "pt", "us", "gh"],
     ["be", "ru", "kr", "dz"]
     ],
    flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/";

    var that = new EventPublisher();

    function init() {
      var template = _.template($("#groupsList").html());
      var vars = {groupNames: groupNames, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      var compiled = template(vars);
      $("#groupsListEl").append(compiled);
    }

    that.init = init;
    return that;
    };
