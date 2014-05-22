$(function(){ 
    function addFlower(url, name, fid) {
        var html = '<div class="col-xs-12 col-sm-6 col-lg-3 text-center"><h3>' + 
                   name + '</h3><img class="img-border" src="' + url + '" name="' + name + '" fid="' + fid + '"><p><a class="btn btn-default btn-detail" href="update.html" role="button">详情</a></p></div>';
        $('.show-field').append(html);

        $('.btn-detail').on('click', function(e) {
            e.preventDefault();
            sessionStorage.setItem("fid", $(this).parent().parent().find('img').attr("fid"));
            //sessionStorage.setItem("name", $(this).attr("name"));
            //sessionStorage.setItem("url", $(this).attr("url"));

            window.location.href = $(this).attr('href');
        });
    }

    function pageCallBack(jData) {
        if ("1" != jData.ret) {
            alert("暂无花种数据！");
            return;
        }

        $('.show-field').html('');
        
        for (var i = 0; i < fArray.record.length; ++i) {
            addFlower(fArray.record[i].url, fArray.record[i].name, fArray.record[i].fid);
        }

        $('.btn-detail').on('click', function(e) {
            e.preventDefault();
            sessionStorage.setItem("fid", $(this).parent().parent().find('img').attr("fid"));
            //sessionStorage.setItem("name", $(this).attr("name"));
            //sessionStorage.setItem("url", $(this).attr("url"));

            window.location.href = $(this).attr('href');
        });
    }
    function callBack(jData) {
        if ("1" != jData.ret) {
            alert("暂无花种数据！");
            return;
        }

        $('.show-field').html('');

        var fArray = jData.res;
        console.log(fArray);
        Util.showPage(fArray.total, 20, pageCallBack);
        for (var i = 0; i < fArray.record.length; ++i) {
            addFlower(Util.flowerurl + fArray.record[i].url, 
                fArray.record[i].name, fArray.record[i].fid);
        }

        
    }

    var data = {
        "controller": "flower",
        "action": "query_flower_list_admin",
        "page" : 1
    };
    
    Util.get("index.php", data, callBack);

    function bscCallBack(jData) {
        if ("1" != jData.ret) {
            console.log("暂无数据!");
            return;
        }
        var html = '';
        for (var i = 0; i < jData.res.series.length; ++i) {
            html += '<option value="' 
                 +  jData.res.series[i].series_id + '">' 
                 +  jData.res.series[i].series_name + '</option>';
        }

        $('.sel-series').html('');
        $('.sel-series').append(html);

        html = '';
        for (var i = 0; i < jData.res.breed.length; ++i) {
            html += '<option value="' 
                 + jData.res.breed[i].breed_id + '">' 
                 + jData.res.breed[i].breed_name + '</option>';
        }

        $('.sel-breed').html('');
        $('.sel-breed').append(html);

        html = '';
        for (var i = 0; i < jData.res.color.length; ++i) {
            html += '<option value="' 
                 + jData.res.color[i].color_id  + '">' 
                 + jData.res.color[i].color_name  + '</option>';
        }

        $('.sel-color').html('');
        $('.sel-color').append(html);
    }
    controller = "flower";
    action = "query_conditions";
    var tData = {
        "controller" : controller,
        "action" : action
    };
    //获取数据库的种类，品种，颜色信息
    Util.get("index.php", tData, bscCallBack);

    
   
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
            "action" : "query_flower_list_admin",
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
            "breed_id" : breed,
            "series_id" : series,
            "color_id" : color,
            "page" : 1
        }

        Util.get("index.php", data, callBack);
    });
});
