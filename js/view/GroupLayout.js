var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.GroupLayout = function () {
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
    abbrs = [                                                       //aus einer csv-Datei
     ["br", "mx", "hr", "cm"],
     ["es", "cl", "nl", "au"],
     ["co", "ci", "gr", "jp"],
     ["uy", "gb", "it", "cr"],
     ["fr", "ec", "ch", "hn"],
     ["ar", "ba", "ng", "ir"],
     ["de", "pt", "us", "gh"],
     ["be", "ru", "kr", "dz"]
     ],
    flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/",
    
    games = [
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"],
        ["BRA-CRO", "CAM-MEX"]
    ],
          
    results = [
        ["5:1", "3:0"],
        ["2:1", "3:0"],
        ["1:1", "3:0"],
        ["2:1", "3:0"],
        ["4:1", "3:0"],
        ["2:1", "3:2"],
        ["2:1", "3:3"],
        ["0:1", "1:0"]
    ],
    
    json = "data/results.json";

    var that = new EventPublisher();

    function init() {
      var template1 = _.template($("#resultList").html());
      var vars1 = {groupNames: groupNames, games: games, results: results, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase}; //aus results.json
      var compiled1 = template1(vars1);
      $("#resultEl").append(compiled1);
     /* var template = _.template($("#gamesList").html());
      var vars = {groupNames: groupNames, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      var compiled = template(vars);
      $("#groupsListEl").append(compiled);*/
    }

    that.init = init;
    return that;
    };
