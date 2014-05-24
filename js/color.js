$(function() {
	if (null == bid) {
		bid = Util.getPara('bid');
	}

	if (null == sid) {
		sid = Util.getPara('sid');
	}


	function addColor(fname, url, detail,cid, fid) {
		if ('' == fname) {
			fname = "未命名";
		}
		var html = '<div class="col-xs-12 col-sm-6 col-lg-3 text-center"><h2>'
				   + fname + '</h2><img class="img-border" src="'
				   + Util.flowerurl + url + '"color_id="' + cid + '"flower_id="' 
				   + fid + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">详情</a></p></div>';
		$('.row-color').append(html);
		//图片下的查看详细信息按钮处理
	    $('.btn-detail').on('click', function() {
	        sessionStorage.setItem('cid',$(this).parent().parent().find('img').attr('color_id'));
	        sessionStorage.setItem('fid',$(this).parent().parent().find('img').attr('flower_id'));
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
			addColor(arr.record[i].fname, arr.record[i].url, 'flower.html',
				arr.record[i].cid, arr.record[i].fid);
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
			addColor(arr.record[i].fname, arr.record[i].url, 'flower.html', 
				arr.record[i].cid, arr.record[i].fid);
		}

	}

	var data = {
    	"controller" : "flower",
    	"action" : "query_flower_list",
    	"bid" : bid,
    	"sid" : sid,
    	"page" : 1
    }
    Util.get(actionPhp, data, callBack);

    function fCallBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

		var arr = jData.res;

		Util.showPage(arr.record.total, 20, pageCallBack);

		$('.row-series').html('');
		for (var i = 0; i < arr.record.length; ++i) {
			addColor(arr.record[i].fname, Util.flowerurl + arr.record[i].url, 'flower.html', arr.record[i].sid);
		}

	}

     //搜索按钮处理
    $('.btn-search').on('click', function() {
    	var cData = {
    		"controller" : "flower",
    		"action" : "query_flower_list",
    		"sid" : sid,
    		"bid": bid,
    		"cid" : $('.sel-color').val()
    	};
    	Util.get("index.php", cData, fCallBack);
    });
});
