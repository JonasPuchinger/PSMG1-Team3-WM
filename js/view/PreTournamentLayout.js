var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreTournamentLayout = function() {
    "use strict";

    // const groupNames = ["A", "B", "C", "D", "E", "F", "G", "H"],
    //   nations = [
    //  ["Brazil", "Mexico", "Croatia", "Cameroon"],
    //  ["Spain", "Chile", "Netherlands", "Australia"],
    //  ["Colombia", "Ivory Coast", "Greece", "Japan"],
    //  ["Uruguay", "England", "Italy", "Costa Rica"],
    //  ["France", "Ecuador", "Switzerland", "Honduras"],
    //  ["Argentina", "Bosnia and Herzegovina", "Nigeria", "Iran"],
    //  ["Germany", "Portugal", "USA", "Ghana"],
    //  ["Belgium", "Russia", "South Korea", "Algeria"]
    //  ],
    //   abbrs = [
    //  ["br", "mx", "hr", "cm"],
    //  ["es", "cl", "nl", "au"],
    //  ["co", "ci", "gr", "jp"],
    //  ["uy", "gb", "it", "cr"],
    //  ["fr", "ec", "ch", "hn"],
    //  ["ar", "ba", "ng", "ir"],
    //  ["de", "pt", "us", "gh"],
    //  ["be", "ru", "kr", "dz"]
    //  ];

    var that = new EventPublisher(),
      flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/",
      groupNames = [],
      nations = [],
      abbrs = [],
      predictionData = [],
      fifaRankings = [],
      worldCupResults = [];

    function init(data) {
      if(predictionData.length === 0) {
        predictionData = _.toArray(data[0]);
      }
      if(groupNames.length === 0) {
        groupNames = data[1];
      }
      if(nations.length === 0) {
        var nationsData = data[0];
        for(let i = 0; i < nationsData.length; i += 4) {
            var nationsGroup = [];
            for(let j = i; j < (i + 4); j++) {
                nationsGroup.push(nationsData[j].country);
            }
            nations.push(nationsGroup);
        }
      }
      if(abbrs.length === 0) {
        abbrs = data[3];
      }

      // er kann hier zwar abbrs anzeigen, aber nicht drauf zugreifen => timeout bis es verfügbar ist
      setTimeout(createTemplate, 50);
    }

    function createTemplate() {
      var template,
        vars,
        compiled;

      template = _.template($("#groups-list").html());
      vars = {groupNames: groupNames, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      compiled = template(vars);
      $("#groups-list-el").append(compiled);
      createPredictionRowView();
    }

    function setData(predData) {
      if(predictionData.length === 0) {
        predictionData = _.toArray(predData);
        createPredictionRowView();
      }
    }

    function createPredictionRowView() {
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
      nextRound.attr("class", roundName + "-pre-tournament col s2 round-div");
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
      var predictionRowEls = document.querySelectorAll("#" + nationData.target.getAttribute("group") + "-row .predictionrow");
      var matchRowEls = document.querySelectorAll("#" + nationData.target.getAttribute("group") + "-row .fillrow");
      var matchRowEl = document.querySelector("#" + nationData.target.getAttribute("group") + "-matchcol");
      var connectRowsEl = document.querySelector("#svg-container-" + nationData.target.getAttribute("group"));
      for(let i = 0; i < predictionRowEls.length; i++) {
        predictionRowEls[i].classList.toggle("hidden");
        matchRowEls[i].classList.toggle("hidden");
      }
      matchRowEl.classList.toggle("hidden");
      connectRowsEl.classList.toggle("hidden");
      switch (nationData.event) {
          case "enter":
              connectRowsForNation(nationData, connectRowsEl);
              break;
          case "leave":
              deleteConnectRows();
              break;
        }
    }

    function connectRowsForNation(nationData, connectRowsEl) {
      jqSimpleConnect.connect("#Brazil-nationscard", "#resultcard-0", {/*OPTIONS*/});
      jqSimpleConnect.connect("#Mexico-nationscard", "#resultcard-0", {/*OPTIONS*/});
    }

    function deleteConnectRows() {
      jqSimpleConnect.removeAll();
    }

    function showNationModal(nationData) {
      $(document).ready(function() {
        $(".modal").modal({
          complete: function() {
            // $("#fifa-rankings-table").empty();
            // $("#world-cup-results-table").empty();
          }
        });
        $("#nation-modal").modal("open");
        var abbrIndexes = get2DArrayIndex(nations, nationData.alt);
        $(".modal-nationflag").attr("src", flagsUrlBase + abbrs[abbrIndexes[0]][abbrIndexes[1]] +".svg");
        $("#modal-nation-header").html(nationData.alt);

        that.notifyAll("fifaRankingsRequested");
        that.notifyAll("wcResultsRequested");

        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = 750 - margin.left - margin.right;
        var height = 350 - margin.top - margin.bottom;

        var currNationsRankingsData = fifaRankings[nationData.alt];
        var months = ["January", "February", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];
        for(let i = 0; i < currNationsRankingsData.length; i++) {
          currNationsRankingsData[i].Date = currNationsRankingsData[i].Date.substring(0, 4) + "-" + months[parseInt(currNationsRankingsData[i].Date.substring(5)) - 1];
        }

        var parseTimeRankings = d3.timeParse("%Y-%B");

        var gRankings = d3.select("#fifa-rankings-table").append("svg:svg")
			      .attr("width", width + margin.left + margin.right)
			      .attr("height", height + margin.top + margin.bottom)
			    .append("svg:g")
			      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xRankings = d3.scaleTime().range([0, width]);
	      var yRankings = d3.scaleLinear().range([height, 0]);

        var valueline = d3.line()
    			.x(function(d, i) {
            if(d.Date != null) {
              return xRankings(d.Date);
            } else {
              return xRankings(currNationsRankingsData[i - 1].Date);
            }
    			})
    			.y(function(d, i) {
    				return yRankings(d.Value);
    			});

        currNationsRankingsData.forEach(function(d) {
            d.Date = parseTimeRankings(d.Date);
            d.Value = +d.Value;
        });

        xRankings.domain(d3.extent(currNationsRankingsData, function(d) {
          return d.Date;
        }));
        yRankings.domain([211, 1]);

        gRankings.append("path")
            .data([currNationsRankingsData])
            .attr("class", "line")
            .attr("d", valueline);
        gRankings.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xRankings));
        gRankings.append("g")
            .call(d3.axisLeft(yRankings));


        var currNationsResultData = worldCupResults[nationData.alt];
        currNationsResultData.reverse();
        var worldCups = [1994, 1998, 2002, 2006, 2010];
        var currNationsResults = [];
        for(let i = 0; i < worldCups.length; i++) {
          currNationsResults[i] = {};
          currNationsResults[i].Date = worldCups[i];
          for(let j = 0; j < currNationsResultData.length; j++) {
            if(currNationsResultData[j].hasOwnProperty("Year") && currNationsResultData[j]["Year"] == worldCups[i]) {
              currNationsResults[i].Value = currNationsResultData[j]["Position"];
            }
          }
        }

        var resultsOrdinals = ["1", "2", "3", "4", "QF", "R16", "G3", "G4"];
        var resultsRange = [];
        for(let i = 0; i < resultsOrdinals.length; i++) {
          resultsRange.push((i / resultsOrdinals.length) * height);
        }

        var parseTimeResults = d3.timeParse("%Y");

        var gResults = d3.select("#world-cup-results-table").append("svg:svg")
			      .attr("width", width + margin.left + margin.right)
			      .attr("height", height + margin.top + margin.bottom)
			    .append("svg:g")
			      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xResults = d3.scaleTime().range([0, width]);
	      var yResults = d3.scaleOrdinal().range(resultsRange);

        var valueline = d3.line()
    			.x(function(d, i) {
    				return xResults(currNationsResults[i].Date);
    			})
    			.y(function(d, i) {
    				return yResults(currNationsResults[i].Value);
    			});

        currNationsResults.forEach(function(d) {
            d.Date = parseTimeResults(d.Date);
        });

        xResults.domain(d3.extent(currNationsResults, function(d) {
          return d.Date;
        }));
        yResults.domain(resultsOrdinals);

        gResults.append("path")
            .data([currNationsResultData])
            .attr("class", "line")
            .attr("d", valueline);
        gResults.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xResults));
        gResults.append("g")
            .call(d3.axisLeft(yResults));

      });
    }

    function get2DArrayIndex(array, entry) {
      for(let i = 0; i < array.length; i++) {
        if(_.contains(array[i], entry)) {
          return [i, _.indexOf(array[i], entry)];
        }
      }
    }

    function passFifaRatings(rankings) {
      fifaRankings = rankings;
    }

    function passWCResults(results) {
      worldCupResults = results;
    }

    function clearGraphs() {
      $("#fifa-rankings-table").innerHTML = "";
      $("#world-cup-results-table").innerHTML = "";
    }

    that.init = init;
    that.setData = setData;
    that.togglePredictionRow = togglePredictionRow;
    that.showNationModal = showNationModal;
    that.passFifaRatings = passFifaRatings;
    that.passWCResults = passWCResults;
    return that;
};
