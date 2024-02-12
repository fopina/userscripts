// ==UserScript==
// @name     Grafana Print-Friendly Dashboard
// @namespace https://github.com/fopina/userscripts
// @version  1
// @grant    none
// @include https://*.grafana.net/*
// @match https://*.grafana.net/*
// ==/UserScript==

// HINT: Add your self-hosted instances of Grafana using User Options
// This userscript also works with iOS UserScripts (https://github.com/quoid/userscripts)

function waitForElement(selector, callback, maxtries = false, interval = 100) {
    const poller = setInterval(() => {
      const el = document.querySelectorAll(selector)
      const retry = maxtries === false || maxtries-- > 0
      if (retry && el.length < 1) return // try again
      clearInterval(poller)
      callback(el || null)
    }, interval)
  }
  
  function doIt() {
    var shareNode = document.querySelectorAll('button[aria-label="Share dashboard"]')[0];
    // FIXME: remove deep clone and add printer svg path
    var newNode = shareNode.cloneNode(true);
    newNode.setAttribute("aria-label", "Load for printing");
    shareNode.insertAdjacentElement("afterend", newNode);
    newNode.onclick = () => {
      // credits to https://github.com/grafana/grafana/issues/13437#issuecomment-1375790162
      // updated for Grafana 10
      var elem = document.getElementsByClassName("grafana-app")[0].getElementsByClassName('scrollbar-view')[0]
          elem.style.overflow='visible'
          elem.parentElement.style.overflow='visible'
          elem.parentElement.parentElement.parentElement.style.overflow='visible'
          window.scrollTo(0, document.body.scrollHeight)
    };
  }
  
  waitForElement('button[aria-label="Share dashboard"]', doIt);
  
