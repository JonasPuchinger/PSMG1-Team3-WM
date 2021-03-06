// Jonas Puchinger
var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.PreTournamentLayout = function () {
    "use strict";

    var that = new EventPublisher(),
        flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/",
        groupNames = [],
        nations = [],
        nationNames = [],
        abbrs = [],
        ids = [],
        predictionData = [],
        fifaRankings = [],
        worldCupResults = [];

    function init(data) {
        if (predictionData.length === 0) {
            predictionData = _.toArray(data[0]);
        }
        if (groupNames.length === 0) {
            groupNames = data[1];
        }
        if (nations.length === 0) {
            var nationsData = data[0];
            for (let i = 0; i < nationsData.length; i += 4) {
                var nationsGroup = [];
                for (let j = i; j < (i + 4); j++) {
                    nationsGroup.push(nationsData[j].country);
                }
                nations.push(nationsGroup);
            }
            for (let k = 0; k < nationsData.length; k++) {
                nationNames.push(nationsData[k].country);
            }
        }
        if (abbrs.length === 0) {
            abbrs = data[4];
        }

        if (ids.length === 0) {
            ids = data[3];
        }
        // er kann hier zwar abbrs anzeigen, aber nicht drauf zugreifen => timeout bis es verfügbar ist
        setTimeout(createTemplate, 50);
    }

    function createTemplate() {
        var template,
            vars,
            compiled;

        template = _.template($("#groups-list").html());
        vars = {
            groupNames: groupNames,
            nations: nations,
            abbrs: abbrs,
            ids: ids,
            flagsUrlBase: flagsUrlBase
        };
        compiled = template(vars);
        $("#groups-list-el").append(compiled);
        createPredictionRowView();
    }

    function setData(predData) {
        if (predictionData.length === 0) {
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

        rounds.forEach(function (round) {
            appendRoundDiv(round, nationUpdate);
        });
    }

    function appendRoundDiv(roundName, nationUpdate) {
        var nextRound = nationUpdate.append("div");
        nextRound.attr("class", roundName + "-pre-tournament col s2 round-div");
        nextRound.text(function (d) {
            return Math.round(d[roundName] * 100) + "%";
        });
        nextRound.style("background-color", function (d) {
            var color = pickHex([0, 255, 0], [255, 0, 0], d[roundName]);
            return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
        });
        nextRound.style("height", function (d) {
            return d[roundName] * 100 + "px";
        });
    }

    function pickHex(color1, color2, weight) {
        var p = weight;
        var w = p * 2 - 1;
        var w1 = (w / 1 + 1) / 2;
        var w2 = 1 - w1;
        var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
          Math.round(color1[1] * w1 + color2[1] * w2),
          Math.round(color1[2] * w1 + color2[2] * w2)];
        return rgb;
    }

    function togglePredictionRow(group) {
        var predictionRowEls = document.querySelectorAll("#" + group + "-row .predictionrow");
        var matchRowEls = document.querySelectorAll("#" + group + "-row .fillrow");
        for (let i = 0; i < predictionRowEls.length; i++) {
            predictionRowEls[i].classList.toggle("hidden");
            matchRowEls[i].classList.toggle("hidden");
        }
        var groupRow = document.querySelector("#" + group + "-row"),
            roundTitles = groupRow.querySelectorAll(".round");
        for (let i = 0; i < roundTitles.length; i++) {
            roundTitles[i].classList.toggle("hidden");
        }
        var calcResult = groupRow.querySelectorAll("#" + group + "-matchcol");
        for (let i = 0; i < calcResult.length; i++) {
            calcResult[i].classList.toggle("hidden");
        }
    }

    function showNationModal(nationData, currentStage, probabilities, versus) {
        $(document).ready(function () {
            $(".modal").modal({
                complete: function () {
                    $("#probability-chart").empty();
                    $("#fifa-rankings-table").empty();
                    $("#world-cup-results-table").empty();
                    $("#spi-ratings-donut").empty();
                }
            });
            $("#nation-modal").modal("open");
            var abbrIndexes = get2DArrayIndex(nations, nationData.alt);
            $(".modal-nationflag").attr("src", flagsUrlBase + abbrs[abbrIndexes[0]][abbrIndexes[1]] + ".svg");
            $("#modal-nation-header").html(nationData.alt);

            var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 50
            };
            var width = 750 - margin.left - margin.right;
            var height = 350 - margin.top - margin.bottom;

            // <Vanessa Hahn>
            const BAR_WIDTH = 80;
            var title = document.querySelectorAll("#probabilities"),
                keys,
                colours;
            for (let i = 0; i < title.length; i++) {
                title[i].classList.add("hidden");
            }
            if (currentStage !== 3 && versus !== "") {
                var formatPercent = d3.format(".0%");
                if (currentStage < 3) {
                    title[0].innerHTML = ("Probabilities to reach the K.O.-phase");
                    keys = ["Gruppenerster", "Gruppenzweiter", "Ausscheiden"];
                    colours = ["green", "orange", "red"];
                } else {
                    title[0].innerHTML = ("Probabilities for the next game");
                    keys = ["WIN", "LOSE"];
                    colours = ["green", "red"];

                }
                for (let i = 0; i < title.length; i++) {
                    title[i].classList.remove("hidden");
                }
                var keysRange = [];
                for (let i = 0; i < keys.length; i++) {
                    keysRange.push((i / keys.length) * (height + 20) + 60);
                }
                var x = d3.scaleOrdinal()
                    .range(keysRange);

                var y = d3.scaleLinear()
                    .range([height, 0]);

                var xAxis = d3.axisBottom(x);

                var yAxis = d3.axisLeft(y)
                    .tickFormat(formatPercent);

                var data = [];

                for (let i = 0; i < probabilities.length; i++) {
                    data.push([keys[i], parseFloat(probabilities[i]), colours[i]]);
                }
                x.domain(data.map(function (d) {
                    return d[0];
                }));

                var svg = d3.select("#probability-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var detailBox = svg.append("svg:text")
                    .attr("dx", "20px")
                    .attr("dy", "-5px")
                    .attr("text-anchor", "right")
                    .style("fill", "#A0A0A0")
                    .style("font-weight", "bold");
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function (d) {
                        return x(d[0]) - BAR_WIDTH / 2;
                    })
                    .attr("width", BAR_WIDTH)
                    .attr("y", function (d) {
                        return y(d[1]);
                    })
                    .attr("height", function (d) {
                        return height - y(d[1]);
                    })
                    .style("fill", function (d) {
                        return d[2];
                    })
                    .on("mouseover", function (d, i, j) {
                        detailBox.attr("x", x.range()[i] - x.range()[0] / 2)
                            .attr("y", y(d[1]))
                            .text(formatPercent(d[1]))
                            .style("visibility", "visible");

                        d3.select(this)
                            .style("opacity", 0.7);
                    }).on("mouseout", function () {
                        detailBox.style("visibility", "hidden");

                        d3.select(this)
                            .style("opacity", 1.0);
                    });
                if (versus !== null) {
                    svg.append("g")
                        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")")
                        .append("text")
                        .attr("class", "versus")
                        .html("vs. " + versus);
                }
            }
            // </Vanessa Hahn>

            var months = ["January", "February", "March", "April", "May", "June", "Juli", "August", "September", "October", "November", "December"];

            var parseTimeRankings = d3.timeParse("%Y-%B");

            var gRankings = d3.select("#fifa-rankings-table").append("svg:svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("svg:g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var xRankings = d3.scaleTime().range([0, width]);
            var yRankings = d3.scaleLinear().range([height, 0]);

            d3.csv("../../data/fifa_rankings_history.csv", function (d, i) {
                if (d["team"] == nationData.alt) {
                    d.Date = parseTimeRankings(d.Date.substring(0, 4) + "-" + months[parseInt(d.Date.substring(5)) - 1]);
                    d.Value = +d.Value;
                    return d;
                }
            }, function (error, data) {
                if (error) throw error;

                var line = d3.line()
                    .x(function (d, i) {
                        if (d.Date != null) {
                            return xRankings(d.Date);
                        } else {
                            return xRankings(data[i - 1].Date);
                        }
                    })
                    .y(function (d) {
                        return yRankings(d.Value);
                    })

                xRankings.domain(d3.extent(data, function (d) {
                    return d.Date;
                }));

                var firstFIFARank = 1;
                var lastFIFARank = 211;

                yRankings.domain([lastFIFARank, firstFIFARank]);

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
            for (let i = 0; i < resultsOrdinals.length; i++) {
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
            var colorOrange = "#FF8C00";
            var colorBlue = "#4682B4";

            d3.csv("../../data/world_cup_data.csv", function (d) {
                if (d["Country Name"] == nationData.alt) {
                    d.Year = parseTimeResults(d.Year);
                    return d;
                }
            }, function (error, data) {
                if (error) throw error;

                var line = d3.line()
                    .x(function (d) {
                        return xResults(d.Year);
                    })
                    .y(function (d) {
                        return yResults(d.Position);
                    })

                xResults.domain(d3.extent(data, function (d) {
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
                    .attr("cx", function (d) {
                        return xResults(d.Year);
                    })
                    .attr("cy", function (d) {
                        return yResults(d.Position);
                    })
                    .attr("r", 4)
                    .style("fill", colorBlue);
            });

            var radius = Math.min(width, height) / 2;

            var arc = d3.arc()
                .outerRadius(radius - 10)
                .innerRadius(radius - 70);

            var pie = d3.pie()
                .sort(null)
                .value(function (d, i) {
                    if (i % 2 == 0) {
                        return d.spi_offense;
                    } else {
                        return d.spi_defense;
                    }
                });

            var gSPIRatings = d3.select("#spi-ratings-donut").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            d3.csv("../../data/raw data/wc-20140609-140000.csv", function (d) {
                    if (d["country"] == nationData.alt) {
                        return [d, d];
                    }
                },
                function (error, data) {
                    if (error) throw error;

                    var g = gSPIRatings.selectAll(".arc")
                        .data(pie(data[0]))
                        .enter().append("g")
                        .attr("class", "arc");

                    g.append("path")
                        .attr("d", arc)
                        .style("fill", function (d, i) {
                            if (i % 2 == 0) {
                                return colorOrange;
                            } else {
                                return colorBlue;
                            }
                        });

                    g.append("text")
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")";
                        })
                        .attr("dy", ".35em")
                        .text(function (d, i) {
                            if (i % 2 == 0) {
                                return "SPI Offense: " + d.data.spi_offense;
                            } else {
                                return "SPI Defense: " + d.data.spi_defense;
                            }
                        });

                });

        });
    }

    function get2DArrayIndex(array, entry) {
        for (let i = 0; i < array.length; i++) {
            if (_.contains(array[i], entry)) {
                return [i, _.indexOf(array[i], entry)];
            }
        }
    }

    function clearGraphs() {
        $("#fifa-rankings-table").innerHTML = "";
        $("#world-cup-results-table").innerHTML = "";
    }

    // <Vanessa Hahn>
    function getCountries(games) {
        var countries = [];
        for (let i = 0; i < games.length; i++) {
            var ids = games[i].game.split("-");
            for (let j = 0; j < ids.length; j++) {
                countries.push(document.querySelector("#" + ids[j]));
            }
        }
        return countries;
    }

    function showPaths(data, group) {
        var root = d3.select("#paths-" + group),
            paths = root.selectAll("g"),
            pathsUpdate = paths.data(data),
            enterPaths = pathsUpdate.enter().append("g"),
            exitPaths = pathsUpdate.exit().remove(),
            link = enterPaths.append("path").attr("class", "link");
        link.attr("d", function (d) {
            return d[0];
        }).style("stroke", function (d) {
            return d[1];
        });
        link.style("stroke-width", function (d) {
            return d[2];
        });
    }

    function connectRowsForNation(group, games, calcResults) {
        const CURVE_DIVIDER1 = 90,
            CURVE_DIVIDER2 = 20,
            DIVIDER = 10;
        var data = [],
            countries = getCountries(games),
            result;
        togglePredictionRow(group);
        var colLeft = document.querySelectorAll("#" + group + "-matchcol")[1].offsetLeft,
            navHeight = document.querySelector(".nav-wrapper").offsetHeight + document.querySelector(".stage-menu-fixed").offsetHeight + DIVIDER,
            colours,
            strokeWidths;
        for (let i = 0; i < countries.length; i++) {
            if (i % 2 === 0) {
                var index = parseInt(i / 2);
                var calcGoals = calcResults[index].split(":");
                colours = getColourArray(calcGoals);
                strokeWidths = getWidthsArray(calcGoals)
                var matchCol = document.querySelectorAll("#" + group + "-matchcol")[1];
                result = matchCol.querySelector("#resultcard-" + index);
                result.querySelector("#goals").innerHTML = calcResults[index];
            }
            data.push(["M " + (countries[i].offsetLeft + countries[i].offsetWidth) + " " + (countries[i].offsetTop + countries[i].offsetHeight / 2) + " Q " + (result.offsetLeft + colLeft - CURVE_DIVIDER1) + " " + (result.offsetTop + result.offsetHeight / 2 + navHeight) + " " + (result.offsetLeft + colLeft + CURVE_DIVIDER2) + " " + (result.offsetTop + result.offsetHeight / 2 + navHeight), colours[i % 2], strokeWidths[i % 2]]);
        }
        showPaths(data, group);
    }

    function deleteConnectRows(group) {
        var root = document.querySelector("#paths-" + group),
            path = root.childNodes[0];
        while (path !== undefined) {
            root.removeChild(path);
            path = root.childNodes[0];
        }
        togglePredictionRow(group);
    }

    function getColourArray(goals) {
        if (parseInt(goals[0]) > parseInt(goals[1])) {
            return ["green", "red"];
        } else if (parseInt(goals[0]) < parseInt(goals[1])) {
            return ["red", "green"];
        } else {
            return ["orange", "orange"];
        }
    }

    function getWidthsArray(goals) {
        const STROKE_WIDTH_MIN = 2;
        const STROKE_WIDTH_ADDED_PER_GOAL = 3;
        var widths = [STROKE_WIDTH_MIN + STROKE_WIDTH_ADDED_PER_GOAL * parseInt(goals[0]), STROKE_WIDTH_MIN + STROKE_WIDTH_ADDED_PER_GOAL * parseInt(goals[1])];
        return widths;
    }
    // </Vanessa Hahn>

    that.init = init;
    that.setData = setData;
    that.connectRowsForNation = connectRowsForNation;
    that.deleteConnectRows = deleteConnectRows;
    that.showNationModal = showNationModal;
    return that;
};
