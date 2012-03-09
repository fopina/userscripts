// ==UserScript==
// @name           Magnet-Transmission
// @namespace      http://fopina.co.cc
// @description    PirateBay + Transmission
// @include        https://thepiratebay.se/*
// @include        http://thepiratebay.se/*
// ==/UserScript==

function sendToTransmissionClick(event) {
	event.preventDefault();
	event.stopPropagation();
	var href = event.currentTarget.getAttribute('href');
	var bthost = GM_getValue('bthost');
	/*
	 If you need to change the value of 'bthost', just go to about:config, filter 'bthost'
	 and either change it there or reset it (and the prompt will show up again)
	 */
	if (!bthost) {
		bthost = prompt('Your Transmission RPC URL - including /transmission/rpc', '');
		GM_setValue('bthost', bthost);
	}
	var btsession = GM_getValue('btsession');
	var request = {
		method: 'torrent-add',
		arguments: {
			filename: href
		}
	};
	var gmrequest = {
		method: 'POST',
		url: bthost,
		data: JSON.stringify(request),
		headers: {
			'X-Transmission-Session-Id': btsession,
			'Content-Type': 'json'
		}
	};
	gmrequest.onerror = function (resp) {
		alert('Error connecting to your transmission host: ' + bthost);
	};
	gmrequest.onload = function (resp) {
		if (resp.status == 409) {
			var reply = resp.responseHeaders.split('X-Transmission-Session-Id: ')[1].split('\n')[0];
			// Uncomment the line below if you're using this in NinjaKit (at least with Safari and this version http://misuzi.me/files/NinjaKit.safariextz)
			// reply = reply.substring(0, reply.length - 1);
			GM_setValue('btsession', reply);
			btsession = reply;
			GM_log('Acquired token ' + reply);
			gmrequest.headers['X-Transmission-Session-Id'] = btsession;
			gmrequest.onload = function (resp2) {
				if (resp2.status == 409) {
					alert('Failed to use CSFR token');
				}
				else {
					var obj = eval('(' + resp2.responseText + ')');
					alert('Result: ' + obj.result);
				}
			};
			GM_xmlhttpRequest(gmrequest);
		}
		else {
			var obj = eval('(' + resp.responseText + ')');
			alert('Result: ' + obj.result);
		}
	};
	GM_xmlhttpRequest(gmrequest);
}

function replaceMagnetLinks() {
	links = document.getElementsByTagName('a');
	for (i = 0; i < links.length; i++) {
		var link = links[i];
		href = link.getAttribute('href');
		title = link.getAttribute('title');
		if ((href.indexOf('magnet:') === 0) && (title != 'Send to Transmission')) {
			var newlink = link.cloneNode(true);
			newlink.setAttribute('title', 'Send to Transmission');
			newlink.addEventListener("click", sendToTransmissionClick, false);
			var img = newlink.childNodes[0];
			img.setAttribute('src','http://www.transmissionbt.com/favicon.ico');
			img.setAttribute('width', 12);
			img.setAttribute('height', 12);
			link.appendChild(newlink);
		}
	}
}

replaceMagnetLinks();