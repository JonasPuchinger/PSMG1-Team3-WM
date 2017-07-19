var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.GroupLayout = function () {
    "use strict";

    const flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/";

    var that = new EventPublisher(),
        groups,
        nations,
        ids,
        abbrs,
        md,
        games,
        probabilities;

    function init(data, gamesData, probabilityData ) {
      games = gamesData,
      probabilities = probabilityData;
      groups = data[1],
      nations = data[2],
      ids = data[3],
      abbrs = data[4],
      md = data[0];
      setTimeout(createTemplate, 30);
    }
    
    function createTemplate() {
      var template,
        vars,
        compiled;  
      template = _.template($("#resultList").html());
      vars = {groupNames: groups, games: games, nations: nations, ids: ids, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      compiled = template(vars);
      $("#resultEl").append(compiled);
      if(games!==null){
        connect(games);
      }
     showProbabilities(probabilities);
    }

    function setData(predData) {
      if(predictionData.length === 0) {
        predictionData = _.toArray(predData);
        createPredictionRowView();
      }
    }

    function connect(){
        var countries = [],
            results,
            cards = [];
        for(let i=0; i<games.length; i++){
            for(let j=0; j<games[i].length; j++){
                countries.push(games[i][j].game.split('-'));
            }
        }
        results = d3.selectAll(".result")._groups["0"];
        var rowHeight = document.querySelector(".group").offsetHeight+20;
        var colLeft = document.querySelector(".push-s3").offsetLeft;
        var goals = [];
        for(let i=0; i<games.length; i++){
            goals.push(games[i][0].result.split(":"));
            goals.push(games[i][1].result.split(":"));
        }
        var colours = getColourArray(goals);
        var strokeWidths = getWidthsArray(goals);
        for(let i=0; i<results.length/2; i++){
            var data = [];
            for(let j=2*i; j<2*(i+1); j++){
                cards = [];
                cards.push(document.querySelector("#"+countries[j][0]));
                cards.push(document.querySelector("#"+countries[j][1]));
                data.push(["M " + (cards[0].offsetLeft+colLeft+10) + " " + (cards[0].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-100) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-100), colours[j][0], strokeWidths[j][0]]);
                data.push(["M " + (cards[1].offsetLeft+colLeft+10) + " " + (cards[1].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-100) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-100), colours[j][1], strokeWidths[j][1]]);
            }
            var root = d3.select(".row-"+i);
            var paths = root.selectAll("g");
            var pathsUpdate = paths.data(data);
            var enterPaths = pathsUpdate.enter().append("g");
            var exitPaths = pathsUpdate.exit().remove();
            var link = enterPaths.append("path").attr("class","link");
            link.attr("d", function (d) {
                return d[0];
            }).style("stroke", function(d) {
                return d[1];
            });
            link.style("stroke-width", function(d) {
                console.log(d[2]);
                return d[2];
            });
        }
    }
    
    function getColourArray(goals){
        var colours = [];
        for(let i=0; i<goals.length; i++){
            if(parseInt(goals[i][0])>parseInt(goals[i][1])){
                colours.push(["green","red"]);
            } else if(parseInt(goals[i][0])<parseInt(goals[i][1])){
                colours.push(["red","green"]);
            } else {
                colours.push(["orange","orange"]);
            }
        }
        return colours;
    }
    
    function getWidthsArray(goals){
        var widths = [];
        for(let i=0; i<goals.length; i++){
            widths.push([3+2*parseInt(goals[i][0]), 3+2*parseInt(goals[i][1])]);
        }
        return widths;
    }
    
    function showProbabilities(probabilities){
      var x = d3.selectAll(".X")._groups["0"],
          one = d3.selectAll(".one")._groups["0"],
          two = d3.selectAll(".two")._groups["0"],
          data,
          country,
          chance,
          colour,
          strokeWidth;
       for(let i=0; i<probabilities.length; i++){
           console.log(probabilities[i]);
           data = [];
           for(let j=0; j<probabilities[i][0].length; j++){
                country = d3.select("#"+ids[i][j])._groups["0"]["0"];
                switch(probabilities[i][0][j]){
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
                strokeWidth = probabilities[i][1][j]*10;
                var colLeft1 = document.querySelector(".push-s3").offsetLeft;
                var colLeft2 = document.querySelector(".push-s4").offsetLeft;
                data.push(["M " + (country.offsetLeft + country.offsetWidth + colLeft1 - 5) + " " + (country.offsetTop+country.offsetHeight/2) + " Q " + (chance.offsetLeft + colLeft2 - 60) + " " + (chance.offsetTop+chance.offsetHeight/2) + " " + (chance.offsetLeft + colLeft2 -10) + " " + (chance.offsetTop+chance.offsetHeight/2), colour, strokeWidth]);
           }
            var root = d3.select(".row2-"+i);
            var paths = root.selectAll("g");
            var pathsUpdate = paths.data(data);
            var enterPaths = pathsUpdate.enter().append("g");
            var exitPaths = pathsUpdate.exit().remove();
            var link = enterPaths.append("path").attr("class","link");
            link.attr("d", function (d) {
                return d[0];
            }).style("stroke", function (d) {
                return d[1];
            });
           link.style("stroke-width", function(d) {
               return d[2];
           });
        }
    }

    function connectRowsForNation(country, games, calcResults) {
        var data = [],
            group = country.id;
        var colLeft1 = document.querySelector(".push-s3").offsetLeft;
        var colLeft2 = document.querySelector(".push-s4").offsetLeft;
        var countries = [],
            result,
            rect;
        for(let i=0; i<games.length; i++){
            var ids = games[i].game.split("-");
            for(let j=0; j<ids.length; j++){
                countries.push(d3.select("#"+ids[j])._groups["0"]["0"]);
            }
        }
        toggle(group);
        var colours,
            strokeWidths;
        var root = d3.select(".row3-"+group);
        for(let i=0; i<countries.length; i++){
            if(i%2===0){
                var index = parseInt(i/2);
                var calcGoals = [calcResults[index].split(":")];
                colours = getColourArray(calcGoals)[0];
                strokeWidths = getWidthsArray(calcGoals)[0];
                result= document.querySelector("#cR"+index+"-"+group);
                result.innerHTML = calcResults[index];
            }
            data.push(["M " + (countries[i].offsetLeft + countries[i].offsetWidth + colLeft1) + " " + (countries[i].offsetTop + countries[i].offsetHeight/2) + " Q " + (result.offsetLeft+colLeft2 - 60) + " " + (result.offsetTop+result.offsetHeight/2) + " " + (result.offsetLeft+colLeft2 - 10) + " " + (result.offsetTop+result.offsetHeight/2), colours[i%2], strokeWidths[i%2]]);
        }
        var paths = root.selectAll("g");
        var pathsUpdate = paths.data(data);
        var enterPaths = pathsUpdate.enter().append("g");
        var exitPaths = pathsUpdate.exit().remove();
        var link = enterPaths.append("path").attr("class","link");
        link.attr("d", function (d) {
        console.log(d);
            return d[0];
        }).style("stroke", function(d){
            return d[1];
        });
        link.style("stroke-width", function(d) {
            return d[2];
        });
    }

    function deleteConnectRows(country) {
       var group = country.id;
       var root = document.querySelector(".row3-"+group);
       var path = root.childNodes[0];
       while(path!==undefined){
           root.removeChild(path);
           path = root.childNodes[0];
       }
       console.log(country);
       toggle(group);
    }
    
    function toggle(group){
        var groupRow = document.querySelector("#"+group+".s3");
        console.log(group);
        var x = groupRow.querySelector(".X"),
            one = groupRow.querySelector(".one"),
            two = groupRow.querySelector(".two");
        x.classList.toggle("hidden");
        one.classList.toggle("hidden");
        two.classList.toggle("hidden");
        var calcResult = groupRow.querySelectorAll(".calcResult");
        for(let i=0; i<calcResult.length; i++){
            calcResult[i].classList.toggle("hidden");
        }
        var rightSvg = document.querySelector("#paths-"+group);
        rightSvg.classList.toggle("hidden");
    }

    that.init = init;
    that.connectRowsForNation = connectRowsForNation;
    that.deleteConnectRows = deleteConnectRows;
    return that;
    };