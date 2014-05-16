$(function(){
	

    function addFlower(url, name, fid) {
        var html = '<div class="col-sm-3 col-lg-3"><img src="' + url + '" name="' + name + '" fid="' + fid + '"><p><a class="btn btn-default btn-detail" href="update.html" role="button">View details &raquo;</a></p></div>';
        $('.row').append(html);
    }

    function callBack(jData) {
        if ("1" != jData.ret) {
            alert("暂无花种数据！");
            return;
        }
        var fArray = jData.res;
        Util.showPage(fArray.length, 5);
        for (var i = 0; i < fArray.length; ++i) {
            addFlower(fArray[i].url, fArray[i].name, fArray[i].fid);
        }

    }
    var breed = "1",
        series = "1",
        page = "1";

    var data = {
        "controller": "flower",
        "action": "query_flower_list",
        "breed": breed,
        "series": series,
        "page" : page
    };
    var url = "./../flower/index.php";
    Util.get(url, data, callBack);

    $('.btn-detail').on('click', function(e) {
        e.preventDefault();
        sessionStorage.setItem("fid", $(this).attr("fid"));
        sessionStorage.setItem("name", $(this).attr("name"));
        sessionStorage.setItem("url", $(this).attr("url"));

        window.location.href = $(this).attr('href');
    });
});
