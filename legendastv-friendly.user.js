// ==UserScript==
// @name           LegendasTV
// @namespace      http://fopina.co.cc
// @description    Friendlier....
// @include        http://legendas.tv/*
// ==/UserScript==

function abredownAux(event) {
	if (event.shiftKey) {
		window.location = 'http://legendas.tv/info.php?d=' + event.currentTarget.downloadId + '&c=1';
	}
	else {
		window.location = 'javascript:abredown("' + event.currentTarget.downloadId + '");';
	}
}

// default language to "Todos" (all)
document.getElementById('int_idioma').value = '99';

// search results
var content = document.getElementById('conteudodest');
if (content) {
	var results = content.getElementsByTagName('span');
	for (i = 0; i < results.length; i++) {
		if (results[i].childNodes.length > 0) {
			var table = results[i].childNodes[0];
			if (table.attributes && table.getAttribute('class').indexOf('busca') === 0) {
				var id = table.getAttribute('onclick').split("'")[1];
				table.setAttribute('onclick', '');
				table.downloadId = id;
				table.addEventListener("click", abredownAux, false);
			}
		}
	}
}