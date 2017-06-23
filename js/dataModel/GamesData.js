var WMVis = WMVis || {};
WMVis.GamesData = (function () {
    "use strict";

    const games = [[[{
                    group: "A",
                    game: "BRA-CRO",
                    result: "3:1"
                    },
                {
                    group: "A",
                    game: "MEX-CMR",
                    result: "1:0"
                    }],
                    [{
                    group: "B",
                    game: "ESP-NED",
                    result: "1:5"
                    },
                {
                    group: "B",
                    game: "CHI-AUS",
                    result: "3:1"
                    }],
                    [{
                    group: "C",
                    game: "COL-GRE",
                    result: "3:0"
                    },
                {
                    group: "C",
                    game: "CIV-JPN",
                    result: "2:1"
                    }],
                    [{
                    group: "D",
                    game: "URU-CRC",
                    result: "1:3"
                    },
                {
                    group: "D",
                    game: "ENG-ITA",
                    result: "1:2"
                    }],
                    [{
                    group: "E",
                    game: "SUI-ECU",
                    result: "2:1"
                    },
                {
                    group: "E",
                    game: "FRA-HON",
                    result: "3:0"
                    }],
                    [{
                    group: "F",
                    game: "ARG-BIH",
                    result: "2:1"
                    },
                {
                    group: "F",
                    game: "IRN-NGA",
                    result: "0:0"
                    }],
                    [{
                    group: "G",
                    game: "GER-POR",
                    result: "4:0"
                    },
                {
                    group: "G",
                    game: "GHA-USA",
                    result: "1:2"
                    }],
                    [{
                    group: "H",
                    game: "BEL-ALG",
                    result: "2:1"
                    },
                {
                    group: "H",
                    game: "RUS-KOR",
                    result: "1:1"
                    }]],
                    [[{
                    group: "A",
                    game: "BRA-MEX",
                    result: "0:0"
                    },
                {
                    group: "A",
                    game: "CMR-CRO",
                    result: "0:4"
                    }],
                    [{
                    group: "B",
                    game: "AUS-NED",
                    result: "2:3"
                    },
                {
                    group: "B",
                    game: "ESP-CHI",
                    result: "0:2"
                    }],
                    [{
                    group: "C",
                    game: "COL-CIV",
                    result: "2:1"
                    },
                {
                    group: "C",
                    game: "JPN-GRE",
                    result: "0:0"
                    }],
                    [{
                    group: "D",
                    game: "URU-ENG",
                    result: "2:1"
                    },
                {
                    group: "D",
                    game: "ITA-CRC",
                    result: "0:1"
                    }],
                    [{
                    group: "E",
                    game: "SUI-FRA",
                    result: "2:5"
                    },
                {
                    group: "E",
                    game: "HON-ECU",
                    result: "1:2"
                    }],
                    [{
                    group: "F",
                    game: "ARG-IRN",
                    result: "1:0"
                    },
                {
                    group: "F",
                    game: "NGA-BIH",
                    result: "1:0"
                    }],
                    [{
                    group: "G",
                    game: "GER-GHA",
                    result: "2:2"
                    },
                {
                    group: "G",
                    game: "USA-POR",
                    result: "2:2"
                    }],
                    [{
                    group: "H",
                    game: "BEL-RUS",
                    result: "1:0"
                    },
                {
                    group: "H",
                    game: "KOR-ALG",
                    result: "2:4"
                    }]],
                    [[{
                    group: "A",
                    game: "CMR-BRA",
                    result: "1:4"
                    },
                {
                    group: "A",
                    game: "CRO-MEX",
                    result: "1:3"
                    }],
                    [{
                    group: "B",
                    game: "AUS-ESP",
                    result: "0:3"
                    },
                {
                    group: "B",
                    game: "NED-CHI",
                    result: "2:0"
                    }],
                    [{
                    group: "C",
                    game: "JPN-COL",
                    result: "1:4"
                    },
                {
                    group: "C",
                    game: "GRE-CIV",
                    result: "2:1"
                    }],
                    [{
                    group: "D",
                    game: "ITA-URU",
                    result: "0:1"
                    },
                {
                    group: "D",
                    game: "CRC-ENG",
                    result: "0:0"
                    }],
                    [{
                    group: "E",
                    game: "HON-SUI",
                    result: "0:3"
                    },
                {
                    group: "E",
                    game: "ECU-FRA",
                    result: "0:0"
                    }],
                    [{
                    group: "F",
                    game: "NGA-ARG",
                    result: "2:3"
                    },
                {
                    group: "F",
                    game: "BIH-IRN",
                    result: "3:1"
                    }],
                    [{
                    group: "G",
                    game: "USA-GER",
                    result: "0:1"
                    },
                {
                    group: "G",
                    game: "POR-GHA",
                    result: "2:1"
                    }],
                    [{
                    group: "H",
                    game: "KOR-BEL",
                    result: "0:1"
                    },
                {
                    group: "H",
                    game: "ALG-RUS",
                    result: "1:1"
                    }]],
            [{
                game: ["BRA", "CHI"],
                result: ["4", "3"]
            },
            {
                game: ["COL", "URU"],
                result: ["2", "0"]
            },
            {
                game: ["FRA", "NGA"],
                result: ["2", "0"]
            },
             {
                game: ["GER", "ALG"],
                result: ["2", "1"]
            },
            {
                game: ["NED", "MEX"],
                result: ["2", "1"]
            },
            {
                game: ["CRC", "GRE"],
                result: ["6", "4"]
            },
            {
                game: ["ARG", "SUI"],
                result: ["1", "0"]
            },
            {
                game: ["BEL", "USA"],
                result: ["2", "1"]
            }
            ],
            [
            {
                game: ["BRA", "COL"],
                result: ["2", "1"]
            },
            {
                game: ["FRA", "GER"],
                result: ["0", "1"]
            },
            {
                game: ["NED", "CRC"],
                result: ["4", "3"]
            },
            {
                game: ["ARG", "BEL"],
                result: ["1", "0"]
            }
            ],
            [
            {
                game: ["BRA", "GER"],
                result: ["1", "7"]
            },
            {
                game: ["NED", "ARG"],
                result: ["2", "4"]
            }],
            [{
            game: ["GER", "ARG"],
            result: ["0", "1"]
            }]
        ];

    var that = {};

    function getGamesOfDay(key){
        return games[key];
    }
    
    function getGroupGames(key, nation){
        var allGames = [];
        for(var i=key; i<3; i++){
            allGames.push(getGamesOfDay(i));
        }
        var games = [];
        for(var i=0; i<allGames.length; i++){
            for(var j=0; j<allGames[i].length; j++){
                for(var k=0; k<allGames[i][j].length; k++){
                    if(allGames[i][j][k].game.includes(nation)){
                        games.push(allGames[i][j][k]);
                    }
                }
            }
        }
        return games;
    }
    
    that.getGamesOfDay = getGamesOfDay;
    that.getGroupGames = getGroupGames;
    return that;
});
