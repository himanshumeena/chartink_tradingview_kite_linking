javascript: (function () {
    if (window.location.host == "in.tradingview.com") {
        try {
            const date = window.location.search.split("?")[1].split("&")[1].split("=")[1].split("-").reverse().join("-");
            window.sessionStorage.goToDateTabLastPickedDate = new Date(date).getTime();

            $("button[data-name='go-to-date']")[0].click();
            setTimeout(() => {
                $("button[data-name='submit-button']")[0].click();
            }, 100);
        } catch (err) {
            console.log("oopss....", err);
        }
    }

    if (window.location.host == "chartink.com") {
        try {
            if (window.chartink) {
                alert("already observing......");
                return;
              }

            const updateTableColumns = async function () {
                const table = $("#backtest-table-data")[0];

                overallRatingTh = document.createElement('th');
                overallRatingTh.innerHTML = "Overall Rating";
                table.tHead.children[0].appendChild(overallRatingTh);

                FinancialsTh = document.createElement('th');
                FinancialsTh.innerHTML = "Financials";
                table.tHead.children[0].appendChild(FinancialsTh);

                EfficiencyTh = document.createElement('th');
                EfficiencyTh.innerHTML = "Efficiency";
                table.tHead.children[0].appendChild(EfficiencyTh);

                ValuationTh = document.createElement('th');
                ValuationTh.innerHTML = "Valuation";
                table.tHead.children[0].appendChild(ValuationTh);

                OwnershipTh = document.createElement('th');
                OwnershipTh.innerHTML = "Ownership";
                table.tHead.children[0].appendChild(OwnershipTh);
            };

            const updateTableCells = async function(ratings) {
                const tableRows = $("#backtest-table-data tr");
                for(let i=1; i<tableRows.length; i++) {
                    const {
                    symbolName,
                    overallRating,
                    Ownership,
                    Valuation,
                    Efficiency,
                    Financials
                    } = ratings[i-1];

                    tdOverallRating = document.createElement('td');
                    tdOverallRating.innerHTML = overallRating;
                    tableRows[i].appendChild(tdOverallRating);

                    tdFinancials = document.createElement('td');
                    tdFinancials.innerHTML = Financials;
                    tableRows[i].appendChild(tdFinancials);

                    tdEfficiency = document.createElement('td');
                    tdEfficiency.innerHTML = Efficiency;
                    tableRows[i].appendChild(tdEfficiency);

                    tdValuation = document.createElement('td');
                    tdValuation.innerHTML = Valuation;
                    tableRows[i].appendChild(tdValuation);

                    tdOwnership = document.createElement('td');
                    tdOwnership.innerHTML = Ownership;
                    tableRows[i].appendChild(tdOwnership);
                }
            };

            const fetchFinlogyData = async function (symbolName) {
                var myHeaders = new Headers();
                myHeaders.append('Content-Type', 'text/plain; charset=UTF-8');

                var res = await fetch(`https://ticker.finology.in/company/${symbolName}`, myHeaders);
                var res2 = await res.text();

                var parser = new DOMParser();
                dom = parser.parseFromString(res2, "text/html");

                const overallRating = dom.getElementById("mainContent_ltrlOverAllRating").getAttribute("style").split(":")[1].split(";")[0];
                const Ownership = dom.getElementById("mainContent_ManagementRating").getAttribute("style").split(":")[1].split(";")[0];
                const Valuation = dom.getElementById("mainContent_ValuationRating").getAttribute("style").split(":")[1].split(";")[0];
                const Efficiency = dom.getElementById("mainContent_EfficiencyRating").getAttribute("style").split(":")[1].split(";")[0];
                const Financials = dom.getElementById("mainContent_FinancialsRating").getAttribute("style").split(":")[1].split(";")[0];

                return {
                    symbolName,
                    overallRating,
                    Ownership,
                    Valuation,
                    Efficiency,
                    Financials
                };
            };

            const chartinkTableUpdater = async function (mutationsList, observer) {
                setTimeout(async function () {
                    const symbols = [];
                    console.log(`mutationsList`, mutationsList);
                    const dateTimeData = $("#backtest-table-data>tbody>tr:first-child>td:last-child").text().split(" ");
                    const date = dateTimeData[0];
                    console.log('date.........', date);

                    let time;
                    if (dateTimeData[1]) {
                        time = dateTimeData[1].split(":").join("_");
                    }

                    if (
                        mutationsList.length &&
                        mutationsList[mutationsList.length - 1].type === "childList"
                    ) {
                        console.log("updating links....");
                        const links = $("#backtest-table-data>tbody").find("a");
                        for (let link of links) {
                            symbols.push(link.innerHTML);
                            link.setAttribute(
                                "href",
                                `https://in.tradingview.com/chart/?symbol=${link.innerHTML}&date=${date}&time=${time}`
                            );
                        }
                        console.log("symbols", symbols);

                        const ratings = [];

                        for (symbol of symbols) {
                            const rating = await fetchFinlogyData(symbol);
                            ratings.push(rating);
                        }
                        console.log("ratings", ratings);
                        updateTableCells(ratings);
                    }
                }, 500);
            };

            const observer = new MutationObserver(chartinkTableUpdater);

            const backTestTable = $("#backtest-table-data>tbody")[0];
            const config = { childList: true };
            observer.observe(backTestTable, config);
            updateTableColumns();


            console.log("observing...........");
            window.chartink = true;
        } catch (err) {
            console.log("oopss....", err);
        }
    }

    if (window.location.host == "kite.zerodha.com") {
        try {
            function holdings_linkify() {
                console.log("holdings_linkify.........");
                const nodes = document.querySelectorAll('td.instrument>span:first-child');
                if (nodes.length == 0) {
                    return;
                }
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    let instrument = node.innerText;

                    let url = `//in.tradingview.com/chart/?symbol=${instrument}`;

                    let anchor = document.createElement('a');
                    anchor.setAttribute('href', url);
                    anchor.setAttribute('target', "_blank");

                    node_copy = node.cloneNode(true);
                    anchor.appendChild(node_copy);
                    node.replaceWith(anchor);
                }
            }

            function watchlist_linkify() {
                console.log("watchlist_linkify.........");
                const nodes = document.querySelectorAll('span.nice-name');
                if (nodes.length == 0) {
                    return;
                }
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    let instrument = node.innerText;

                    let url = `//in.tradingview.com/chart/?symbol=${instrument}`;

                    let anchor = document.createElement('a');
                    anchor.setAttribute('href', url);
                    anchor.setAttribute('target', "_blank");

                    node_copy = node.cloneNode(true);
                    anchor.appendChild(node_copy);
                    node.replaceWith(anchor);
                }
            }

            const holdings_container = document.getElementsByClassName("page-content")[0];
            const watchlist_container = document.getElementsByClassName("vddl-list")[0];

            const config = { childList: true };

            const holdings_callback = function (mutationsList, observer) {
                setTimeout(holdings_linkify, 500);
            };
            const watchlist_callback = function (mutationsList, observer) {
                setTimeout(watchlist_linkify, 500);
            };

            const holdings_observer = new MutationObserver(holdings_callback);
            holdings_observer.observe(holdings_container, config);

            const watchilst_observer = new MutationObserver(watchlist_callback);
            watchilst_observer.observe(watchlist_container, config);

            holdings_linkify();
            watchlist_linkify();

            console.log("observing...........");
        } catch (err) {
            console.log("oopss....", err);
        }
    }
})();
