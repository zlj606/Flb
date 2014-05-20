$(function() {
	$('.preview').on('click', function() {
		$('.whole-img').attr('src', $(this).attr('src'));
	});

	fid = sessionStorage.getItem('fid');
	if (null == fid || typeof(fid) == 'undefined') {
		fid = Util.getPara('fid');
	}
	

	//alert(fid);
	if (typeof(userId) == 'undefined' || null == userId) {
		userId = '';
	}

	$('.ac>a').text(userId);
	//获取花的详细信息
	function callBack(jData) {
		if ("1" != jData.ret) {
			alert("失败！");
			return;
		}

		var flb_arr = jData.res.flower_url.split(',');

		for (var i = 0; i < flb_arr.length; ++i) {
			$('.thumbnail-' + (i + 1)).attr('src', Util.flowerurl +flb_arr[i]);
		}
		$('.whole-img').attr('src', Util.flowerurl + flb_arr[0]);

		$('.u-name').html(jData.res.fname);
		$('.u-breed').html(jData.res.breed_name);
		$('.u-spe').html(jData.res.series_name);
		$('.u-color').html(jData.res.color_name);
		$('.attr').html(jData.res.attr);
		$('.cult').html(jData.res.cult);
		$('.story').html(jData.res.story);
		$('.show-qrcode').attr('src', Util.codeurl + jData.res.code_url);
	}

	Util.get(actionPhp, {"controller":"flower", "action":"query_flower", "fid": parseInt(fid)}, callBack);

	function voteCallBack(jData) {
		if ("1" != jData.ret) {
			alert("投票失败!");
			return;
		}
		alert("投票成功，感谢您的参与!");
		$('.vote-chance').html(jData.res.vote_rest + '');
	}

	//投票按钮处理 
	$('.vote').on('click', function() {
		var data = {
			"controller" : "user",
			"action" : "vote",
			"fid" : fid,
			"uid" : userId
		};

		Util.get('index.php', data, voteCallBack);

	});

	if (typeof(userId) != 'undefined' && '' != userId) {
		var data = {
			"controller" : "user",
			"action" : "query_vote_rest",
			"fid" : fid,
			"uid" : userId
		};

		Util.get('index.php', data, voteCallBack);
	}

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
