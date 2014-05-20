Util = {
    baseurl: 'http://192.168.1.134:8080/flower/',
    flowerurl: 'http://192.168.1.134:8080/flower/photos/flower/',
    codeurl: 'http://192.168.1.134:8080/flower/photos/code/',    
    //baseurl: 'http://127.0.0.1:8080/flower/',
    //flowerurl: 'http://127.0.0.1:8080/flower/photos/flower/',
    //codeurl: 'http://127.0.0.1:8080/flower/photos/code/',    
    post:function(url, data, success){              //一个基本的post请求封装
        $.ajax({
            url:Util.baseurl + url,
            type:"post",
            data:data,
            dataType:"json",
            error:function(){
                //Common.tip(TipData["1002"], 0);
                //ajax错误提示
            },
            success:function(data){  
                if(data && data.ret != "1"){
                    //Common.showError(data);
                    //错误处理code转换成文字提示给用户
                    alert("error");
                    return;
                };  
                success && success(data);
            }
        });
    },
    get:function(url, reqdata, success){              //一个基本的get请求封装
        $.ajax({
            url: Util.baseurl + url,
            type:"get",
            data:reqdata,
            dataType:"json",
            error:function(){
                console.log('error request!');
            },
            success:function(data){ 
                success && success(data);
            }
        });
    },
    isEmail:function(strEmail){                     //邮箱验证
        if (strEmail.search(/^w+((-w+)|(.w+))*@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+)*.[A-Za-z0-9]+$/) != -1){
            return true;
        }
        return false;
    },
    isEmpty: function(str){                            //是否为空
        if(str.length == 0){
            return true;
        }
        return false;
    },
    isNumber: function(str){                         //数值检测
        return !isNaN(str); 
    },
    trim: function(str){                               //去除空格
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    },
    isOverflow: function(str){                         //校验域长度不能大于10个字符
        if(10 < str.length){
            return true;
        }
        return false;
    },
    isPhone: function(strPhone) {                    //校验手机号 
        if (-1 != strPhone.search(/^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/)) {
            return true;
        }
        return false;
    },
    showPage: function(items, itemsOnPage, callBack) {
        $("#page").pagination({
            displayedPages: 10,
            edges: 1,
            items: items,
            itemsOnPage: itemsOnPage,
            onPageClick: function(pageNum, events) {
                 var ctr = 'flower',
                    action = 'query_flower_list',
                    breed = 1,
                    series = 1,
                    color = 1;
                var jData = {
                    "controller" : ctr,
                    "action" : action,
                    "breed_id" : breed,
                    "series_id" : series,
                    "color_id" : color,
                    "page" : pageNum
                } 

                Util.get("index.php", jData, callBack);
            },
            onInit: function() {
               
            }
        });
    },
    getPara: function(paras) {
        var url = location.href;
        var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
        var paraObj = {}
        for (i=0; j=paraString[i]; i++){
          paraObj[j.substring(0,j.indexOf("="))] = j.substring(j.indexOf("=")+1,j.length);
           }
         var returnValue = paraObj[paras];
           if(typeof(returnValue)=="undefined"){
            return "";
           }else{
          return returnValue;
          }
    },
    getObjectURL: function (file) {
        var url = null ; 
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }


};
