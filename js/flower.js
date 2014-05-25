$(document).ready(function() {

	fid = sessionStorage.getItem('fid');
	if (null == fid || typeof(fid) == 'undefined') {
		fid = Util.getPara('fid');
	}
	
	$('.slider-flower').bxSlider();

	//Util.bubbleTip(fid);
	if (typeof(userId) == 'undefined' || null == userId) {
		userId = '';
	}

	//面包屑导航处理

    $('#breadCrumb3').empty();
    var bname = sessionStorage.getItem('bname'),
    	sname = sessionStorage.getItem('sname'),
    	cname = sessionStorage.getItem('cname');
    if (undefined != bname && undefined != sname && cname != undefined) {
    	var ele = '<ul><li><a href="#">Home</a></li>'
    	    + '<li><a href="breed.html">花品资料</a></li>'
    	    + '<li><a href="series.html">' + bname + '</a></li>'
    	    + '<li><a href="color.html">' + sname + '</a></li>'
    	    + '<li><a href="#">' + cname + '</a></li></ul>';
    	$('#breadCrumb3').append(ele);
    	$('#breadCrumb3').jBreadCrumb();
    }
    
	//实现滑动预览大图
	function addImage(shtml, url) {
		shtml += '<img src="' + url +'">';
	}

	//获取花的详细信息
	function callBack(jData) {
		if ("1" != jData.ret) {
			Util.bubbleTip("失败！");
			return;
		}

		var flb_arr = jData.res.flower_url.split(',');

		$('.slider-flower').empty();
		shtml = '';
		for (var i = 0; i < flb_arr.length; ++i) {
			/*addImage(shtml, Util.flowerurl +flb_arr[i]);*/
			shtml += '<li><img src="' + Util.flowerurl +flb_arr[i] +'"></li>';
		}

		$('.slider-flower').append(shtml);

		$('.slider-flower').bxSlider();

		$('.u-name').html(jData.res.fname);
		$('.u-breed').html(jData.res.breed_name);
		$('.u-series').html(jData.res.series_name);
		$('.u-color').html(jData.res.color_name);
		$('.attr').html(jData.res.attr);
		$('.cult').html(jData.res.cult);
		$('.story').html(jData.res.story);
	}

	Util.get(actionPhp, {"controller":"flower", "action":"query_flower", "fid": parseInt(fid), "uid": userId}, callBack);

	function voteCallBack(jData) {
		if ('1' != jData.ret) {
			if (null != jData.res.err) {
				Util.bubbleTip(jData.res.err);
				return;
			} else {
				console.log('投票失败!');
				return;
			}
		}
		Util.bubbleTip("投票成功，感谢您的参与!");
		$('.vote-chance').html(jData.res.vote_rest + '');
	}

	//投票按钮处理 
	$('.vote').on('click', function() {

		if (typeof(userId) != 'undefined' && '' != userId && null != userId) {
			var data = {
				"controller" : "user",
				"action" : "vote_flower",
				"fid" : fid,
				"uid" : userId
			};
		} else {
			Util.bubbleTip("请您先登录后，再进行投票！");
			return;
		}	

		Util.get('index.php', data, voteCallBack);

	});

	function restCallBack(jData) {
		if ("1" != jData.ret) {
			Util.bubbleTip("获取投票余额失败!");
			return;
		}
		$('.vote-chance').html(jData.res.vote_rest + '');
	}
	//获取投票余额
	if ('' != userId) {
		var data = {
			"controller" : "user",
			"action" : "query_vote_rest",
			"fid" : fid,
			"uid" : userId
		};
		Util.get('index.php', data, restCallBack);
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
