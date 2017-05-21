var WMVis = WMVis || {};
WMVis.ProbabilityController = function() {
  "use strict";

  var that = {};
    
  function calculateProbabilities(game, dataset) {
      var country = Array(2),
          probabilities = [0,0,0,],
          expectedValue = Array(2),
          faculty = Array(2),
          spiValue,
          probability;
      
      for(let i=0; i<dataset.length; i++) 
      {
          if(dataset[i].country_id == game[0]) {
              country[0] = dataset[i];
          } else if(dataset[i].country_id == game[1]) {
              country[1] = dataset[i];
          }
      }
      spiValue = (parseFloat(country[0].spi)-60)/(parseFloat(country[0].spi)-60 + parseFloat(country[1].spi)-60);
      expectedValue[0] = (parseFloat(country[0].spi_offense)*spiValue + parseFloat(country[1].spi_defense)*(1-spiValue));
      expectedValue[1] = (parseFloat(country[1].spi_offense)*(1-spiValue) + parseFloat(country[0].spi_defense)*spiValue);
      console.log(expectedValue, spiValue);
      
      for(let o=0; o<=7;o++) {
          for(let n=0; n<=o; n++) { //evtl
            if(n === 0) {
              faculty[0] = 1;
             } else {
                 faculty[0] *= n;
             }
            }
            for(let t=0; t<=7; t++) {
              for(let n=0; n<=t; n++) {  //auslagern
                  if(n === 0) {
                      faculty[1] = 1;
                  } else {
                  faculty[1] *= n;
                  }
              }
              probability = (Math.pow(expectedValue[0],o)/faculty[0]*Math.exp(-expectedValue[0]) + Math.pow(expectedValue[1],t)/faculty[1]*Math.exp(-expectedValue[1]))/20;
              if(o > t) {
                  probabilities[0] += probability;
              } else if(o < t) {
                  probabilities[1] += probability;
              } else {
                  probabilities[2] += probability
              }
              console.log(probability);
          }
      }
      console.log(probabilities, Math.round(expectedValue[0])+":"+Math.round(expectedValue[1]));
  }

  that.calculateProbabilities = calculateProbabilities;
  return that;
};
