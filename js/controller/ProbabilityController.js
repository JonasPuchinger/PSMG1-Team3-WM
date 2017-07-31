//<Vanessa Hahn>
var WMVis = WMVis || {};
WMVis.ProbabilityController = function () {
    "use strict";

    var that = {};

    function calculateExpectedValues(game, dataset) {
        const SPI_PROPORTION = 60;
        var country = getCountries(game, dataset),
            probabilities = [0, 0, 0, ],
            expectedValue = Array(2),
            spiValue = (parseFloat(country[0].spi) - SPI_PROPORTION) / (parseFloat(country[0].spi) - 60 + parseFloat(country[1].spi) - SPI_PROPORTION);
        expectedValue[0] = (parseFloat(country[0].spi_offense) * spiValue + parseFloat(country[1].spi_defense) * (1 - spiValue));
        expectedValue[1] = (parseFloat(country[1].spi_offense) * (1 - spiValue) + parseFloat(country[0].spi_defense) * spiValue);
        return expectedValue;
    }

    function getCountries(gameData, dataset) {
        var country = Array(2),
            game = gameData.split("-");
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i].country_id === game[0]) {
                country[0] = dataset[i];
            } else if (dataset[i].country_id === game[1]) {
                country[1] = dataset[i];
            }
        }
        return country;
    }

    function calculateResult(game, dataset) {
        var expectedValue = calculateExpectedValues(game, dataset);
        return Math.round(expectedValue[0]) + ":" + Math.round(expectedValue[1]);
    }


    function getProbability(data, currentState) {
        switch (currentState) {
            case 4:
                return data.quarter;
            case 5:
                return data.semi;
            case 6:
                return data.cup;
            case 7:
                return data.win;
        }
    }

    /*
    function calculateProbabilities(nation, gameData, numGames, dataset) {
          var game = gameData.split("-");
          if(game[0]!==nation) {
              var puffer = game[0];
              game[0] = game[1];
              game[1] = puffer;
          }
          var expectedValue = calculateExpectedValues(game[0]+"-"+game[1], dataset),
              probabilities = [0,0,0,],
              probability;
          for(let o=0; o<=8;o++) {
            for(let t=0; t<=8; t++) {
                probability = Math.min((Math.pow(expectedValue[0],o)/factorial(o))*Math.exp(-expectedValue[0]), (Math.pow(expectedValue[1],t)/factorial(t))*Math.exp(-expectedValue[1]))*30;
                if(o > t) {
                    probabilities[0] += probability;
                } else if(o === t) {
                    probabilities[1] += probability;
                } else {
                    probabilities[2] += probability;
                }
            }
        }
        return [game[1],probabilities];
    }
      
  
    function factorial(goals) {
        var result = 1;
        for(let i=goals; i>0; i--) {
            result *= i;
        }
        return result;
    }
    */

    that.calculateResult = calculateResult;
    that.getProbability = getProbability;
    return that;
};
//</Vanessa Hahn>
