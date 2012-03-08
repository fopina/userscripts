var bthost = 'http://skcell:9091/transmission/rpc'
var csrf = 'X-Transmission-Session-Id: InGzEFwuPoxIE2ztHaL0iHkoXuVEhbuCbwaGRk5PZSrWR7Cl'
var request = new XMLHttpRequest();
request.open('GET',bthost,false)
request.send(null);
print(request.responseText);
var request = new GM_addStyle(); request.open("GET","http://skcell:9091/transmission/rpc",false); request.send(null);')

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://localhost:8080/',
	onload: function (resp) {
		GM_log('got results');
	},
	onerror: function (resp) {
		GM_log('got error');
	}
});
GM_log('test log 3000');

links = document.getElementsByTagName('a');
for (i = 0; i < links.length; i++) {
	href = links[i].getAttribute('href');
	if (href.indexOf('magnet:') == 0) {
		var s = GM_getValue('a');
		GM_setValue('a', s + 1);
		links[i].setAttribute('href', 'javascript:alert(GM_getValue("a"))');
		//console.log('Link ' + i + ': ' + links[i].setAttribute('href', 'http://www.winzip.com/'));
	}
}