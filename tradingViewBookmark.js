javascript: (function () {
  try {
    const date = window.location.search.split("?")[1].split("&")[1].split("=")[1].split("-").reverse().join("-");
    window.sessionStorage.goToDateTabLastPickedDate = new Date(date).getTime();

    $("div[data-name='go-to-date']")[0].click();
    setTimeout(() => {
      $("button[data-name='submit-button']")[0].click();
    }, 500);
    
  } catch (err) {
    console.log("oopss....", err);
  }
})();
