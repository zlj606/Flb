$(function() {
	//获取花的详细信息请求数据
	var detailData = {
			"controller" : "flower",
			"action" : "query_conditions"
		},
		//分发请求的php
		actionPhp = "index.php",
		//登录成功后，返回的用户标识
		userId = sessionStorage.getItem('user_id'),
		sid = sessionStorage.getItem('sid')
		cid = sessionStorage.getItem('cid'),
		bid = sessionStorage.getItem('bid');
	var errorInfo = ["OK",
				    "ERROR"	
				    ];


	function logoutCallBack(jData) {
		//清空本地存储
		sessionStorage.clear();
		window.location.href = "index.html";
	}

	//注销回调处理
	$('.logout').on('click', function() {

		Util.get(actionPhp,{"controller":"user", "action":"quit","uid",userId},
			logoutCallBack);
	});	
});
