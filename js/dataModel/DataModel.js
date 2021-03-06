var WMVis = WMVis || {};
var EventPublisher = EventPublisher || {};
var d3 = d3 || {};
WMVis.DataModel = function () {
    "use strict";

    var that = new EventPublisher(),
        compareG = propComp('win_group'),
        compareAlphabetic = propComp('country'),
        compareF = propComp('win'),
        preTournament,
        matchday1,
        matchday2,
        matchday3,
        ro16,
        quarter,
        semi,
        final,
        teamsWithTournamentProgression,
        countryDictionary = {};


    //<Jakob Fehle>

    function init() {
        loadCSVData();
    }

    function loadCSVData() {
        loadPreTournament();
    }

    function loadPreTournament() {
        d3.csv("../../data/pre_tournament.csv", function (data) {
            //Sortierung nach Gruppen + Chance WM-Sieg
            data.sort(groupSort());
            preTournament = data;
            preTournament.name = 'preTournament';

            loadMatchday1();
        });
    }

    function loadMatchday1() {
        d3.csv("../../data/matchday1_abcd.csv", function (data1) {
            d3.csv("../../data/matchday1_efgh.csv", function (data2) {

                //Zusammenschneiden der Datensätze
                matchday1 = computeGroupData(data1, data2);
                matchday1.name = 'matchday1';

                //nächsten Async Task anstoßen
                loadMatchday2();
            });
        });
    }

    function loadMatchday2() {
        d3.csv("../../data/matchday2_abcd.csv", function (data1) {
            d3.csv("../../data/matchday2_efgh.csv", function (data2) {
                matchday2 = computeGroupData(data1, data2);
                matchday2.name = 'matchday2';
                loadMatchday3();
            });
        });
    }

    function loadMatchday3() {
        d3.csv("../../data/matchday3_abcd.csv", function (data1) {
            d3.csv("../../data/matchday3_efgh.csv", function (data2) {
                matchday3 = computeGroupData(data1, data2);
                matchday3.name = 'matchday3';
                loadRo16();
            });
        });
    }

    function loadRo16() {
        d3.csv("../../data/matchday3_abcd.csv", function (data1) {
            d3.csv("../../data/matchday3_efgh.csv", function (data2) {
                data1.sort(compareG);
                data2.sort(compareG);
                var data = (data1.slice(0, 16)).concat(data2.slice(16)),
                    cutData = [];

                //Filtern nach Achtelfinal-Kandidaten
                for (var entry of data) {
                    if (entry.sixteen == 1) {
                        cutData.push(entry);
                    }
                }
                ro16 = cutData;
                ro16.name = 'ro16';

                loadQuarter();
            });
        });
    }

    function loadQuarter() {
        d3.csv("../../data/pre_quarter.csv", function (data) {
            data.sort(compareG);
            var cutData = [];
            for (let entry of data) {
                if (entry.quarter == 1) {
                    cutData.push(entry);
                }
            }
            quarter = cutData;
            quarter.name = 'quarter';
            loadSemi();
        });
    }

    function loadSemi() {
        d3.csv("../../data/pre_semi.csv", function (data) {
            data.sort(compareG);
            var cutData = [];
            for (let entry of data) {
                if (entry.semi == 1) {
                    cutData.push(entry);
                }
            }
            semi = cutData;
            semi.name = 'semi';
            loadFinal();
        });
    }

    function loadFinal() {
        d3.csv("../../data/pre_final.csv", function (data) {
            data.sort(compareG);
            var cutData = [];
            for (let entry of data) {
                if (entry.cup == 1) {
                    cutData.push(entry);
                }
            }
            final = cutData;
            final.name = 'final';
            loadTournamentProgress();
        });
    }

    function loadTournamentProgress() {
        let tournamentProgress = [];
        let tournamentPhases = [preTournament, matchday1, matchday2, matchday3, quarter, semi, final];

        for (let i = 0; i < preTournament.length; i++) {
            tournamentProgress[i] = {};
            tournamentProgress[i].country = preTournament[i].country;
            tournamentProgress[i].country_id = preTournament[i].country_id;
        }


        for (let phase of tournamentPhases) {
            for (let i = 0; i < phase.length; i++) {
                _.each(phase, function (country) {
                    let placeholder = {}
                    placeholder = _.find(tournamentProgress, function (entry) {
                        return country.country_id == entry.country_id;
                    })
                    placeholder[phase.name] = country.win;
                })
            }
        }
        teamsWithTournamentProgression = tournamentProgress;

        createCountryDictionary();
        that.notifyAll("finishedLoading");
    }

    //Ausgeben der Datensätze
    function getPreTournament() {
        return preTournament;
    }

    function getMatchday1() {
        return matchday1;
    }

    function getMatchday2() {
        return matchday2;
    }

    function getMatchday3() {
        return matchday3;
    }

    function getRo16() {
        return ro16;
    }

    function getQuarter() {
        return quarter;
    }

    function getSemi() {
        return semi;
    }

    function getFinal() {
        return final;
    }

    function getTournamentProgress() {
        return teamsWithTournamentProgression;
    }

    //Sortiert zwei Datensätze und schneidet sie zusammen
    function computeGroupData(d1, d2) {
        //Sortierung nach Gruppe + Chance auf Gruppensieg
        d1.sort(groupSort());
        d2.sort(groupSort());
        return (d1.slice(0, 16)).concat(d2.slice(16));
    }


    //Sortierfunktion nach Gruppe
    function propComp(prop) {
        return function (a, b) {
            if (a.group.charCodeAt(0) < b.group.charCodeAt(0)) {
                return -1;
            }
            if (a.group.charCodeAt(0) > b.group.charCodeAt(0)) {
                return 1;
            }
            if (a[prop] > b[prop]) {
                return -1;
            }
            if (a[prop] < b[prop]) {
                return 1;
            }
            return 0;
        }
    }

    function groupSort() {
        return function (a, b) {
            if (a.group.charCodeAt(0) < b.group.charCodeAt(0)) {
                return -1;
            }
            if (a.group.charCodeAt(0) > b.group.charCodeAt(0)) {
                return 1;
            }
            if (a.country.charCodeAt(0) < b.country.charCodeAt(0)) {
                return -1;
            }
            if (a.country.charCodeAt(0) > b.country.charCodeAt(0)) {
                return 1;
            }
            return 0;
        }
    }

    function createCountryDictionary() {
        for (var i = 0; i < preTournament.length; i++) {
            countryDictionary[(preTournament[i].country_id)] = preTournament[i].country;
        }
    }

    function getCountryDictionary() {
        return countryDictionary;
    }
    //</Jakob Fehle>


    //<Jonas Puchinger>
    function getNationsAbbrs(nations) {
        var parser,
            doc,
            abbrs = [];

        var indexIC = getIndexOfEntry(nations, "Ivory Coast");
        nations[indexIC[0]][indexIC[1]] = "Côte d\'Ivoire";
        var indexEN = getIndexOfEntry(nations, "England");
        nations[indexEN[0]][indexEN[1]] = "United Kingdom";
        var indexIR = getIndexOfEntry(nations, "Iran");
        nations[indexIR[0]][indexIR[1]] = "Iran (Islamic Republic of)";
        var indexUS = getIndexOfEntry(nations, "USA");
        nations[indexUS[0]][indexUS[1]] = "United States of America";

        $.ajax({
            url: '../../data/flags/sourcecode.txt',
            type: 'get',
            success: function (sourcecode) {
                parser = new DOMParser();
                doc = parser.parseFromString(sourcecode, "text/html");

                for (let i = 0; i < nations.length; i++) {
                    var abbrsGroup = [];
                    for (let j = 0; j < nations[i].length; j++) {
                        abbrsGroup.push(doc.querySelector('[title="' + nations[i][j] + '"] .alpha-2').innerHTML.toLowerCase());
                    }
                    abbrs.push(abbrsGroup);
                }
            }
        });
        return abbrs;
    }

    function getIndexOfEntry(arr, entry) {
        for (var i = 0; i < arr.length; i++) {
            var index = arr[i].indexOf(entry);
            if (index > -1) {
                return [i, index];
            }
        }
    }
    //</Jonas Puchinger>

    //<Vanessa Hahn>    
    function getMatchday(currentState) {
        switch (currentState) {
            case 0:
                return getPreTournament();
            case 1:
                return getMatchday1();
            case 2:
                return getMatchday2();
            case 3:
                return getMatchday3();
            case 4:
                return getRo16();
            case 5:
                return getQuarter();
            case 6:
                return getSemi();
            case 7:
                return getFinal();
        }
    }
    //</Vanessa Hahn>    

    that.init = init;
    that.getMatchday = getMatchday;
    that.getTournamentProgress = getTournamentProgress;
    that.getNationsAbbrs = getNationsAbbrs;
    that.getCountryDictionary = getCountryDictionary;
    return that;
};
