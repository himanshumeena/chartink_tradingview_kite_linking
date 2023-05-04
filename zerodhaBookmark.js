javascript: (function () {
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
