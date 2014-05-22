	//获取花的详细信息请求数据
	var detailData = {
			"controller" : "flower",
			"action" : "query_conditions"
		},
		//分发请求的php
		actionPhp = "index.php",
		//登录成功后，返回的用户标识
		userId = $.cookie('flr_uid'),//sessionStorage.getItem('user_id'),
		displayName = sessionStorage.getItem('display_name'),
		sid = sessionStorage.getItem('sid')
		cid = sessionStorage.getItem('cid'),
		bid = sessionStorage.getItem('bid');
	var errorInfo = ["OK",
				    "ERROR"	
				    ];
    
    //添加导航条
    var navBar = '<div class="container">' 
                +'<div class="navbar-header">'
	            + '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
	            + '<span class="sr-only">Toggle navigation</span>'
	            + '<span class="nav-font">导航栏</span>'
	            + '</button>'
	            + '<a class="navbar-brand" href="index.html">易花官网</a>'
	            + '</div>'
	            + '<div class="collapse navbar-collapse">'
	            + '<ul class="nav navbar-nav">'
		        +    '<li><a href="company.html">公司简介</a></li>'
		        +    '<li>'
		        +        '<a href="breed.html" >花种资料</a>'
		        +      '</li>'
		        +    '<li class="dropdown">'
		        +        '<a href="#" class="dropdown-toggle" data-toggle="dropdown">电商平台 <b class="caret"></b></a>'
		        +        '<ul class="dropdown-menu">'
		        +          '<li><a href="#">APP应用指南</a></li>'
		        +          '<li><a href="#">产品分级机制详述</a></li>'
		        +         '<li><a href="#">信用体系详述</a></li>'
		        +        '</ul>'
		        +     '</li>'
		        +   '<li class="dropdown man-plaft">'
		        +        '<a href="manage.html" class="dropdown-toggle" data-toggle="dropdown">管理后台 <b class="caret"></b></a>'
		        +        '<ul class="dropdown-menu">'
		        +          '<li><a href="modify.html">修改品种</a></li>'
		        +         '<li><a href="statics.html">票数统计</a></li>'
		        +       '</ul>'
		        +      '</li>' 
		        +  '</ul>'
		        +  '<ul class="nav navbar-nav navbar-right">'
	            +    '<li class="ac"><a href="login.html">登录</a></li>'
	            +    '<li><a href="register.html" class="logout">注册</a></li>'
	            +  '</ul>'
		        +'</div>';
	$('.navbar-fixed-top').append(navBar);

	if (null != displayName && '' != displayName) {
		$('.ac>a').text(displayName);
		$('.logout').text('注销');

		if ('管理员' == displayName) {
			$('.man-plaft').show();
		} 
	} 
	
	$('.man-plaft').hide();


	function logoutCallBack(jData) {
		//清空本地存储
		sessionStorage.clear();
		$('.ac>a').text('登录');
		$('.logout').text('注册');
		$('.ac>a').attr('href', 'login.html');
		$('.logout').attr('href', 'register.html');
		window.location.href = "index.html";
	}

	//注销回调处理
	$('.logout').on('click', function(e) {
		e.preventDefault();
		if ('注销' == $(this).text()) {
			Util.get(actionPhp,{"controller":"user", "action":"quit","uid":userId},
			logoutCallBack);	
		}
	});	
