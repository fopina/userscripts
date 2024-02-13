// ==UserScript==
// @name     Tugakids Download Button
// @namespace https://github.com/fopina/userscripts
// @version  1
// @grant    none
// @include https://www.tugakids.com/*
// @match https://www.tugakids.com/*
// @updateURL https://raw.githubusercontent.com/fopina/userscripts/main/tugakids-download.js
// ==/UserScript==

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
  
unction doIt() {
    var videoSrc = document.querySelectorAll('video.video-js source')[0];
    var link = document.createElement("div");
    link.innerHTML = '<a href="' + videoSrc.getAttribute('src') + '">Download</a>';
    videoSrc.parentElement.insertAdjacentElement("afterend", link.firstChild);
}
  
waitForElement('video.video-js source', doIt);
 
