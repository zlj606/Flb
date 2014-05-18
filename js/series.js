$(function() {
	function addSeries(fname, url, detail) {
		var html = 'div class="col-6 col-sm-6 col-lg-3"><h2>'
				   + fname + '</h2><img src="'
				   + url + '"></img><p><a class="btn btn-default" href="'
				   + detail + '" role="button">View details &raquo;</a></p></div>';
		$('.row-series').append(html);
	}

	function pageCallBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}
		$('.row-series').html('');
		var arr = jData.res;
		for (var i = 0; i < arr.length; ++i) {
			addSeries(arr[i].fname, arr[i].url, 'flower.html');
		}
	}

	function callBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

		var arr = jData.res;

		Util.showPage(arr.total, 20, pageCallBack);

		$('.row-series').html('');
		for (var i = 0; i < arr.length; ++i) {
			addSeries(arr[i].fname, arr[i].url, 'flower.html');
		}

	}

	var data = {
    	"controller" : "flower",
    	"action" : "query_series",
    	"page" : 1
    }
    Util.get(actionPhp, data, callBack);
});