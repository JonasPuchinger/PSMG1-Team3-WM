var WMVis = WMVis || {},
    d3 = d3 || {};

WMVis.DataModel = function () {
    "use strict";

    var that = new EventPublisher(),
        compareG = propComp('win_group'),
        /* 
        compareRo16 = propComp('quarter'),
        compareQ = propComp('semi'),
        compareS = propComp('cup'),
        */
        compareF = propComp('win'),
        preTournament = null,
        matchday1 = null,
        matchday2 = null,
        matchday3 = null,
        ro16 = null,
        quarter = null,
        semi = null,
        final = null;

    function init() {

    }

    //Einlesen u. Ausgeben der Datensätze
    function getMatchday1() { 
        
        //Datensatz bereits eingelesen?
        if (matchday1 === null) {
            d3.csv("../../data/matchday1_abcd.csv", function (data1) {
                d3.csv("../../data/matchday1_efgh.csv", function (data2) {
                    
                    //Zusammenschneiden der Datensätze
                    matchday1 = computeGroupData(data1, data2);
                    
                    //Return-Event anstoßen
                    that.notifyAll("recieveMd1", matchday1);
                });
            });
        }
        //Bereits eingelesen -> Return-Event
            else {
                that.notifyAll("recieveMd1", matchday1);
            }
    }

    function getMatchday2() { 
        if (matchday2 === null) {
            d3.csv("../../data/matchday2_abcd.csv", function (data1) {
                d3.csv("../../data/matchday2_efgh.csv", function (data2) {
                    matchday2 = computeGroupData(data1, data2);
                    that.notifyAll("recieveMd2", matchday2);

                });
            });
        }
            else {
                that.notifyAll("recieveMd2", matchday2);
            }
    }

    function getMatchday3() { 
        if  (matchday3 === null) {
            d3.csv("../../data/matchday3_abcd.csv", function (data1) {
                d3.csv("../../data/matchday3_efgh.csv", function (data2) {
                    matchday3 = computeGroupData(data1, data2);
                    that.notifyAll("recieveMd3", matchday3);
                });
            });
        }
            else {
                that.notifyAll("recieveMd3", matchday3);
            }
    }

    function getRo16() {
        if (ro16 === null) {
            d3.csv("../../data/matchday3_abcd.csv", function (data1) {
                d3.csv("../../data/matchday3_efgh.csv", function (data2) {
                    data1.sort(compareG);
                    data2.sort(compareG);
                    var data = (data1.slice(0, 16)).concat(data2.slice(16)),
                        cutData = [];
                    
                    //Filtern nach Achtelfinal-Kandidaten
                    for (let entry of data) {
                        if(entry.sixteen == 1) {
                            cutData.push(entry);
                        }
                    }
                    ro16 = cutData;                
                    that.notifyAll("recieveRo16", ro16);

                });
            });
        }
            else {
                that.notifyAll("recieveRo16", ro16);
            }
    }

    function getQuarter() {
        if (quarter === null) {
            d3.csv("../../data/pre_quarter.csv",function (data) {
                data.sort(compareG);
                var cutData = [];
                for (let entry of data) {
                    if (entry.quarter == 1) {
                        cutData.push(entry);
                    }
                }
                quarter = cutData;
                that.notifyAll("recieveQuarter", quarter);

            });
        }
            else {
                that.notifyAll("recieveQuarter", quarter);
            }
    }

    function getSemi() {
        if (semi === null) {
            d3.csv("../../data/pre_semi.csv",function (data) {
                data.sort(compareG);
                var cutData = [];
                for (let entry of data) {
                    if (entry.semi == 1) {
                        cutData.push(entry);
                    }
                }
                semi = cutData;
                that.notifyAll("recieveSemi", semi);

            });
        }
        else {
            that.notifyAll("recieveSemi", semi);
        }
    }

    function getFinal() {
        if (final === null) {
            d3.csv("../../data/pre_final.csv",function (data) {
                data.sort(compareG);
                var cutData = [];
                for (let entry of data) {
                    if (entry.cup == 1) {
                        cutData.push(entry);
                    }
                }
                final = cutData;
                that.notifyAll("recieveFinal", final);

            });
        }
            else {
                that.notifyAll("recieveFinal", final);
            }
    }
    
    function getPreTournament() {
        if (preTournament === null) {
            d3.csv("../../data/pre_tournament.csv",function (data) {
                
                //Sortierung nach Gruppen + Chance WM-Sieg
                data.sort(compareF);

                preTournament = data;
                that.notifyAll("recievePreTournament", preTournament);
            });
        }
            else {
                that.notifyAll("recievePreTournament", preTournament);
            }
    }


    //Sortiert zwei Datensätze und schneidet sie zusammen
    function computeGroupData(d1, d2) {
        //Sortierung nach Gruppe + Chance auf Gruppensieg
        d1.sort(compareG); 
        d2.sort(compareG);
        return (d1.slice(0, 16)).concat(d2.slice(16));
    }


    //Sortierfunktion nach Gruppe
    function propComp(prop) { 
        return function(a,b) {
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


    that.init = init;

    that.getMatchday1 = getMatchday1;
    that.getMatchday2 = getMatchday2;
    that.getMatchday3 = getMatchday3;
    that.getRo16 = getRo16;
    that.getQuarter = getQuarter;
    that.getSemi = getSemi;
    that.getFinal = getFinal;
    that.getPreTournament = getPreTournament;

    return that;
};
