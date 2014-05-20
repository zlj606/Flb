$(document).ready(function() {
	$('.account-table').dataTable({
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
		"aaData": [  
            /* Reduced data set */  
            [ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X", "<button>删除</button>" ],  
            [ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C" , ''],  
            [ "Trident", "Internet Explorer 5.5", "Win 95+", 5.5, "A" , ''],  
            [ "Trident", "Internet Explorer 6.0", "Win 98+", 6, "A" ,''],  
            [ "Trident", "Internet Explorer 7.0", "Win XP SP2+", 7, "A",'' ],  
            [ "Gecko", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8, "A" ,''],  
            [ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A" ,''],  
            [ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A" ,''],  
            [ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ,''],  
            [ "Webkit", "Safari 1.3", "OSX.3", 312.8, "A" ,''],  
            [ "Webkit", "Safari 2.0", "OSX.4+", 419.3, "A" ,''],  
            [ "Webkit", "Safari 3.0", "OSX.4+", 522.1, "A" ,'']  
        ]
	});
	
	//新增用户处理
	function callBack(jData) {
		if ("1" != jData.ret) {
			alert(jData.ret.err);
			return;		}
	}
	$('.add-user').on('click', function() {

	});
});