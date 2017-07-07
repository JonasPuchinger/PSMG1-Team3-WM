var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.GroupLayout = function () {
    "use strict";

    const flagsUrlBase = "https://lipis.github.io/flag-icon-css/flags/4x3/";

    var that = new EventPublisher(),
        groups,
        nations,
        abbrs,
        md,
        games,
        probabilities;

    function init(data, gamesData, probabilityData ) {
      games = gamesData,
      probabilities = probabilityData;
      groups = data[1],
      nations = data[2],
      abbrs = data[3],
      md = data[0];
      setTimeout(createTemplate, 50);
    }
    
    function createTemplate() {
      var template,
        vars,
        compiled;  
      template = _.template($("#resultList").html());
      vars = {groupNames: groups, games: games, nations: nations, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      compiled = template(vars);
      $("#resultEl").append(compiled);
      if(games!==null){
        connect(games);
      }
     showProbabilities(abbrs, probabilities);
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
            cards = Array(2);
        for(let i=0; i<games.length; i++){
            for(let j=0; j<games[i].length; j++){
                countries.push(games[i][j].game.split('-'));
            }
        }
        console.log(countries);
        results = d3.selectAll(".result")._groups["0"];
        var rowHeight = document.querySelector(".group").offsetHeight+20;
        var colLeft = document.querySelector(".push-s3").offsetLeft;
        for(let i=0; i<results.length/2; i++){
            var data = [];
            for(let j=2*i; j<2*(i+1); j++){
                cards[0] = d3.select("#"+countries[j][0])._groups["0"]["0"];
                cards[1] = d3.select("#"+countries[j][1])._groups["0"]["0"];
                console.log(cards);
                data.push("M " + (cards[0].offsetLeft+colLeft) + " " + (cards[0].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
                data.push("M " + (cards[1].offsetLeft+colLeft) + " " + (cards[1].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
            }
            var root = d3.select(".row-"+i);
            var paths = root.selectAll("g");
            var pathsUpdate = paths.data(data);
            var enterPaths = pathsUpdate.enter().append("g");
            var exitPaths = pathsUpdate.exit().remove();
            var link = enterPaths.append("path").attr("class","link");
            link.attr("d", function (d) {
            return d;
        });
        }
    }
    
    function showProbabilities(ids, probabilities){
      var x = d3.selectAll(".x")._groups["0"],
          one = d3.selectAll(".one")._groups["0"],
          two = d3.selectAll(".two")._groups["0"],
          data,
          country,
          chance;
       for(let i=0; i<probabilities.length; i++){
           data = [];
           for(let j=0; j<probabilities[i].length; j++){
                country = d3.select("#"+ids[i][j])._groups["0"]["0"];
                switch(probabilities[i][j]){
                case 'x':
                    chance = x["" + i];
                    break;
                case '1':
                    chance = one["" + i];
                    break;
                case '2':
                    chance = two["" + i];
                    break;
                }
                var colLeft1 = document.querySelector(".push-s3").offsetLeft;
                var colLeft2 = document.querySelector(".push-s4").offsetLeft;
                data.push("M " + (country.offsetLeft + country.offsetWidth + colLeft1) + " " + (country.offsetTop+country.offsetHeight/2) + " Q " + (chance.offsetLeft + colLeft2 - 60) + " " + (chance.offsetTop+chance.offsetHeight/2) + " " + (chance.offsetLeft + colLeft2 -10) + " " + (chance.offsetTop+chance.offsetHeight/2));
           }
            var root = d3.select(".row2-"+i);
            var paths = root.selectAll("g");
            var pathsUpdate = paths.data(data);
            var enterPaths = pathsUpdate.enter().append("g");
            var exitPaths = pathsUpdate.exit().remove();
            var link = enterPaths.append("path").attr("class","link");
            link.attr("d", function (d) {
            return d;
            });
        }
    }

    function connectRowsForNation(country, game, calcResult) {
        var data = [],
            group = country.parentElement.id;
        var colLeft1 = document.querySelector(".push-s3").offsetLeft;
        var colLeft2 = document.querySelector(".push-s4").offsetLeft;
        var ids = game.split("-");
        var countries = [];
        for(let i=0; i<ids.length;i++){
            countries.push(d3.select("#"+ids[i])._groups["0"]["0"]);
        }
        var root = d3.select(".row3-"+group);
        var calcGoals = document.querySelector("#cR-"+group);
        calcGoals.setAttribute("top", (countries[0].offsetTop + countries[1].offsetTop + countries[1].offsetHeight)/2); 
        calcGoals.innerHTML = calcResult;
        calcGoals.classList.remove("hidden");
        console.log(calcGoals);
        for(let i=0; i<ids.length;i++){
            data.push("M " + (countries[i].offsetLeft + countries[i].offsetWidth + colLeft1) + " " + (countries[i].offsetTop + countries[i].offsetHeight/2) + " Q " + (calcGoals.offsetLeft - 60) + " " + (calcGoals.offsetTop+calcGoals.offsetHeight/2) + " " + (calcGoals.offsetLeft -10) + " " + (calcGoals.offsetTop+calcGoals.offsetHeight/2));
        }
        var paths = root.selectAll("g");
        var pathsUpdate = paths.data(data);
        var enterPaths = pathsUpdate.enter().append("g");
        var exitPaths = pathsUpdate.exit().remove();
        var link = enterPaths.append("path").attr("class","link");
        link.attr("d", function (d) {
        return d;
        });
        toggle(group);
    }

    function deleteConnectRows(country) {
       var root = d3.select(".row3-"+country.group);
       var path = root.selectAll("g")[0];
       while(path!==undefined){
           root.removeChild(path);
           path = root.selectAll("g")[0];
       }
       toggle(country.group);
    }
    
    function toggle(group){
        var calcGoals = document.querySelector(".calcGoals");
        calcGoals.classList.toggle("hidden");
        var groupRow = d3.select("#group-"+group);
        var circles = groupRow.selectAll(".circles");
        circles.forEach(function(element){  element.classList.toggle(".hidden");   });
        var paths = groupRow.selectAll(".paths")[1];
        paths.classList.toggle(".hidden");
    }

    that.init = init;
    that.connectRowsForNation = connectRowsForNation;
    that.deleteConnectRows = deleteConnectRows;
    return that;
    };