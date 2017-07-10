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
                    game: "CMR-MEX",
                    result: "0:1"
                    }],
                    [{
                    group: "B",
                    game: "NED-ESP",
                    result: "5:1"
                    },
                {
                    group: "B",
                    game: "AUS-CHI",
                    result: "1:3"
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
                    game: "CRC-URU",
                    result: "3:1"
                    },
                {
                    group: "D",
                    game: "ENG-ITA",
                    result: "1:2"
                    }],
                    [{
                    group: "E",
                    game: "ECU-SUI",
                    result: "1:2"
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
                    game: "ALG-BEL",
                    result: "1:2"
                    },
                {
                    group: "H",
                    game: "KOR-RUS",
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
                    game: "CHI-ESP",
                    result: "2:0"
                    }],
                    [{
                    group: "C",
                    game: "COL-CIV",
                    result: "2:1"
                    },
                {
                    group: "C",
                    game: "GRE-JPN",
                    result: "0:0"
                    }],
                    [{
                    group: "D",
                    game: "ENG-URU",
                    result: "1:2"
                    },
                {
                    group: "D",
                    game: "CRC-ITA",
                    result: "1:0"
                    }],
                    [{
                    group: "E",
                    game: "FRA-SUI",
                    result: "5:2"
                    },
                {
                    group: "E",
                    game: "ECU-HON",
                    result: "2:1"
                    }],
                    [{
                    group: "F",
                    game: "ARG-IRN",
                    result: "1:0"
                    },
                {
                    group: "F",
                    game: "BIH-NGA",
                    result: "0:1"
                    }],
                    [{
                    group: "G",
                    game: "GHA-GER",
                    result: "2:2"
                    },
                {
                    group: "G",
                    game: "POR-USA",
                    result: "2:2"
                    }],
                    [{
                    group: "H",
                    game: "BEL-RUS",
                    result: "1:0"
                    },
                {
                    group: "H",
                    game: "ALG-KOR",
                    result: "4:2"
                    }]],
                    [[{
                    group: "A",
                    game: "BRA-CMR",
                    result: "4:1"
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
                    game: "CHI-NED",
                    result: "0:2"
                    }],
                    [{
                    group: "C",
                    game: "COL-JPN",
                    result: "4:1"
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
                    game: "ARG-NGA",
                    result: "3:2"
                    },
                {
                    group: "F",
                    game: "BIH-IRN",
                    result: "3:1"
                    }],
                    [{
                    group: "G",
                    game: "GER-USA",
                    result: "1:0"
                    },
                {
                    group: "G",
                    game: "GHA-POR",
                    result: "1:2"
                    }],
                    [{
                    group: "H",
                    game: "BEL-KOR",
                    result: "1:0"
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

    function getGamesOfDay(key) {
        return games[key];
    }
    
    function getGames(key, group){
        var games,
            gamesOfDay = getGamesOfDay(key);
        for(let i=0; i<gamesOfDay.length; i++){
            if(gamesOfDay[i][0].group === group){
                games = gamesOfDay[i];
                console.log(games);
                break;
            }
        }
        return games;
    }

    function getGroupGames(key, nation) {
        var allGames = [];
        for (var i = key; i < 3; i++) {
            allGames.push(getGamesOfDay(i));
        }
        var games = [];
        for (var i = 0; i < allGames.length; i++) {
            for (var j = 0; j < allGames[i].length; j++) {
                for (var k = 0; k < allGames[i][j].length; k++) {
                    if (allGames[i][j][k].game.includes(nation)) {
                        games.push(allGames[i][j][k]);
                    }
                }
            }
        }
        return games;
    }

    that.getGamesOfDay = getGamesOfDay;
    that.getGames = getGames;
    that.getGroupGames = getGroupGames;
    return that;
});
