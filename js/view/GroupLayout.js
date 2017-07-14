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
        for(let i=0; i<results.length/2; i++){
            var data = [];
            for(let j=2*i; j<2*(i+1); j++){
                cards = [];
                cards.push(document.querySelector("#"+countries[j][0]));
                cards.push(document.querySelector("#"+countries[j][1]));
                data.push("M " + (cards[0].offsetLeft+colLeft+10) + " " + (cards[0].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
                data.push("M " + (cards[1].offsetLeft+colLeft+10) + " " + (cards[1].offsetTop+cards[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
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
    
    function showProbabilities(probabilities){
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

    function connectRowsForNation(country, games, calcResults) {
        var data = [],
            group = country.id;
        var colLeft1 = document.querySelector(".push-s3").offsetLeft;
        var colLeft2 = document.querySelector(".push-s4").offsetLeft;
        var countries = [],
            result,
            calcGoals,
            rect;
        for(let i=0; i<games.length; i++){
            var ids = games[i].game.split("-");
            for(let j=0; j<ids.length; j++){
                countries.push(d3.select("#"+ids[j])._groups["0"]["0"]);
            }
        }
        toggle(group);
        var root = d3.select(".row3-"+group);
        for(let i=0; i<countries.length; i++){
            if(i%2===0){
                var index = parseInt(i/2);
                result= document.querySelector("#cR"+index+"-"+group);
                console.log(result);
                result.innerHTML = calcResults[index];
            }
            data.push("M " + (countries[i].offsetLeft + countries[i].offsetWidth + colLeft1) + " " + (countries[i].offsetTop + countries[i].offsetHeight/2) + " Q " + (result.offsetLeft+colLeft2 - 60) + " " + (result.offsetTop+result.offsetHeight/2) + " " + (result.offsetLeft+colLeft2 -10) + " " + (result.offsetTop+result.offsetHeight/2));
        }
        var paths = root.selectAll("g");
        var pathsUpdate = paths.data(data);
        var enterPaths = pathsUpdate.enter().append("g");
        var exitPaths = pathsUpdate.exit().remove();
        var link = enterPaths.append("path").attr("class","link");
        link.attr("d", function (d) {
        console.log(d);
        return d;
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
        var x = groupRow.querySelector(".x"),
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