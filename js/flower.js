$(document).ready(function() {

	fid = sessionStorage.getItem('fid');
	if (null == fid || typeof(fid) == 'undefined') {
		fid = Util.getPara('fid');
	}
	
	$('.slider-flower').bxSlider();

	//alert(fid);
	if (typeof(userId) == 'undefined' || null == userId) {
		userId = '';
	}

	//面包屑导航处理

    $('.breadCrumb').empty();
    var bname = sessionStorage.getItem('bname'),
    	sname = sessionStorage.getItem('sname'),
    	cname = sessionStorage.getItem('cname');
    if (undefined != bname && undefined != sname && cname != undefined) {
    	var ele = '<li><a href="">花品资料</a></li>'
    	    + '<li><a href="breed.html">' + bname + '</a></li>'
    	    + '<li><a href="series.html">' + sname + '</a></li>'
    	    + '<li><a href="color.html">' + cname + '</a></li>';
    	$('.breadCrumb').append(ele);
    	$('.breadCrumb').jBreadCrumb();
    }
    
	//实现滑动预览大图
	function addImage(shtml, url) {
		shtml += '<img src="' + url +'">';
	}

	//获取花的详细信息
	function callBack(jData) {
		if ("1" != jData.ret) {
			alert("失败！");
			return;
		}

		var flb_arr = jData.res.flower_url.split(',');

		$('.slider-flower').empty();
		shtml = '';
		for (var i = 0; i < flb_arr.length; ++i) {
			/*addImage(shtml, Util.flowerurl +flb_arr[i]);*/
			shtml += '<img src="' + url +'">';
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
				alert(jData.res.err);
				return;
			} else {
				console.log('投票失败!');
				return;
			}
		}
		alert("投票成功，感谢您的参与!");
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
			alert("请您先登录后，再进行投票！");
			return;
		}	

		Util.get('index.php', data, voteCallBack);

	});

	function restCallBack(jData) {
		if ("1" != jData.ret) {
			alert("获取投票余额失败!");
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
});
