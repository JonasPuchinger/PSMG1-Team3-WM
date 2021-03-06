// Jakob Fehle

var WMVis = WMVis || {},
    EventPublisher = EventPublisher || {};
WMVis.ElemBracketShowPred = function (predData) {

    "use strict";

    var that = new EventPublisher(),
        preRo16 = predData.ro16,
        preQuarter = predData.quarter,
        preSemi = predData.semi,
        preFinal = predData.final,
        recentChanges = [],
        country,
        backgroundColor = '#f6f6f6',
        backgroundColorHovered = '#C0C0C0',
        preRo16El = document.querySelector('#tournamentBracketsPreKo'),
        preQuarterEl = document.querySelector('#tournamentBracketsPreQuarter'),
        preSemiEl = document.querySelector('#tournamentBracketsPreSemi'),
        preFinalEl = document.querySelector('#tournamentBracketsPreFinal');

    function showPredRow(state, data) {
        recentChanges = [];
        country = data.children[1].innerText;

        switch (state) {
            case 4: //Pre Ro16

                // Get country dependend ID values for every stage of the knockout phase
                var ro16MatchID = parseInt((data.parentNode.parentNode.parentNode.id).replace(/\D/g, ''), 10),
                    qMatchID = Math.round((ro16MatchID) / 2),
                    sMatchID = Math.round((qMatchID) / 2),
                    fMatchID = 1,
                    countryPred = _.find(preRo16, function (obj) {
                        if (obj.country === country) {
                            return true;
                        }
                    }),
                    qTeamID = ((ro16MatchID + 1) % 2) + 1,
                    sTeamID = ((qMatchID + 1) % 2) + 1,
                    fTeamID = ((sMatchID + 1) % 2) + 1;


                // Overwrite the content of each selected box with the predicted probabilities
                preRo16El.querySelector('#q' + qMatchID + ' > table > tbody > tr.team' + qTeamID + ' > td.country > span').innerHTML = (countryPred.quarter * 100).toFixed(2) + ' %';
                preRo16El.querySelector('#s' + sMatchID + ' > table > tbody > tr.team' + sTeamID + ' > td.country > span').innerHTML = (countryPred.semi * 100).toFixed(2) + ' %';
                preRo16El.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span').innerHTML = (countryPred.cup * 100).toFixed(2) + ' %';
                preRo16El.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span').innerHTML = (countryPred.win * 100).toFixed(2) + ' %';

                // Save the boxes for later restoration
                recentChanges.push(preRo16El.querySelector('#q' + qMatchID + ' > table > tbody > tr.team' + qTeamID + ' > td.country > span'));
                recentChanges.push(preRo16El.querySelector('#s' + sMatchID + ' > table > tbody > tr.team' + sTeamID + ' > td.country > span'));
                recentChanges.push(preRo16El.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span'));
                recentChanges.push(preRo16El.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span'));

                for (var i = 0; i < recentChanges.length; i++) {
                    recentChanges[i].closest('tr').style.backgroundColor = backgroundColorHovered;
                    recentChanges[i].closest('tr').style.fontWeight = 'bold';
                }
                $('#tournamentBracketsPreKo span:contains("' + country + '")').closest('tr').css({
                    "background-color": backgroundColorHovered,
                    "font-weight": "bold"
                });
                break;

            case 5: //Pre Quarter
                qMatchID = parseInt((data.parentNode.parentNode.parentNode.id).replace(/\D/g, ''));
                sMatchID = Math.round((qMatchID) / 2);
                fMatchID = 1;
                countryPred = _.find(preQuarter, function (obj) {
                    if (obj.country === country) {
                        return true;
                    }
                });
                sTeamID = ((qMatchID + 1) % 2) + 1;
                fTeamID = ((sMatchID + 1) % 2) + 1;

                preQuarterEl.querySelector('#s' + sMatchID + ' > table > tbody > tr.team' + sTeamID + ' > td.country > span').innerHTML = (countryPred.semi * 100).toFixed(2) + ' %';
                preQuarterEl.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span').innerHTML = (countryPred.cup * 100).toFixed(2) + ' %';
                preQuarterEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span').innerHTML = (countryPred.win * 100).toFixed(2) + ' %';

                recentChanges.push(preQuarterEl.querySelector('#s' + sMatchID + ' > table > tbody > tr.team' + sTeamID + ' > td.country > span'));
                recentChanges.push(preQuarterEl.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span'));
                recentChanges.push(preQuarterEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span'));

                for (i = 0; i < recentChanges.length; i++) {
                    recentChanges[i].closest('tr').style.backgroundColor = backgroundColorHovered;
                    recentChanges[i].closest('tr').style.fontWeight = 'bold';
                }

                $('#tournamentBracketsPreQuarter span:contains("' + country + '")').closest('tr').css({
                    "background-color": backgroundColorHovered,
                    "font-weight": "bold"
                });
                break;

            case 6: //Pre Semi
                sMatchID = parseInt((data.parentNode.parentNode.parentNode.id).replace(/\D/g, ''));
                fMatchID = 1;
                countryPred = _.find(preSemi, function (obj) {
                    if (obj.country === country) {
                        return true;
                    }
                });
                fTeamID = ((sMatchID + 1) % 2) + 1;

                preSemiEl.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span').innerHTML = (countryPred.cup * 100).toFixed(2) + ' %';
                preSemiEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span').innerHTML = (countryPred.win * 100).toFixed(2) + ' %';

                recentChanges.push(preSemiEl.querySelector('#f' + fMatchID + ' > table > tbody > tr.team' + fTeamID + ' > td.country > span'));
                recentChanges.push(preSemiEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span'));


                for (i = 0; i < recentChanges.length; i++) {
                    recentChanges[i].closest('tr').style.backgroundColor = backgroundColorHovered;
                    recentChanges[i].closest('tr').style.fontWeight = 'bold';
                }

                $('#tournamentBracketsPreSemi span:contains("' + country + '")').closest('tr').css({
                    "background-color": backgroundColorHovered,
                    "font-weight": "bold"
                });
                break;

            case 7: //Pre Final
                countryPred = _.find(preFinal, function (obj) {
                    if (obj.country === country) {
                        return true;
                    }
                });

                preFinalEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span').innerHTML = (countryPred.win * 100).toFixed(2) + ' %';

                recentChanges.push(preFinalEl.querySelector('#w1 > table > tbody > tr.team > td.country-winner > span'));

                for (i = 0; i < recentChanges.length; i++) {
                    recentChanges[i].closest('tr').style.backgroundColor = backgroundColorHovered;
                    recentChanges[i].closest('tr').style.fontWeight = 'bold';
                }

                $('#tournamentBracketsPreFinal span:contains("' + country + '")').closest('tr').css({
                    "background-color": backgroundColorHovered,
                    "font-weight": "bold"
                });
                break;
        }
    }

    // Reset the highlighted boxes + predicted probabilities to default
    function resetPreds() {
        if (recentChanges !== undefined) {
            for (var i = 0; i < recentChanges.length; i++) {
                recentChanges[i].innerHTML = 'TBD';
                recentChanges[i].closest('tr').style.backgroundColor = backgroundColor;
                recentChanges[i].closest('tr').style.fontWeight = 'normal';
            }
        }

        $('#tournamentBracketsPreKo span:contains("' + country + '")').closest('tr').css({
            "background-color": backgroundColor,
            "font-weight": "normal"
        });

        $('#tournamentBracketsPreQuarter span:contains("' + country + '")').closest('tr').css({
            "background-color": backgroundColor,
            "font-weight": "normal"
        });

        $('#tournamentBracketsPreSemi span:contains("' + country + '")').closest('tr').css({
            "background-color": backgroundColor,
            "font-weight": "normal"
        });

        $('#tournamentBracketsPreFinal span:contains("' + country + '")').closest('tr').css({
            "background-color": backgroundColor,
            "font-weight": "normal"
        });

        recentChanges = [];
    }


    that.showPredRow = showPredRow;
    that.resetPreds = resetPreds;
    return that;
}
