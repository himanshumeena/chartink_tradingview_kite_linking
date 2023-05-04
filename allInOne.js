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
            const backTestTable = $("#backtest-table-data>tbody")[0];
            const config = { childList: true };

            const callback = function (mutationsList, observer) {
                setTimeout(function () {
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
                            link.setAttribute(
                                "href",
                                `https://in.tradingview.com/chart/?symbol=${link.innerHTML}&date=${date}&time=${time}`
                            );
                        }
                    }
                }, 500);
            };

            const observer = new MutationObserver(callback);
            observer.observe(backTestTable, config);
            console.log("observing...........");
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
