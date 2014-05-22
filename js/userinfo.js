$(document).ready(function() {

	$('.mod-info').on('click', function(){

	});

	$('.mod-pwd').on('click', function() {
		var oldPwd = $('.old-pwd').val(),
			pwd1 = $('.new-pwd1').val(),
			pwd2 = $('.new-pwd2').val();

	    if ('' == oldPwd || '' == pwd1 || '' == pwd2) {
	    	alert("密码域不能为空！");
	    	return;
	    }

	    if (pwd1 != pwd2) {
	    	alert("请保证两次密码输入一致！");
	    	return;
	    }

	    var data = {

	    };
	});
});