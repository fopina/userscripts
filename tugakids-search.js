// ==UserScript==
// @name     Tugakids Search on Mobile
// @namespace https://github.com/fopina/userscripts
// @version  1
// @grant    none
// @include https://www.tugakids.com/*
// @match https://www.tugakids.com/*
// @updateURL https://raw.githubusercontent.com/fopina/userscripts/main/tugakids-search.js
// ==/UserScript==

// This userscript also works with iOS UserScripts (https://github.com/quoid/userscripts)

head = document.getElementsByTagName('head')[0];
if (!head) { return; }
var css = document.createElement("style");
css.type = 'text/css';
css.innerHTML = "@media only screen and (max-width: 888px) {.header .box_h .buscador {display:block;}}";
head.appendChild(css);
