javascript: (function () {
  try {
    const backTestTable = $("#backtest-table-data>tbody")[0];

    const config = { childList: true };

    const callback = function (mutationsList, observer) {
      setTimeout(function(){
        console.log(`mutationsList`, mutationsList);
        const date = $("#backtest-table-data>tbody>tr:first-child>td:last-child").text();
        console.log('date.........', date);

        if (
          mutationsList.length &&
          mutationsList[mutationsList.length - 1].type === "childList"
        ) {
          console.log("updating links....");
          const links = $("#backtest-table-data>tbody").find("a");
          for (let link of links) {
            link.setAttribute(
              "href",
              `https://in.tradingview.com/chart/?symbol=${link.innerHTML}&date=${date}`
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
})();