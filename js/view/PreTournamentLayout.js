var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreTournamentLayout = function() {
    "use strict";

    var that = new EventPublisher(),
      flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/",
      groupNames = [],
      nations = [],
      nationNames = [],
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
        for(let k = 0; k < nationsData.length; k++) {
          nationNames.push(nationsData[k].country);
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
            $("#fifa-rankings-table").empty();
            $("#world-cup-results-table").empty();
            $("#spi-ratings-donut").empty();
          }
        });
        $("#nation-modal").modal("open");
        var abbrIndexes = get2DArrayIndex(nations, nationData.alt);
        $(".modal-nationflag").attr("src", flagsUrlBase + abbrs[abbrIndexes[0]][abbrIndexes[1]] +".svg");
        $("#modal-nation-header").html(nationData.alt);

        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = 750 - margin.left - margin.right;
        var height = 350 - margin.top - margin.bottom;

        var months = ["January", "February", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];

        var parseTimeRankings = d3.timeParse("%Y-%B");

        var gRankings = d3.select("#fifa-rankings-table").append("svg:svg")
			      .attr("width", width + margin.left + margin.right)
			      .attr("height", height + margin.top + margin.bottom)
			    .append("svg:g")
			      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xRankings = d3.scaleTime().range([0, width]);
	      var yRankings = d3.scaleLinear().range([height, 0]);

        var allRankings2 = [];
        d3.csv("../../data/fifa_rankings_history.csv", function(d, i) {
          if(d["team"] == nationData.alt) {
            d.Date = parseTimeRankings(d.Date.substring(0, 4) + "-" + months[parseInt(d.Date.substring(5)) - 1]);
            d.Value = +d.Value;
            return d;
          }
        }, function(error, data) {
          if (error) throw error;

          var line = d3.line()
            .x(function(d, i) {
              if(d.Date != null) {
                return xRankings(d.Date);
              } else {
                return xRankings(data[i - 1].Date);
              }
            })
            .y(function(d) { return yRankings(d.Value); })

          xRankings.domain(d3.extent(data, function(d) { return d.Date; }));

          yRankings.domain([211, 1]);

          gRankings.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(xRankings));

          gRankings.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(yRankings).ticks(10))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Value");

          gRankings.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
        });

        var resultsOrdinals = ["1", "2", "3", "4", "QF", "Round of 16", "G3", "G4"];
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

        d3.csv("../../data/world_cup_data.csv", function(d) {
          if(d["Country Name"] == nationData.alt) {
            d.Year = parseTimeResults(d.Year);
            return d;
          }
        }, function(error, data) {
          if (error) throw error;

          var line = d3.line()
            .x(function(d) { return xResults(d.Year); })
            .y(function(d) { return yResults(d.Position); })

          xResults.domain(d3.extent(data, function(d) {
            return d.Year;
          }));
          yResults.domain(resultsOrdinals);

          gResults.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(xResults));

          gResults.append("g")
              .attr("class", "axis axis--y")
              .call(d3.axisLeft(yResults).ticks(10))
            .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", "0.71em")
              .attr("text-anchor", "end")
              .text("Result");

          gResults.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

            gResults.selectAll("circle")
              .data(data)
            .enter().append("circle")
              .attr("class", "circle")
              .attr("cx", function(d) { return xResults(d.Year); })
              .attr("cy", function(d) { return yResults(d.Position); })
              .attr("r", 4)
              .style("fill", "steelblue");
        });

        var radius = Math.min(width, height) / 2;

        var arc = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(radius - 70);

        var pie = d3.pie()
          .sort(null)
          .value(function(d, i) {
            if(i % 2 == 0) {
              return d.spi_offense;
            } else {
              return d.spi_defense;
            }
          });

        var gSPIRatings = d3.select("#spi-ratings-donut").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + (width + margin.left + margin.right) / 2 + "," + height / 2 + ")");

        d3.csv("../../data/raw data/wc-20140609-140000.csv", function(d) {
          if(d["country"] == nationData.alt) {
            return [d, d];
          }
        },
        function(error, data) {
          if (error) throw error;

          var g = gSPIRatings.selectAll(".arc")
              .data(pie(data[0]))
            .enter().append("g")
              .attr("class", "arc");

          g.append("path")
            .attr("d", arc)
            .style("fill", function(d, i) {
              if(i % 2 == 0) {
                return "#ff8c00";
              } else {
                return "steelblue";
              }
            });

          g.append("text")
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .text(function(d, i) {
              if(i % 2 == 0) {
                return "SPI Offense: " + d.data.spi_offense;
              } else {
                return "SPI Defense: " + d.data.spi_defense;
              }
            });

        });

      });
    }

    function get2DArrayIndex(array, entry) {
      for(let i = 0; i < array.length; i++) {
        if(_.contains(array[i], entry)) {
          return [i, _.indexOf(array[i], entry)];
        }
      }
    }

    function clearGraphs() {
      $("#fifa-rankings-table").innerHTML = "";
      $("#world-cup-results-table").innerHTML = "";
    }

    that.init = init;
    that.setData = setData;
    that.togglePredictionRow = togglePredictionRow;
    that.showNationModal = showNationModal;
    return that;
};
