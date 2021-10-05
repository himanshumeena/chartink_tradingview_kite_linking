javascript: (function () {
  try {
    const backTestTable = $("#backtest-table-data>tbody")[0];
    const config = { childList: true };

    const callback = function (mutationsList, observer) {
      console.log(`mutationsList`, mutationsList);
      if (
        mutationsList.length &&
        mutationsList[mutationsList.length - 1].type === "childList"
      ) {
        console.log("updating links....");
        const links = $("#backtest-table-data>tbody").find("a");
        for (let link of links) {
          link.setAttribute(
            "href",
            `https://in.tradingview.com/chart/?symbol=${link.innerHTML}`
          );
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(backTestTable, config);
    console.log("observing...........");
  } catch (err) {
    console.log("oopss....", err);
  }
})();
