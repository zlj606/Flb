$(document).ready(function() {
	function addPlant() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">客户产区&nbsp;</label><input type="text" class="info1"></div>'
				   + '<div class="magin-dis"><label class="label-left">规模&nbsp;</label><select class="info2"><option value="100">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">种植基地名称&nbsp;</label><input type="text" class="info3"></div>';
		$('.id-info').append(html);
	}

	function addShop() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">客户产区&nbsp;</label><input type="text" class="info1"></div>'
				   + '<div class="magin-dis"><label class="label-left">规模&nbsp;</label><select><option value="100" class="info2">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">花店名称&nbsp;</label><input type="text" class="info3"></div>';
		$('.id-info').append(html);
	}

	function addCustomer() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">性别&nbsp;</label><select class="info1"><option value="男">男</option><option value="女">女</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">年龄段&nbsp;</label><select class="info2"><option value="100">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">收入层次&nbsp;</label><select class="info3"><option value="100">100</option></select></div>';
		$('.id-info').append(html);
	}

	$('.customer-id').on('click', function() {
		var val = $(this).val();

		switch(val) {
			case "种植户":
			     addPlant();
			     break;
			case "花店":
				 addShop();
				 break;
			case "游客":
				 addCustomer();
				 break;
			default:
				 Util.bubbleTip("radio error!");
				 break;
		}
	});


	function callBack(jData) {
		if ("1" != jData.ret) {
			Util.bubbleTip("完善用户资料失败");
			return;
		}
		try {
			Util.bubbleTip('完善客户资料成功！');
			if ('' != jData.res.jump_url) {
				var url = jData.res.jump_url;
				var begin = url.lastIndexOf('/');
					url = url.substring(begin + 1, url.length);
				window.location.href = url;
			}

		} catch (e) {

		}	

	}
	$('.add-info').on('click', function() {
		var identify = $('input[type="radio"]:checked').val(),
			info1 = $('.info1').val(),
			info2 = $('.info2').val(),
			info3 = $('.info3').val(),
			sex = '',
			name = $('.customer-name').val(),
			income = '',
			age = '',
			scale = '',
			shopName = '',
			plantBase = '',
			growUnit = '';

		if ('' == info1 || '' == info2 || '' == info3 || '' == name) {
			Util.bubbleTip('请补全客户信息！');
			return;
		}

		switch($('.customer-id:checked').val()) {
			case '种植户':
				growUnit = info1;
				scale = info2;
				plantBase = info3;
				break;
			case '游客':
				age = info2;
				sex = info1;
				income = info3;
				break;
			case '花店':
				growUnit = info1;
				scale = info2;
				shopName = info3;
				break;
		}
            
		var data = {
			"controller" : "user",
			"action" : "append_user",
			"uid" : userId,
			"type_name" : identify,
			"name" : name,
			"sex" : sex,
			"income" : income,
			"age": age,
			"scale": scale,
			"shop_name": shopName,
			"plant_base": plantBase,
			"grow_unit": growUnit
		}
		Util.post('index.php', data, callBack);
	});

	//进入页面的时候首先判断是否有信息
	function infoCallBack(jData) {
		if ("1" != jData.ret) {
			Util.bubbleTip(jData.res.err);
			return;
		}

		$('.id-info').empty();

		$('.customer-name').val(jData.res.user_name);
		var identify = jData.res.type_name;
		$('.customer-id[value="' + identify + '"]').attr('checked', 'true');

		switch(identify) {
			case "种植户":
			     addPlant();
			     $('.info1').val(jData.res.grow_unit);
			     $('.info2').val(jData.res.scale);
			     $('.info3').val(jData.res.plant_base);
			     break;
			case "花店":
				 addShop();
				 $('.info1').val(jData.res.grow_unit);
			     $('.info2').val(jData.res.scale);
			     $('.info3').val(jData.res.shop_name);
				 break;
			case "游客":
				 addCustomer();
				 $('.info1').val(jData.res.sex);
			     $('.info2').val(jData.res.age);
			     $('.info3').val(jData.res.income);
				 break;
			default:
				 //alert("radio error!");
				 break;
		}


	}
	var jData = {
		"controller": "user",
		"action": "query_user",
		"uid": userId
	}
	Util.get('index.php', jData,infoCallBack);


	function pCallBack(jData) {
		if("1" != jData.ret) {
			return;
		}
		Util.bubbleTip('密码修改成功！');
		window.location.href = "login.html";
	}
	$('.modify-pwd').on('click', function() {
		var oldPwd = $('.old-pwd').val(),
			new1 = $('.new-pwd1').val(),
			new2 =$('.new-pwd2').val();

		if ('' == oldPwd || '' == new1 || '' == new2) {
			Util.bubbleTip('密码不能为空');
			return;
		}

		if (new1 != new2) {
			Util.bubbleTip('两次输入的密码应该相同！');
			return;
		}

		Util.post('index.php', {"controller":"user", "action":"reset_password", "uid":userId, "old_pwd": oldPwd, 
				"new_pwd": new1}, pCallBack);
	})
});