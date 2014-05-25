$(document).ready(function() {
	
	function addTable(selector, data) {
			$(selector).dataTable({
			"bPaginate": true, //翻页功能
			"bLengthChange": true, //改变每页显示数据数量
			"bFilter": true, //过滤功能
			"bSort": true, //排序功能
			"bInfo": false,//页脚信息
			"bAutoWidth": true,//自动宽度
			"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_ 条记录",
				"sZeroRecords": "抱歉， 没有找到",
				"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sInfoEmpty": "没有数据",
				"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
				"oPaginate": {
				"sFirst": "首页",
				"sPrevious": "前一页",
				"sNext": "后一页",
				"sLast": "尾页"
				},
				"sZeroRecords": "没有检索到数据"
			},
			"aaData": data,
			"aoColumns": [
				{"sTitle":"姓名"},
				{"sTitle":"手机号"},
				{"sTitle":"身份"},
				{"sTitle":"性别"},
				{"sTitle":"年龄"},
				{"sTitle":"收入"},
				{"sTitle":"客户产区"},
				{"sTitle":"种植基地"},
				{"sTitle":"花店名称"},
				{"sTitle":"规模"},
				{"sTitle":"编辑"}
			]
		});
	}

	function dataCallBack(jData) {
		if ('1' != jData.ret) {
			return;
		}
		$('.account-table').empty();
		/*$('.account-table').append('<thead><tr><th>姓名</th><th>手机号</th><th>身份</th>'
                    			  + '<th>性别</th><th>年龄</th><th>收入层次</th><th>客户产区</th><th>种植基地</th><th>花店名称</th>'
                    			  +	'<th>规模</th><th>编辑</th></tr></thead>');*/
		addTable('.account-table',jData.res.record);
	}

	Util.get('index.php', {"controller": "user", "action":"query_all_user"}, dataCallBack);
	
	//新增用户处理
	function callBack(jData) {
		if ("1" != jData.ret) {
			if (null == jData.ret.err || 'undefined' == typeof(jData.ret.err)) {
				Util.bubbleTip("新增用户失败!");
				return;
			}	
			Util.bubbleTip(jData.ret.err);
			return;
		}
		Util.bubbleTip("新增用户成功!");
	}
	
	$('.add-user-info').on('click', function() {
		var data = {	
			"controller": "user",
			"action": "create_user",
			"phone": $('.phone').val(),
			"user_name" : $('.name').val(),
			"sex" : $('.sex').val(),
			"type_name" : $('.identify').val(),
			"age" : $('.age').val(),
			"scale" : $('.scale').val(),
			"shop-name" : $('.shop-name').val(),
			"income" : $('.income').val(),
			"plant_base" : $('.plant_base').val()
		};
		Util.post('index.php', data, callBack);
	});

	//继续添加处理
	$('.add-new').on('click', function() {
		$('.phone').val('');
		$('.name').val('');
		$('.age').val('');
		$('.plant_base').val('');
		$('.shop-name').val('');
	});

	$('.export-account').on('click', function(){
		$(this).attr('target', '_blank');
		$(this).attr('href',Util.baseurl+ 'index.php?controller=user&action=export_user');
	});

	//删除账号信息
	$('table').on('click','.btn-del' ,function() {
		var trObj = $(this).parent().parent();
		var phone = $(':nth-child(2)', trObj).html();

		//发送到服务器删除此phone对应信息

		//表格删除
		$(this).parent().remove();
	});

	function editCallBack(jData) {
		
		if("1" != jData.ret) {
			Util.bubbleTip(jData.res.err);
			return;
		}

		$('.edit-field').hide();
		Util.bubbleTip('修改客户信息成功！');
	}

	//编辑按钮处理
	$('table').on('click', '.btn-edit', function() {
		var html = '',
			trObj = $(this).parent().parent();
		$('.edit-field').show();	
		$('.info-body').empty();
		html +=  '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">手机号</label>' 
			 + '<label class="cphone">' + $(':nth-child(2)', trObj).html()+ '</label>' 
			 + '</div>'
		     + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">客户姓名</label>' 
			 + '<input type="text" class="cname" value="' + $(':nth-child(1)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">客户身份</label>' 
			 + '<select class="cidentify"><option value="种植户">种植户</option><option value="花店">花店</option>'
			 + '<option value="游客">游客</option><option value="黑名单">黑名单</option></select>'
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">性别</label>' 
			 + '<select class="csex"><option value="男">男</option><option value="女">女</option></select>'
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">年龄</label>' 
			 + '<input type="text" class="cage" value="' + $(':nth-child(5)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">收入层次</label>' 
			 + '<input type="text" class="cincome" value="' + $(':nth-child(6)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">客户产区</label>' 
			 + '<input type="text" class="carea" value="' + $(':nth-child(7)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">种植基地</label>' 
			 + '<input type="text" class="cbase" value="' + $(':nth-child(8)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">花店名称</label>' 
			 + '<input type="text" class="cshop" value="' + $(':nth-child(9)', trObj).html() + '">' 
			 + '</div>'
			 + '<div class="col-xs-12 col-lg-6">'
			 + '<label class="label-left">规模</label>' 
			 + '<input type="text" class="cscale" value="' + $(':nth-child(10)', trObj).html() + '">' 
			 + '</div>';
		$('.info-body').append(html);

		$('.cidentify').val($(':nth-child(3)', trObj).html());
		$('.csex').val($(':nth-child(4)', trObj).html());

		html = '<div class="row row-clear"><button type="button" class="btn btn-primary btn-update">修改</button></div>'
		$('.info-body').append(html);

		$('.btn-update').on('click', function() {
			var jData = {
				"controller": "user",
				"action" : "modify_user",
				"phone": $('.cphone').text(),
				"user_name": $('.cname').val(),
				"type_name": $('.cidentify').val(),
				"sex": $('.csex').val(),
				"age": $('.cage').val(),
				"income": $('.cincome').val(),
				"plant_base": $('.cbase').val(),
				"grow_unit": $('.carea').val(),
				"scale": $('.cscale').val()			
			}

			Util.post('index.php', jData, editCallBack);
		});
	});
});