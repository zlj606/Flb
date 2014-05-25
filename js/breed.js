$(document).ready(function() {

    //面包屑导航处理
    $('#breadCrumb3').empty();
    var ele = '<ul>'
            + '<li><a href="#">Home</a></li>'
            + '<li><a href="#">花品资料</a></li>'
            + '</ul>';
    $('#breadCrumb3').append(ele);
    $('#breadCrumb3').jBreadCrumb();


	function addBreed(fname, url, detail, bid) {
        if ('' == fname) {
            fname = "未命名";
        }
		var html = '<div class="col-xs-12 col-sm-6 col-lg-3 text-center"><h2 class="fname">'
				   + fname + '</h2><img class="img-border" src="'
				   + Util.flowerurl + url + '" breed_id="' + bid 
                   + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">详情</a></p></div>';
		$('.row-breed').append(html);

        $('.btn-detail').on('click', function() {
            sessionStorage.setItem('bid',$(this).parent().parent().find('img').attr('breed_id'));
            sessionStorage.setItem('bname',$(this).parent().parent().find('.fname').text());
        });
	}


    function pageCallBack(jData) {
        if ("1" != jData.ret) {
            Util.bubbleTip(jData.res.err);
            return;
        }
        $('.row-breed').html('');
        var arr = jData.res;
        for (var i = 0; i < arr.record.length; ++i) {
            addBreed(arr.record[i].fname, arr.record[i].url, 'series.html',  arr.record[i].bid);
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
                    "action" : "query_breed",
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

        $('.row-breed').html('');
		for (var i = 0; i < arr.record.length; ++i) {
			addBreed(arr.record[i].fname, arr.record[i].url, 'series.html', arr.record[i].bid);
		}

	}
    var data = {
    	"controller" : "flower",
    	"action" : "query_breed",
    	"page" : 1
    }
    Util.get(actionPhp, data, callBack);

    function addSlider(fname, link, url, html) {
        html += '<div class="col-xs-12 col-lg-3"><label>'
    	           + fname + '</label><a href="'
    	           + link + '"><img src="'
    	           + url + '" /></a></div>';
    }

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
                   + jData.res.record[i].fid + ' /></a></div>';
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
