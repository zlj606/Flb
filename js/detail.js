$(function() {
	function addPlant() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">客户产区&nbsp;</label><input type="text" class="info1"></div>'
				   + '<div class="magin-dis"><label class="label-left">规模&nbsp;</label><select class="info2"><option value="">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">种植基地名称&nbsp;</label><input type="text" class="info3"></div>';
		$('.id-info').append(html);
	}

	function addShop() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">客户产区&nbsp;</label><input type="text" class="info1"></div>'
				   + '<div class="magin-dis"><label class="label-left">规模&nbsp;</label><select><option value="" class="info2">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">花店名称&nbsp;</label><input type="text" class="info3"></div>';
		$('.id-info').append(html);
	}

	function addCustomer() {
		$('.id-info').html('');

		var html = '<div class="magin-dis"><label class="label-left">性别&nbsp;</label><select class="info1"><option value="male">男</option><option value="female">女</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">年龄段&nbsp;</label><select class="info2"><option value="">100</option></select></div>'
				   + '<div class="magin-dis"><label class="label-left">收入层次&nbsp;</label><select class="info3"><option value="">100</option></select></div>';
		$('.id-info').append(html);
	}

	$('.customer-id').on('click', function() {
		var val = $(this).val();

		switch(val) {
			case "plant":
			     addPlant();
			     break;
			case "shop":
				 addShop();
				 break;
			case "customer":
				 addCustomer();
				 break;
			default:
				 alert("radio error!");
				 break;
		}
	});


	function callBack(jData) {
		if ("1" != jData.ret) {
			alert("完善用户资料失败");
			return;
		}
	}
	$('.add-info').on('click', function() {
		var identify = $('input[type="radio"]:checked').val(),
			info1 = $('.info1').val(),
			info2 = $('.info2').val(),
			info3 = $('.info3').val();

		var data = {
			"controller" : "user",
			"action" : "",

		}
	});
});