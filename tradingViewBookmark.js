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
})();
