$(document).ready(function () {
    
    function addFid(fid) {
        if ($('.action-info').has('.fid').length > 0) {
            $('.fid').val(fid);
        } else {
           $('.action-info').append('<input type="password" name="fid" class="fid" value="' 
            + fid + '">'); 
        }
        
    }

    function callBack(jData) {
        if('1' != jData.ret) {
            console.log('提交信息失败！');
            return;
        }
        alert('提交信息成功！');
        try {
            if (undefined != jData.res.fid) {
                    sessionStorage.setItem('fid', jData.res.fid);
                    addFid(jData.res.fid);
                }
        }
        catch(e) {
            
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

        var fid = sessionStorage.getItem('fid');
        
        if ( null == fid ) {
            var data = {
                "controller": "flower",
                "action": "create_flower",
                "fname" : fname,
                "breed_name" : fbreed,
                "series_name" : fspecices,
                "color_name" : fcolor,
                "attr" : para,
                "cult" : cult,
                "story" : story
            }
        } else {
            var data = {
                "controller": "flower",
                "action": "modify_flower",
                "fid": fid,
                "fname" : fname,
                "breed_name" : fbreed,
                "series_name" : fspecices,
                "color_name" : fcolor,
                "attr" : para,
                "cult" : cult,
                "story" : story
            }
        } 
        

        Util.post('index.php', data, callBack);
    });

    $('.sel-series').on('blur', function() {
        if ('' != $(this).val()) {
            $('.flbspecies').val($(this).val());
        }

    });

    $('.sel-breed').on('blur', function() {
        if ('' != $(this).val()) {
            $('.flbbreed').val($(this).val());
        }
    });

    $('.sel-color').on('blur', function() {
        if ('' != $(this).val()) {
            $('.flbcolor').val($(this).val());
        }  
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
        sessionStorage.removeItem('fid');

        Util.get("index.php", tData, bscCallBack);
    });

    function bscCallBack(jData) {
        if ("1" != jData.ret) {
            console.log("暂无数据!");
            return;
        }
        var html = '';
        for (var i = 0; i < jData.res.series.length; ++i) {
            html += '<option value="' 
                 +  jData.res.series[i].series_name + '">' 
                 +  jData.res.series[i].series_name + '</option>';
        }

        $('.sel-series').html('');
        $('.sel-series').append(html);

        html = '';
        for (var i = 0; i < jData.res.breed.length; ++i) {
            html += '<option value="' 
                 + jData.res.breed[i].breed_name + '">' 
                 + jData.res.breed[i].breed_name + '</option>';
        }

        $('.sel-breed').html('');
        $('.sel-breed').append(html);

        html = '';
        for (var i = 0; i < jData.res.color.length; ++i) {
            html += '<option value="' 
                 + jData.res.color[i].color_name  + '">' 
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

        var fid = sessionStorage.getItem('fid');
        if (null == fid) {
            fid = Util.getPara('fid');
        }
        if (typeof(fid) == 'undefined' || '' == fid || null == fid) {
            alert("请先上传！");
            return;
        }

        Util.post("index.php", {"controller": "flower","action": "create_code", "fid" : fid}, genQRCode);
    });

    $('.btn-submit').on('click', function() {
        var options = {
            url : Util.baseurl + 'index.php',
            type: 'post',
            success : function(jData) {
                jData = eval("(" + jData + ")");
                if ("1" != jData.ret) {
                    alert("上传图片回调失败");
                    return;
                }
               // alert("上传图片回调成功！");

                sessionStorage.setItem('fid', jData.res.fid);
                $('#big-pic').attr('src', Util.flowerurl + jData.res.flower_url);
            }
        }
        var fid = sessionStorage.getItem('fid');
        if (null != fid) {
            addFid(fid);
        }
        $('#fileupload').ajaxSubmit(options);
    });

    /*$('.file-path').on('change', function() {
        var objUrl = Util.getObjectURL(this.files[0]);
        console.log("objUrl = "+objUrl);
        if (objUrl) {
            $(".submit-preview").attr("src", objUrl);
        }
    });*/

});
