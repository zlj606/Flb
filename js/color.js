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
    var ele = '<ul><li><a href="#">Home</a></li><li><a href="breed.html">花品资料</a></li>'
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
			Util.bubbleTip(jData.res.err);
			return;
		}
		$('.row-color').html('');
		var arr = jData.res;
		for (var i = 0; i < arr.record.length; ++i) {
			addColor(arr.record[i].fname, arr.record[i].url, 'flower.html',
				arr.record[i].cid, arr.record[i].fid);
		}
	}

    function showPage(items, itemsOnPage) {
        $("#page").pagination({
            displayedPages: 10,
            edges: 1,
            items: items,
            itemsOnPage: itemsOnPage,
            onPageClick: function(pageNum, events) {
                    
			    var jData = {
			    	"controller" : "flower",
			    	"action" : "query_flower_list",
			    	"bid" : bid,
			    	"sid" : sid,
			    	"page" : pageNum
			    }
                    

                Util.get("index.php", jData, pageCallBack);
            },
            onInit: function() {
               
            }
        });
    }

	function callBack(jData) {
		if ("1" != jData.ret) {
			Util.bubbleTip(jData.res.err);
			return;
		}

		var arr = jData.res;

		showPage(arr.record.total, 20);

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
			Util.bubbleTip(jData.res.err);
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

    //获取历史记录
    hisData = {
    	"controller" : "user",
    	"action" : "query_browse_history",
    	"uid" : userId
    }

    function sliderCallBack(jData) {
    	if ("1" != jData.ret) {
			Util.bubbleTip(jData.res.err);
			return;
		}
        try {
            if (0 == jData.res.record.length) {
                return;
            }
        } catch(e) {
            return;
        }
        
        $('.his-title').show();
        $('.bxslider').html('');

        var html = '<li>';
        for (var i = 0; i < jData.res.record.length ; ++i) {
             html += '<div class="col-xs-12 col-lg-3 align-center"><label>'
                   + jData.res.record[i].fname + '</label><a href="'
                   + "flower.html" + '" class="history"><img src="'
                   + Util.flowerurl + jData.res.record[i].flower_url + '"?fid='
                   + jData.res.fid + ' /></a></div>';
            if ((i + 1 ) % 4 == 0) {
                html += '</li>'
                $('.bxslider').append(html);
                if (i + 1 < jData.res.record.length) {
                    html = '<li>';   
                }     
            }
        }

        if ( (i % 4 > 0) && (i % 4 < 4) ) {
            html += '</li>';
            $('.bxslider').append(html);
        }

        $('.bxslider').bxSlider(); 
    }

    Util.get('index.php', hisData, sliderCallBack);
});
