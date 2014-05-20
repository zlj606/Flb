$(function() {
	if (null == bid) {
		bid = Util.getPara('bid');
	}

	if (null == sid) {
		sid = Util.getPara('sid');
	}

	function addColor(fname, url, detail,cid) {
		var html = '<div class="col-6 col-sm-6 col-lg-3"><h2>'
				   + fname + '</h2><img src="'
				   + Util.flowerurl + url + '"color_id="' + cId + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">View details &raquo;</a></p></div>';
		$('.row-color').append(html);
		//图片下的查看详细信息按钮处理
	    $('.btn-detail').on('click', function() {
	        sessionStorage.setItem('cid',$(this).parent().parent().find('img').attr('color_id'));
	    });
	}

	function pageCallBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}
		$('.row-color').html('');
		var arr = jData.res;
		for (var i = 0; i < arr.record.length; ++i) {
			addSeries(arr.record[i].fname, arr.record[i].url, arr.record[i].series_id,'flower.html');
		}
	}

	function callBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

		var arr = jData.res;

		Util.showPage(arr.record.total, 20, pageCallBack);

		$('.row-color').html('');
		for (var i = 0; i < arr.record.length; ++i) {
			addSeries(arr.record[i].fname, arr.record[i].url, 'flower.html');
		}

	}

	var data = {
    	"controller" : "flower",
    	"action" : "query_color",
    	"bid" : bid,
    	"sid" : sid,
    	"page" : 1
    }
    Util.get(actionPhp, data, callBack);
});