var d3 = d3 || {};
var WMVis = WMVis || {};
var View = View || {};
View.GroupLayout = function () {
    "use strict";

    const abbrs = [
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

    function init(data, games, probabilities) {
      var connections = [],
          groups = [],
          nations = [],
          ids = [];
      for(let i=0; i<data.length; i+=4){
          var nationsGroup = [],
              idsGroup = [];
          for(let j=i; j<(i+4); j++){
              nationsGroup.push(data[j].country);
              idsGroup.push(data[j].country_id);
          }
          nations.push(nationsGroup);
          ids.push(idsGroup);
          groups.push(data[i].group.toUpperCase());
      }
      var template = _.template($("#resultList").html());
      var vars = {groupNames: groups, games: games, nations: nations, ids: ids, abbrs: abbrs, flagsUrlBase: flagsUrlBase};
      var compiled = template(vars);
      $("#resultEl").append(compiled);
      if(games!==null){
        connect(games);
      }
     showProbabilities(ids, probabilities);
    }

    function connect(games){
        var nations = [],
            results,
            countries = [];
        for(let i=0; i<games.length; i++){
            for(let j=0; j<games[i].length; j++){
                nations.push(games[i][j].game.split('-'));
            }
        }
        results = d3.selectAll(".result")._groups["0"];
        var rowHeight = document.querySelector("#group").offsetHeight+20;
        var colLeft = document.querySelector(".push-s3").offsetLeft;
        for(let i=0; i<results.length/2; i++){
            var data = [];
            for(let j=2*i; j<2*(i+1); j++){
                countries[0] = d3.select("#"+nations[j][0])._groups["0"]["0"];
                countries[1] = d3.select("#"+nations[j][1])._groups["0"]["0"];
                data.push("M " + (countries[0].offsetLeft+colLeft) + " " + (countries[0].offsetTop+countries[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
                data.push("M " + (countries[1].offsetLeft+colLeft) + " " + (countries[1].offsetTop+countries[0].offsetHeight/2) + " Q " + (results[j].offsetLeft+results[j].offsetWidth+60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114) + " " + (results[j].offsetLeft+results[j].offsetWidth-60) + " " + (results[j].offsetTop+results[j].offsetHeight/2-i*rowHeight-114));
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

    function connectRowsForNation(game, calcResult) {
      console.log(game);
      var data = [];
        var colLeft1 = document.querySelector(".push-s3").offsetLeft;
        var colLeft2 = document.querySelector(".push-s4").offsetLeft;
        var ids = game.split("-");
        var countries = [];
        for(let i=0; i<ids.length;i++){
            countries.push(d3.select("#"+ids[i])._groups["0"]["0"]);
        }
        var root = d3.select("#calcResult");
        var calcGoals = d3.select(".calcGoals")._groups["0"]["0"];
        $(".calcGoals").css({top: (countries[0].offsetTop + countries[1].offsetTop + countries[1].offsetHeight)/2, left: colLeft2, position:'absolute'});
        document.querySelector(".calcGoals").innerHTML = calcResult;
        calcGoals.classList.remove("hidden");
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
    }

    function deleteConnectRows() {
       var root = document.querySelector(".calcGoals");
       root.classList.add("hidden");
       var path = root.getElementsByTagName("g")[0];
       while(path!==undefined){
           root.removeChild(path);
           path = root.getElementsByTagName("g")[0];
       }
    }

    that.init = init;
    that.connectRowsForNation = connectRowsForNation;
    that.deleteConnectRows = deleteConnectRows;
    return that;
    };
