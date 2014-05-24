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
				{"sTitle": "ID"},
				{"sTitle": "名称"},
				{"sTitle": "票数"}
			]
		});
	}

	function dataCallBack(jData) {
		if ('1' != jData.ret) {
			return;
		}
		$('.static-table').empty();
		//$('.static-table').append('<tr><th>名称</th><th>票数</th></tr>');
		addTable('.static-table',jData.res.record);
	}

	Util.get('index.php', {"controller": "user", "action": "count_vote", "type": 2}, dataCallBack);
	//导出投票结果
	$('.btn-export').on('click', function() {
		Util.get('index.php',{"controller": "user", "action":"export_vote","type":2}, null);
	});
});