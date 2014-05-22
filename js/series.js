$(function() {

	if (null == bid) {
		bid = Util.getPara('bid');
	}

	if (null == sid) {
		sid = Util.getPara('sid');
	}
	

	function bscCallBack(jData) {
		var html = '<option value="">请选择颜色</option>';
		 for (var i = 0; i < jData.res.color.length; ++i) {
            html += '<option value="' 
                 + jData.res.color[i].color_id  + '">' 
                 + jData.res.color[i].color_name  + '</option>';
        }

        $('.sel-color').html('');
        $('.sel-color').append(html);
	}

	 //获取数据库的种类，品种，颜色信息
    Util.get("index.php", detailData, bscCallBack);

	function addSeries(fname, url, detail, sId) {
		var html = '<div class="col-6 col-sm-6 col-lg-3"><h2>'
				   + fname + '</h2><img class="img-border" src="'
				   + Util.flowerurl + url + '"series_id="' + sId + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">详情</a></p></div>';
		$('.row-series').append(html);
		//图片下的查看详细信息按钮处理
	    $('.btn-detail').on('click', function() {
	        sessionStorage.setItem('sid',$(this).parent().parent().find('img').attr('series_id'));
	    });
	}

	function pageCallBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}
		$('.row-series').html('');
		var arr = jData.res;
		for (var i = 0; i < arr.record.length; ++i) {
			addSeries(arr.record[i].series_name, arr.record[i].url,'color.html', arr.record[i].sid);
		}
	}

	function callBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

		var arr = jData.res;

		Util.showPage(arr.record.total, 20, pageCallBack);

		$('.row-series').html('');
		for (var i = 0; i < arr.record.length; ++i) {
			addSeries(arr.record[i].fname, arr.record[i].url, 'color.html', arr.record[i].sid);
		}

	}

	var data = {
    	"controller" : "flower",
    	"action" : "query_series",
    	"bid" : bid,
    	"page" : 1
    }
    Util.get(actionPhp, data, callBack);

    //搜索按钮处理
    $('.btn-search').on('click', function() {
    	var cData = {
    		"controller" : "flower",
    		"action" : "query_flower",
    		"series_id" : sid,
    		"color_id" : $('.sel-color').val()
    	};
    	Util.get("index.php", cData, callBack);
    });
    
});
