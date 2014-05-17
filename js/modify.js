$(function(){ 
    function addFlower(url, name, fid) {
        var html = '<div class="col-sm-3 col-lg-3"><img src="' + url + '" name="' + name + '" fid="' + fid + '"><h2>' + 
                   name + '</h2><p><a class="btn btn-default btn-detail" href="update.html" role="button">View details &raquo;</a></p></div>';
        $('.show-field').append(html);
    }

    function callBack(jData) {
        if ("1" != jData.ret) {
            alert("暂无花种数据！");
            return;
        }

        $('.show-field').html('');

        var fArray = jData.res;
        console.log(fArray);
        Util.showPage(fArray.total, 20);
        for (var i = 0; i < fArray.record.length; ++i) {
            addFlower(fArray.record[i].url, fArray.record[i].name, fArray.record[i].fid);
        }

    }

    var breed_id = 1,
        series_id = 1,
        color_id = 1,
        page = 1;

    var data = {
        "controller": "flower",
        "action": "query_flower_list_admin",
        "breed_id": breed_id,
        "series_id": series_id,
        "color_id" : color_id,
        "page" : page
    };
    
    Util.get("index.php", data, callBack);

    $('.btn-detail').on('click', function(e) {
        e.preventDefault();
        sessionStorage.setItem("fid", $(this).attr("fid"));
        sessionStorage.setItem("name", $(this).attr("name"));
        sessionStorage.setItem("url", $(this).attr("url"));

        window.location.href = $(this).attr('href');
    });

    //手工输入检索处理
    $('.hand-search').on('click', function() {
        var breed = $('.hand-breed').val().trim(),
            series = $('.hand-series').val().trim(),
            color = $('.hand-color').val().trim();
        if ('' == breed && '' == series && '' == color) {
            alert("请输入检索域!");
            return;
        }

        var data = {
            "controller" : "flower",
            "action" : "query_flower_list",
            "breed_name" : breed,
            "series_name" : series,
            "color_name" : color,
            "page" : 1
        }

        Util.get("index.php", data, callBack);
    });

    //选择搜索检索处理
    $('.sel-search').on('click', function() {
        var breed = $('.sel-breed').val().trim(),
            series = $('.sel-series').val().trim(),
            color = $('.sel-color').val().trim();
        if ('' == breed && '' == series && '' == color) {
            alert("请输入检索域!");
            return;
        }

        var data = {
            "controller" : "flower",
            "action" : "query_flower_list",
            "breed_name" : breed,
            "series_name" : series,
            "color_name" : color,
            "page" : 1
        }

        Util.get("index.php", data, callBack);
    });
});
