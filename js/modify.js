$(function(){

    sessionStorage.setItem('flag', '1');//用来标识当用户点击分页的时候，目前页面的状态（全部信息‘1’，
                                //手工检索‘2’，查询检索‘3’）

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

    
    function callBack(jData) {
        if ("1" != jData.ret) {
            alert("jData.res.err");
            $('.show-field').html('');
            return;
        }

        $('.show-field').html('');

        var fArray = jData.res;
        console.log(fArray);
        showPage(fArray.total, 20);
        for (var i = 0; i < fArray.record.length; ++i) {
            addFlower(Util.flowerurl + fArray.record[i].url, 
                fArray.record[i].fname, fArray.record[i].fid);
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
        sessionStorage.setItem('flag', '2');
        Util.get("index.php", data, callBack);
    });
    
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

    function showPage(items, itemsOnPage) {
        $("#page").pagination({
            displayedPages: 10,
            edges: 1,
            items: items,
            itemsOnPage: itemsOnPage,
            onPageClick: function(pageNum, events) {
                 var ctr = 'flower',
                    action = 'query_flower_list',
                    breed = bid,
                    series = sid,
                    color = cid,
                    jData = '',
                    flag_id = sessionStorage.getItem('flag');
                switch(flag_id) {
                    case '2':
                        breed = $('.hand-breed').val().trim();
                        series = $('.hand-series').val().trim();
                        color = $('.hand-color').val().trim();
                        break;
                    case '3':
                        breed = $('.sel-breed').val();
                        series = $('.sel-series').val();
                        color = $('.sel-color').val();
                        break;
                }
                if ('2' != flag_id) {
                    jData = {
                        "controller" : ctr,
                        "action" : action,
                        "breed_id" : breed,
                        "series_id" : series,
                        "color_id" : color,
                        "page" : pageNum
                    }  
                } else {
                    jData = {
                        "controller" : "flower",
                        "action" : "query_flower_list_admin",
                        "breed_name" : breed,
                        "series_name" : series,
                        "color_name" : color,
                        "page" : pageNum
                    }
                }
                

                Util.get("index.php", jData, pageCallBack);
            },
            onInit: function() {
               
            }
        });
    }
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
            "action" : "query_flower_list_admin",
            "breed_id" : breed,
            "series_id" : series,
            "color_id" : color,
            "page" : 1
        }
        sessionStorage.setItem('flag', '3');
        Util.get("index.php", data, callBack);
    });
});
