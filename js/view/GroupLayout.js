var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.GroupLayout = function () {
    "use strict";

    const FLAGS_URL_BASE = "https://lipis.github.io/flag-icon-css/flags/4x3/",
        CURVE_DIVIDER = 60,
        DIVIDER = 10;

    var that = new EventPublisher(),
        groups,
        nations,
        ids,
        abbrs,
        md,
        day,
        games,
        probabilities;

    function init(data, gamesData, probabilityData, currentDay) {
        const TIMEOUT = 50;
        games = gamesData,
            probabilities = probabilityData;
        groups = data[1],
            nations = data[2],
            ids = data[3],
            abbrs = data[4],
            md = data[0];
        day = currentDay;
        setTimeout(createTemplate, TIMEOUT);
    }

    function createTemplate() {
        var template,
            vars,
            compiled;
        template = _.template($("#resultList").html());
        vars = {
            groupNames: groups,
            games: games,
            nations: nations,
            ids: ids,
            abbrs: abbrs,
            flagsUrlBase: FLAGS_URL_BASE,
            currentDay: day
        };
        compiled = template(vars);
        $("#resultEl").append(compiled);
        connectResults(games);
        showProbabilities(probabilities);
    }

    function connectResults() {
        const DIVIDE = 20;
        var countries = getCountries(),
            results = document.querySelectorAll(".result"),
            goals = getGoals(),
            colours = getColourArray(goals),
            strokeWidths = getWidthsArray(goals),
            rowHeight = document.querySelector(".group").offsetHeight + DIVIDE,
            colLeft = document.querySelector(".push-s3").offsetLeft,
            navHeight = document.querySelector("#explainText").offsetHeight + document.querySelector(".nav-wrapper").offsetHeight + document.querySelector(".stage-menu-fixed").offsetHeight,
            cards;
        for (let i = 0; i < results.length / 2; i++) {
            var data = getPathsData(i, countries, results, colours, strokeWidths, colLeft, rowHeight, navHeight);
            showPaths(".row-" + i, data);
        }
    }

    function getCountries() {
        var countries = [];
        for (let i = 0; i < games.length; i++) {
            for (let j = 0; j < games[i].length; j++) {
                countries.push(games[i][j].game.split('-'));
            }
        }
        return countries;
    }

    function getGoals() {
        var goals = [];
        for (let i = 0; i < games.length; i++) {
            goals.push(games[i][0].result.split(":"));
            goals.push(games[i][1].result.split(":"));
        }
        return goals;
    }

    function getColourArray(goals) {
        var colours = [];
        for (let i = 0; i < goals.length; i++) {
            if (parseInt(goals[i][0]) > parseInt(goals[i][1])) {
                colours.push(["green", "red"]);
            } else if (parseInt(goals[i][0]) < parseInt(goals[i][1])) {
                colours.push(["red", "green"]);
            } else {
                colours.push(["orange", "orange"]);
            }
        }
        return colours;
    }

    function getWidthsArray(goals) {
        const START_WIDTH = 2,
            WIDTH_PER_GOAL = 3;
        var widths = [];
        for (let i = 0; i < goals.length; i++) {
            widths.push([START_WIDTH + WIDTH_PER_GOAL * parseInt(goals[i][0]), START_WIDTH + WIDTH_PER_GOAL * parseInt(goals[i][1])]);
        }
        return widths;
    }

    function getPathsData(group, countries, results, colours, strokeWidths, colLeft, rowHeight, navHeight) {
        var data = [];
        for (let j = 2 * group; j < 2 * (group + 1); j++) {
            var cards = [];
            cards.push(document.querySelector("#" + countries[j][0]));
            cards.push(document.querySelector("#" + countries[j][1]));
            data.push(["M " + (cards[0].offsetLeft + colLeft + DIVIDER) + " " + (cards[0].offsetTop + cards[0].offsetHeight / 2) + " Q " + (results[j].offsetLeft + results[j].offsetWidth + CURVE_DIVIDER) + " " + (results[j].offsetTop - results[j].offsetHeight / 2 - group * rowHeight - navHeight) + " " + (results[j].offsetLeft + results[j].offsetWidth - CURVE_DIVIDER) + " " + (results[j].offsetTop - results[j].offsetHeight / 2 - group * rowHeight - navHeight), colours[j][0], strokeWidths[j][0]]);
            data.push(["M " + (cards[1].offsetLeft + colLeft + DIVIDER) + " " + (cards[1].offsetTop + cards[0].offsetHeight / 2) + " Q " + (results[j].offsetLeft + results[j].offsetWidth + CURVE_DIVIDER) + " " + (results[j].offsetTop - results[j].offsetHeight / 2 - group * rowHeight - navHeight) + " " + (results[j].offsetLeft + results[j].offsetWidth - CURVE_DIVIDER) + " " + (results[j].offsetTop - results[j].offsetHeight / 2 - group * rowHeight - navHeight), colours[j][1], strokeWidths[j][1]]);
        }
        return data;
    }

    function showPaths(root, data) {
        var root = d3.select(root),
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
        return enterPaths;
    }

    function showProbabilities(probabilities) {
        const PATH_OPTIMIZER = 5;
        var x = document.querySelectorAll(".X"),
            one = document.querySelectorAll(".one"),
            two = document.querySelectorAll(".two"),
            colLeft1 = document.querySelector(".push-s3").offsetLeft,
            colLeft2 = document.querySelector(".push-s4").offsetLeft,
            data,
            country,
            chance,
            colour,
            strokeWidth;
        for (let i = 0; i < probabilities.length; i++) {
            data = [];
            for (let j = 0; j < probabilities[i][0].length; j++) {
                country = document.querySelector("#" + ids[i][j]);
                switch (probabilities[i][0][j]) {
                    case 'x':
                        chance = x["" + i];
                        colour = "red";
                        break;
                    case '1':
                        chance = one["" + i];
                        colour = "green";
                        break;
                    case '2':
                        chance = two["" + i];
                        colour = "orange";
                        break;
                }
                strokeWidth = probabilities[i][1][j] * 10;
                data.push(["M " + (country.offsetLeft + country.offsetWidth + colLeft1 - PATH_OPTIMIZER) + " " + (country.offsetTop + country.offsetHeight / 2) + " Q " + (chance.offsetLeft + colLeft2 - CURVE_DIVIDER) + " " + (chance.offsetTop + chance.offsetHeight / 2) + " " + (chance.offsetLeft + colLeft2 - DIVIDER) + " " + (chance.offsetTop + chance.offsetHeight / 2), colour, strokeWidth, country.offsetLeft + country.offsetWidth + colLeft1 + DIVIDER * 2, country.offsetTop + country.offsetHeight / 2]);
            }
            var enterPaths = showPaths(".row2-" + i, data);
            if (day !== 3) {
                var texts = enterPaths.append("text");
                texts.attr("class", "probability");
                texts.html(function (d) {
                    return parseInt(d[2] * 10) + "%";
                });
                texts.attr("x", function (d) {
                    return d[3];
                });
                texts.attr("y", function (d) {
                    return d[4];
                });
            }
        }
    }

    function connectRowsForNation(group, nextGames, calcResults) {
        var data = [],
            colLeft1 = document.querySelector(".push-s3").offsetLeft,
            colLeft2 = document.querySelector(".push-s4").offsetLeft,
            countries = [],
            result,
            colours,
            strokeWidths;
        for (let i = 0; i < nextGames.length; i++) {
            var ids = nextGames[i].game.split("-");
            for (let j = 0; j < ids.length; j++) {
                countries.push(document.querySelector("#" + ids[j]));
            }
        }
        toggle(group);
        for (let i = 0; i < countries.length; i++) {
            if (i % 2 === 0) {
                var index = parseInt(i / 2),
                    calcGoals = [calcResults[index].split(":")];
                colours = getColourArray(calcGoals)[0];
                strokeWidths = getWidthsArray(calcGoals)[0];
                result = document.querySelector("#cR" + index + "-" + group);
                result.innerHTML = calcResults[index];
            }
            data.push(["M " + (countries[i].offsetLeft + countries[i].offsetWidth + colLeft1) + " " + (countries[i].offsetTop + countries[i].offsetHeight / 2) + " Q " + (result.offsetLeft + colLeft2 - CURVE_DIVIDER) + " " + (result.offsetTop + result.offsetHeight / 2) + " " + (result.offsetLeft + colLeft2 - DIVIDER) + " " + (result.offsetTop + result.offsetHeight / 2), colours[i % 2], strokeWidths[i % 2]]);
        }
        showPaths(".row3-" + group, data);
    }

    function deleteConnectRows(group) {
        var root = document.querySelector(".row3-" + group),
            path = root.childNodes[0];
        while (path !== undefined) {
            root.removeChild(path);
            path = root.childNodes[0];
        }
        toggle(group);
    }

    function toggle(group) {
        var groupRow = document.querySelector("#" + group + ".s3"),
            x = groupRow.querySelector(".X"),
            one = groupRow.querySelector(".one"),
            two = groupRow.querySelector(".two"),
            calcResult = groupRow.querySelectorAll(".calcResult"),
            rightSvg = document.querySelector("#paths-" + group);
        x.classList.toggle("hidden");
        one.classList.toggle("hidden");
        two.classList.toggle("hidden");
        for (let i = 0; i < calcResult.length; i++) {
            calcResult[i].classList.toggle("hidden");
        }
        rightSvg.classList.toggle("hidden");
    }

    that.init = init;
    that.connectRowsForNation = connectRowsForNation;
    that.deleteConnectRows = deleteConnectRows;
    return that;
};
