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
				{"sTitle":"规模"}，
				{"sTitle":"编辑"}
			]
		});
	}

	function dataCallBack(jData) {
		if ('1' != jData.ret) {
			return;
		}
		$('.account-table').empty();
		$('.account-table').append('<thead><tr><th>姓名</th><th>手机号</th><th>身份</th>'
                    			  + '<th>性别</th><th>年龄</th><th>收入层次</th><th>客户产区</th><th>种植基地</th><th>花店名称</th>'
                    			  +	'<th>规模</th><th>编辑</th></tr></thead>');
		addTable('.account-table',jData.res.record);
	}

	Util.get('index.php', {"controller": "user", "action":"query_all_user"}, dataCallBack);
	
	//新增用户处理
	function callBack(jData) {
		if ("1" != jData.ret) {
			if (null == jData.ret.err || 'undefined' == typeof(jData.ret.err)) {
				alert("新增用户失败!");
				return;
			}	
			alert(jData.ret.err);
			return;
		}
		//alert("新增用户成功!");
	}
	
	$('.add-user').on('click', function() {
		var data = {	
			"controller": "user",
			"action": "create_user",
			"phone": $('.phone').val(),
			"name" : $('.name').val(),
			"sex" : $('.sex').val(),
			"user_type_name" : $('.identify').val(),
			"age" : $('.age').val(),
			"scale" : $('.scale').val(),
			"shop-name" : $('.shop-name').val(),
			"income" : $('.income').val(),
			"plant_base" : $('.plant_base').val()
		};
		Util.get('index.php', data, callBack);
	});

	//继续添加处理
	$('.add-new').on('click', function() {
		$('.phone').val('');
		$('.name').val('');
		$('.age').val('');
		$('.plant_base').val('');
		$('.shop-name').val('');
	});
});