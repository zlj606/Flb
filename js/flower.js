$(function() {
	$('.preview').on('click', function() {
		$('.whole-img').attr('src', $(this).attr('src'));
	});

	//获取花的详细信息
	function callBack(jData) {
		if ("1" != jData.ret) {
			alert("flower暂无数据！");
			return;
		}

		var flb_arr = jData.res.flower_url.split(',');

		for (var i = 0; i < flb_arr.length; ++i) {
			$('.thumbnail-' + i + 1).attr('src', flb_arr[i]);
		}
		$('.whole-img').attr('src', flb_arr[0]);

		$('.u-name').html(jData.res.fname);
		$('.u-breed').html(jData.res.breed_name);
		$('.u-spe').html(jData.res.series_name);
		$('.u-color').html(jData.res.color_name);
	}

	Util.get(actionPhp, detailData, callBack);
});