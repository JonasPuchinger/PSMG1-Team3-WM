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

    var that = new EventPublisher(),
        groups = [],
        nations = [],
        ids = [];

    function init(data, games) {
      var connections = [];
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
      //showProbabilities(probabilities);
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
                console.log(results[j]);
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
    
    function showProbabilities(probabilities){
      for(let i=0; i<probabilities.length; i++){
          
      }
    }

    that.init = init;
    return that;
    };
