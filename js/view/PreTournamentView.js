var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreTournamentView = function () {
    "use strict";

    const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"],
    nations = [
     ["Brazil", "Mexico", "Croatia", "Cameroon"],
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

    var that = new EventPublisher(),
      predictionData = [];

    function init() {
      var template,
        vars,
        compiled;

      template = _.template($("#groups-list").html());
      vars = {groupNames: groupNames, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      compiled = template(vars);
      $("#groups-list-el").append(compiled);

      // wählt nur erste aus, soll aber alle vier von der ausgewählten gruppe auswählen

    }

    function setPredictionData(predData) {
      if(predictionData.length === 0) {
        predictionData = _.toArray(predData);
        createD3View();
      }
    }

    function createD3View() {
      var selection,
        nationRow,
        nation,
        nationUpdate,
        nationEnter,
        nationExit,
        rounds = ["sixteen", "win_group", "quarter", "semi", "cup", "win"];

      selection = d3.select("#groups-list-el");
      nation = selection.selectAll(".predictionrow");
      nationUpdate = nation.data(predictionData);

      rounds.forEach(function(round) {
        appendRoundDiv(round, nationUpdate);
      });
    }

    function appendRoundDiv(roundName, nationUpdate) {
      var nextRound = nationUpdate.append("div");
      nextRound.attr("class", roundName + " col s2 round-div");
      nextRound.text(function(d) {
        return Math.round(d[roundName] * 100) + "%";
      });
      nextRound.style("background-color", function(d) {
        var color = pickHex([0, 255, 0], [255, 0, 0], d[roundName]);
        return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
      });
      nextRound.style("height", function(d) {
        return d[roundName] * 100 + "px";
      });
    }

    function pickHex(color1, color2, weight) {
      var p = weight;
      var w = p * 2 - 1;
      var w1 = (w/1+1) / 2;
      var w2 = 1 - w1;
      var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
          Math.round(color1[1] * w1 + color2[1] * w2),
          Math.round(color1[2] * w1 + color2[2] * w2)];
      return rgb;
    }

    function togglePredictionRow(nationData) {
      var predictionRowEls = document.querySelectorAll("#" + nationData.getAttribute("group") + "-row .predictionrow");
      var matchRowEls = document.querySelectorAll("#" + nationData.getAttribute("group") + "-row .matchrow");
      for(let i = 0; i < predictionRowEls.length; i++) {
        predictionRowEls[i].classList.toggle("hidden");
        matchRowEls[i].classList.toggle("hidden");
      }
    }

    that.init = init;
    that.setPredictionData = setPredictionData;
    that.togglePredictionRow = togglePredictionRow;
    return that;
    };
