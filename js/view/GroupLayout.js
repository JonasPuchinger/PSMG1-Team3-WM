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
    
    function toggleCalcResult(nationData, opponent=null, calcResult=null){   //null aendern!
        var data = [];
        var colLeft1 = document.querySelector(".push-s3").offsetLeft;
        var colLeft2 = document.querySelector(".push-s4").offsetLeft;
        var country = d3.select("#"+nationData.country_id)._groups["0"]["0"];
        var root = d3.select(".calcResult");
        root.append
        data.push("M " + (nationData.offsetLeft + nationData.offsetWidth + colLeft1) + " " + (nationData.offsetTop + nationData.offsetHeight/2) + " Q " + (chance.offsetLeft + colLeft2 - 60) + " " + (chance.offsetTop+chance.offsetHeight/2) + " " + (chance.offsetLeft + colLeft2 -10) + " " + (chance.offsetTop+chance.offsetHeight/2));
        /*data.push("M " + (country.offsetLeft + country.offsetWidth + colLeft1) + " " + (country.offsetTop+country.offsetHeight/2) + " Q " + (chance.offsetLeft + colLeft2 - 60) + " " + (chance.offsetTop+chance.offsetHeight/2) + " " + (chance.offsetLeft + colLeft2 -10) + " " + (chance.offsetTop+chance.offsetHeight/2));*/
        var root = d3.select(".calcResult");
        var paths = root.selectAll("g");
        var pathsUpdate = paths.data(data);
        var enterPaths = pathsUpdate.enter().append("g");
        var exitPaths = pathsUpdate.exit().remove();
        var link = enterPaths.append("path").attr("class","link");
        link.attr("d", function (d) {
        return d;
        });
        switch (nationData.event) {
          case "enter":
              connectRowsForNation(nationData, opponent, calcResult);
              break;
          case "leave":
              deleteConnectRows();
              break;
        }
    }

    function connectRowsForNation(nationData, calcResult) {
      
    }

    function deleteConnectRows() {
      
    }

    that.init = init;
    that.toggleCalcResult = toggleCalcResult;
    return that;
    };
