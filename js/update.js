$(document).ready(function() {
	
	fid = sessionStorage.getItem('fid');

	if ($('.hide-info').has('.fid').length > 0) {
		$('.fid').val(fid);
	} else {
		$('.hide-info').append('<input class="fid" name="fid" type="text" value="' + fid + '">');
	}
    
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
		if ('' != $('option:selected',this).text()) {
			$('.in-series').val($('option:selected',this).text());
		}

		$('.series-field').hide();
	});

    $('.sel-breed').on('blur', function() {
		if ('' != $('option:selected',this).text()) {
			$('.in-breed').val($('option:selected',this).text());
		}
		$('.breed-field').hide();	
	});

	$('.sel-color').on('blur', function() {
		if ('' != $('option:selected',this).text()) {
			$('.in-color').val($('option:selected',this).text());
		}

		$('.color-field').hide();	
	});

	function bscCallBack(jData) {
		if ("1" != jData.ret) {
			console.log("暂无数据!");
			return;
		}
		var html = '';
		for (var i = 0; i < jData.res.series.length; ++i) {
			html += '<option value="' 
				 +  jData.res.series[i].series_id + '">' 
				 +  jData.res.series[i].series_name + '</option>';
		}

		$('.sel-series').html('');
		$('.sel-series').append(html);

		html = '';
		for (var i = 0; i < jData.res.breed.length; ++i) {
			html += '<option value="' 
				 + jData.res.breed[i].breed_id + '">' 
				 + jData.res.breed[i].breed_name + '</option>';
		}

		$('.sel-breed').html('');
		$('.sel-breed').append(html);
		
		html = '';
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

    	$('.flbname').val(jData.res.fname);
    	$('.in-series').val(jData.res.series_name);
    	$('.in-color').val(jData.res.color_name);
    	$('.in-breed').val(jData.res.breed_name);
    	$('.pContent').val(jData.res.attr);
    	$('.cContent').val(jData.res.cult);
    	$('.sContent').val(jData.res.story);
    	var arr = jData.res.flower_url.split(',');

    	for (var i = 0 ; i < arr.length ; ++i) {
    		$('.thumbnail-' + (i + 1)).attr('src', Util.flowerurl + arr[i]);
    		$('.thumbnaila-' + (i + 1)).find('.btn-del').remove();
    		if('flr_no_img.jpg' != arr[i]) {
    			addFloatDel($('.thumbnaila-' + (i + 1)));
    		}		
    	}
    	$('#QRCode').attr('src', Util.codeurl + jData.res.code_url);

    	if (jData.res.code_url != '' ) {
    		$('.gen-code').hide();
    	}
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


	//生成二维码
    function genQRCode(jData) {
        
        if ("1" != jData.ret) {
            Util.bubbleTip("生成失败!");
            return;
        }

        $('#QRCode').attr('src', Util.codeurl + jData.res.code_url); 
    }
    
    $('.gen-code').on('click', function() {

        Util.post("index.php", {"controller": "flower","action": "create_code", "fid" : fid}, genQRCode);
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

	$('.btn-submit').on('click', function() {

		if ('' == $('.picture').val()) {
        	Util.bubbleTip('请先选择图片，再进行提交！');
        	return;
        }

        var options = {
            url : Util.baseurl + 'index.php',
            type: 'post',
            success : function(jData) {
                jData = eval("(" + jData + ")");
                if ("1" != jData.ret) {
                    Util.bubbleTip("上传图片回调失败");
                    return;
                }
                Util.bubbleTip("上传图片成功！");
                $('.picture').val('');
                //sessionStorage.setItem('fid', jData.res.fid);
                //$('#big-pic').attr('src', Util.flowerurl + jData.res.flower_url);

                for (var i = 0; i < 5; ++i) {
                	if($('.thumbnail-' + (i+1)).attr('src') == '' || $('.thumbnail-' + (i+1)).attr('src') == Util.flowerurl + 'flr_no_img.jpg') {
                		$('.thumbnail-' + (i+1)).attr('src', Util.flowerurl + jData.res.flower_url); 
                		break;
                	} 
                }
            }
        }
        
        $('#fileupload').ajaxSubmit(options);
    });

	function delCallBack(jData) {
		if ('1' != jData.ret) {
			if (null != jData.res.err) {
				console.log(jData.res.err);
				return;
			} else {
				console.log('删除图片失败!');
				return;
			}
		}

		Util.bubbleTip('删除图片成功！');
	}

    

    //更新数据
    function updateCallBack(jData) {
    	if ('1' != jData.ret) {
			if (null != jData.res.err) {
				console.log(jData.res.err);
				return;
			} else {
				console.log('更新数据失败!');
				return;
			}
		}

		Util.bubbleTip('更新数据成功！');
    }

    $('.btn-para').on('click', function() {
    	var mData = {
    		"controller" : "flower",
    		"action" : "modify_flower",
    		"fname" : $('.flbname').val(),
    		"fid" : fid,
    		"breed_name" : $('.in-breed').val(),
    		"series_name" : $('.in-series').val(),
    		"color_name" : $('.in-color').val(),
    		"attr" : $('.pContent').val(),
    		"cult" : $('.cContent').val(),
    		"story" : $('.sContent').val()
    	};

    	Util.post('index.php', mData, updateCallBack);
    });

    /*$('img[class^="thumbnail"]').on({
    	mouseenter: function() {
    		if ($(this).attr('src') == '') {
    			return;
    		}
    		//将一些属性值写到button
    		$('.btn-del').show();

    	},
    	mouseleave: function() {
    		if ($(this).attr('src') == '') {
    			return;
    		}

    		$('.btn-del').hide();
    	}
    });*/

    function addFloatDel(selector) {
    	var html = '';
    	html += '<button class="btn-del">删除</button>';
    	$(selector).append(html);

    	//处理所有图片删除
	    $('.btn-del').on('click', function() {
	    	var picName = $(this).parent().find('img').attr('src');
	    	var begin = picName.lastIndexOf('/');
	    		picName = picName.substring(begin + 1, picName.length);
	    	var delData = {
	    		"controller" : "flower",
	    		"action" : "remove_flower_img",
	    		"fid" : fid,
	    		"img" : picName
	    	};
	    	$(this).parent().find('img').attr('src', '');
	    	$(this).remove();
	    	Util.get('index.php', delData, delCallBack);
	    });
    }
});