$(function() {
	
	fid = sessionStorage.getItem('fid');
    fid = parseInt(fid);

	pic_path = Util.baseurl + 'photo/flower/';
	code_path = Util.baseurl + 'photo/code/'
    
	$('.series-field').hide();
	$('.color-field').hide();
	$('.breed-field').hide();

   
	$('.in-series').on({
		focus: function() {
			$('.series-field').show();
		}
	});

	$('.in-breed').on({
		focus: function() {
			$('.breed-field').show();
		}
	});

	$('.in-color').on({
		focus: function() {
			$('.color-field').show();
		}
	});

	$('.sel-series').on('blur', function() {
		if ('' != $(this).val()) {
			$('.in-series').val()
		}

		$('.series-field').hide();
	});

    $('.sel-breed').on('blur', function() {
		if ('' != $(this).val()) {
			$('.in-breed').val()
		}
		$('.breed-field').hide();	
	});

	$('.sel-color').on('blur', function() {
		if ('' != $(this).val()) {
			$('.in-color').val()
		}

		$('.color-field').hide();	
	});

	function bscCallBack(jData) {
		if ("1" != jData.ret) {
			console.log("暂无数据!");
			return;
		}
		var html = '<option value=""></option>';
		for (var i = 0; i < jData.res.series.length; ++i) {
			html += '<option value="' 
				 +  jData.res.series[i].series_id + '">' 
				 +  jData.res.series[i].series_name + '</option>';
		}

		$('.sel-series').html('');
		$('.sel-series').append(html);

		for (var i = 0; i < jData.res.breed.length; ++i) {
			html += '<option value="' 
				 + jData.res.breed[i].breed_id + '">' 
				 + jData.res.breed[i].breed_name + '</option>';
		}

		$('.sel-breed').html('');
		$('.sel-breed').append(html);

		for (var i = 0; i < jData.res.color.length; ++i) {
			html += '<option value="' 
				 + jData.res.color[i].color_id  + '">' 
				 + jData.res.color[i].color_name  + '</option>';
		}

		$('.sel-color').html('');
		$('.sel-color').append(html);
	}
     
    function infoCallBack(jData) {
    	if ("1" != jData.ret) {
    		console.log("没有花的详细信息！");
    		return;
    	}

    	$('.in-series').val(jData.res.series_name);
    	$('.in-color').val(jData.res.color_name);
    	$('.in-breed').val(jData.res.breed_name);
    	$('.pContent').val(jData.res.attr);
    	$('.cContent').val(jData.res.cult);
    	$('.sContent').val(jData.res.story);
    	var arr = jData.res.flower_url.split(',');

    	for (var i = 0 ; i < arr.length ; ++i) {
    		$('.thumbnail-' + i + 1).attr('src', pic_path + arr[i]);
    	}
    	$('.QRCode').attr('src', jData.res.code_url + code_path);
    }

    controller = 'flower',
    action = 'query_flower';

    var dData = {
    	"controller" : controller,
    	"action" : action,
    	"fid" : fid
    };

    //获取花的详细信息
    Util.get("index.php", dData, infoCallBack);

    action = "query_conditions";
    var tData = {
    	"controller" : controller,
    	"action" : action
    };
	//获取数据库的种类，品种，颜色信息
	Util.get("index.php", tData, bscCallBack);

	$('.btn-para').on('click', function() {

	});

	$('.btn-one').on('click', function() {
		var para = $('.pContent').val().trim();
		aciton = "modify_flower";
		var oData = {
			"controller" : controller,
			"action" : action,
			"fid" : fid,
			"attr" : para
		}
	});

	$('.btn-two').on('click', function() {
		var cult = $('.cContent').val().trim();
		aciton = "modify_flower";
		var oData = {
			"controller" : controller,
			"action" : action,
			"fid" : fid,
			"cult" : cult
		}
	});


	$('.btn-three').on('click', function() {
		var story = $('.sContent').val().trim();
		aciton = "modify_flower";
		var oData = {
			"controller" : controller,
			"action" : action,
			"fid" : fid,
			"sotry" : story
		}
	});
});
