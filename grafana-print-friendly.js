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
    var newNode = shareNode.cloneNode(true);
    newNode.setAttribute("aria-label", "Load for printing");
    newNode.querySelector('svg').innerHTML = '<path fill="none" d="M0 0h24v24H0z"></path> <path d="M6 19H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm0-2v-1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1h2V9H4v8h2zM8 4v3h8V4H8zm0 13v3h8v-3H8zm-3-7h3v2H5v-2z"></path>';
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
  
