$(function () {
    
    function callBack(jData) {
        if('1' != jData.ret) {
            console.log('提交信息失败！');
            return;
        }
        if ('' != jData.fid) {
            sessionStroge.setItem('fid', fid);
        }
    }

    $('.update-info').on('click', function() {
        var fname = $('.flbname').val(),
            fspecices = $('.flbspecies').val(),
            fcolor = $('.flbcolor').val(),
            fbreed = $('.flbbreed').val();
        if ('' == fname) {
            alert('请输入花的名称！');
            return;
        }
        var para = $('.pInfo').val(),
            cult = $('.cInfo').val(),
            story = $('.sInfo').val();

        var fid = sessionStroge.getItem('fid');
            
        var data = {
            "fid" : typeof(fid) == "undefined" ? -1 : fid,
            "fname" : fname,
            "breed_name" : fbreed,
            "series_name" : fspecices,
            "color_name" : fcolor,
            "attr" : para,
            "cult" : cult,
            "story" : story
        }

        Util.post('index.php', data, callBack);
    });

    $('.create-new').on('click',function() {
        $('.flbname').val('');
        $('.flbspecies').val('');
        $('.flbcolor').val('');
        $('.flbbreed').val('');
        $('.pInfo').val('');
        $('.cInfo').val('');
        $('.sInfo').val('');
        $('#big-pic').attr('src', '');
        $('#QRCode').attr('src', '');
        sessionStroge.removeItem('fid');

        Util.get("index.php", tData, bscCallBack);
    });

    function bscCallBack(jData) {
        if ("1" != jData.ret) {
            console.log("暂无数据!");
            return;
        }
        var html = '<option value=""></option>';
        for (var i = 0; i < jData.res.series.length; ++i) {
            html += '<option value="' 
                 +  jData.res.series[i].series_id + '">' 
                 +  jData.res.series[i].series_name + '</option>';
        }

        $('.sel-series').html('');
        $('.sel-series').append(html);

        for (var i = 0; i < jData.res.breed.length; ++i) {
            html += '<option value="' 
                 + jData.res.breed[i].breed_id + '">' 
                 + jData.res.breed[i].breed_name + '</option>';
        }

        $('.sel-breed').html('');
        $('.sel-breed').append(html);

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
    tData = {
        "controller" : controller,
        "action" : action
    };
    //获取数据库的种类，品种，颜色信息
    Util.get("index.php", tData, bscCallBack);

    //生成二维码
    function genQRCode(jData) {
        
        if ("1" != jData.ret) {
            alert("生成失败!");
            return;
        }

        $('#QRCode').attr('src', Util.baseurl + 'photos/code/'+ jData.res.code_url); 
    }
    
    $('.gen-code').on('click', function() {

        var fid = sessionStroge.getItem('fid');
        if (typeof(fid) == 'undefined' || '' == fid) {
            alert("请先上传！");
            return;
        }

        Util.post("index.php", {"controller": "flower","action": "create_code", "fid" : fid}, genQRCode);
    });

    $('.btn-submit').on('click', function() {
        var options = {
            url : 'http://127.0.0.1:8080/flower/index.php',
            type: 'post',
            success : function(jData) {
                jData = eval("(" + jData + ")");
                if ("1" != jData.ret) {
                    alert("上传图片回调失败");
                    return;
                }
                alert("上传图片回调成功！");
            }
        }
        $('#fileupload').ajaxSubmit(options);
    });

    $('.file-path').on('change', function() {
        var objUrl = Util.getObjectURL(this.files[0]);
        console.log("objUrl = "+objUrl);
        if (objUrl) {
            $(".submit-preview").attr("src", objUrl);
        }
    });

});
