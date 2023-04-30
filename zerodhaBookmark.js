javascript: (function () {
  function linkify(){
    console.log("linkify.........");
    const nodes = document.querySelectorAll('td.instrument');
    if(nodes.length ==0){
      return;
    }
    for(let i=0; i<nodes.length;i++) {
      let node  = nodes[i];
      let instrument = node.children[0].innerText;

      let url = `//in.tradingview.com/chart/?symbol=${instrument}`;
      
      let anchor = document.createElement('a');
      anchor.setAttribute('href', url);
      anchor.setAttribute('target', "_blank");
      anchor.innerText = instrument;
      node.replaceWith(anchor);
    }
  }

    try {
      const container = document.getElementsByClassName("page-content")[0];
      const config = { childList: true };
  
      const callback = function (mutationsList, observer) {
        console.log("callback.........");
        setTimeout(linkify, 500);
      };
  
      const observer = new MutationObserver(callback);
      observer.observe(container, config);
      console.log("observing...........");
    } catch (err) {
      console.log("oopss....", err);
    }

    linkify();
})();
