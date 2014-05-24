$(function() {
	if (null == bid) {
		bid = Util.getPara('bid');
	}

	if (null == sid) {
		sid = Util.getPara('sid');
	}

	//面包屑导航处理
    $('#breadCrumb3').empty();
    var bname = sessionStorage.getItem('bname'),
    	sname = sessionStorage.getItem('sname');
    var ele = '<ul><li><a href="breed.html">花品资料</a></li>'
    	    + '<li><a href="series.html">' + bname + '</a></li>'
    	    + '<li><a href="#">' + sname + '</a></li></ul>';
    $('#breadCrumb3').append(ele);
    $('#breadCrumb3').jBreadCrumb();
    
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
    
	function addColor(fname, url, detail,cid, fid) {
		if ('' == fname) {
			fname = "未命名";
		}
		var html = '<div class="col-xs-12 col-sm-6 col-lg-3 text-center"><h2 class="fname">'
				   + fname + '</h2><img class="img-border" src="'
				   + Util.flowerurl + url + '"color_id="' + cid + '"flower_id="' 
				   + fid + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">详情</a></p></div>';
		$('.row-color').append(html);
		//图片下的查看详细信息按钮处理
	    $('.btn-detail').on('click', function() {
	        sessionStorage.setItem('cid',$(this).parent().parent().find('img').attr('color_id'));
	        sessionStorage.setItem('fid',$(this).parent().parent().find('img').attr('flower_id'));
	        sessionStorage.setItem('cname',$(this).parent().parent().find('.fname').text());
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

		$('.row-color').html('');
		for (var i = 0; i < arr.record.length; ++i) {
			addColor(arr.record[i].fname, arr.record[i].url, 'flower.html', 
				arr.record[i].cid, arr.record[i].fid);
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
