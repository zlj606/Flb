$(function() {

	function addBreed(fname, url, detail, bid) {
		var html = '<div class="col-6 col-sm-6 col-lg-3 img-border"><h2>'
				   + fname + '</h2><img src="'
				   + Util.flowerurl + url + '" breed_id="' + bid + '"></img><p><a class="btn btn-default btn-detail" href="'
				   + detail + '" role="button">View details &raquo;</a></p></div>';
		$('.row-breed').append(html);

        $('.btn-detail').on('click', function() {
            sessionStorage.setItem('bid',$(this).parent().parent().find('img').attr('breed_id'));
        });
	}


    function pageCallBack(jData) {
        if ("1" != jData.ret) {
            alert(jData.res.err);
            return;
        }
        $('.row-breed').html('');
        var arr = jData.res;
        for (var i = 0; i < arr.record.length; ++i) {
            addBreed(arr.record[i].fname, arr.record[i].url,  arr.record[i].bid, 'series.html');
        }
    }

	function callBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

		var arr = jData.res;

		Util.showPage(arr.record.total, 20, pageCallBack);

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
    data = {
    	"controller" : "user",
    	"action" : "query_browse_history",
    	"uid" : userId
    }

    function sliderCallBack(jData) {
    	if ("1" != jData.ret) {
			alert(jData.res.err);
			return;
		}

        $('.bxslider').html('');

        var html = '<li>';
        for (var i = 0; i < jData.res.record.length ; ++i) {
            addSlider(jData.res.record[i].fname, "flower.html", 
                jData.res.record[i].flower_url,html);
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

    Util.get('index.php', data, sliderCallBack);

    
}); 
