$(function() {
    new WOW().init();//初始化wow插件
    var tools_Help=(
        function(module) {
            module.reMainHg = function(obj,obj2,main) {
                var pro2=$(obj).height();
                var pro3=$(obj2).height();
                var proH=pro2+pro3;//
                var helpHg=$(main).height();
                if(helpHg<proH){
                    $(main).height(proH+"px");
                }
            };
            module.retunHref=function(){
                var res=false;
                var href=window.location.pathname;
                var doNameTwo =/^\/[13456789]_[13456789]h\/$/;
                if(doNameTwo.test(href)){
                    $(".conT").addClass("conT2");
                    $(".conT").addClass("help_main_name");//为主要内容区域加上二级域名标识
                    $(".ns_pa").addClass("nameNs_pa");//为分页加上二级域名标识
                    $(".help_main>li>div>h4>img").attr("src","https://img.hzshuangmei.com/pc/nameQuest.png.");//更换问题图标
                    $(".info_kst").attr("src","https://img.hzshuangmei.com/pc/helpKst_name.png");//更换热门问题快商通图标
                    //右侧热门问题加二级导航标识
                    $(".pro2N").addClass("pro2N_name");
                }
            };
            module.showTopform=function(obj,className,el,addClass){
                if($(obj).find(className).length==1){
                    $(className).parent().css({
                        display:"block",
                        height:"auto"
                    });
                    $(className).parent().siblings(el).addClass(addClass);
                }
            };
            module.clickNav=function(obj){
                $(obj).click(function() {
                    setTreeStyle($(this));
                });
            };
            return module;
        }
    )(window.tools_Help || {});
    tools_Help.reMainHg(".pro2",".pro3",".help_main");//主要内容高度小于右侧侧边栏高度，进行主要内容高度=右侧侧边栏高度
    tools_Help.retunHref();//二级导航更换左侧导航样式
    tools_Help.showTopform("#tree_root>li>ul",".conT","span","doNameSpan");//二级导航时对应的一级导航也显示
    tools_Help.clickNav("#tree_root li .Off i");
    //目录树折叠按钮 -------------------------------
    function setTreeStyle(obj) {
        var objStyle = obj.parents("b");
        var objList = objStyle.parent().siblings("ul");
        if (objList.length == 1) {
            var style = objStyle.attr("class");
            objStyle.attr("class", "On2Off");
            setTimeout(
                function() {
                    if (style == "Off") {
                        objList.parent().siblings("li").children("span").children(".On").each(function() {
                            setTreeStyle($(this).parent());
                        });
                        var H = objList.innerHeight();
                        $("#tree_root>li>ul").css({
                            display: "none"
                        });
                        objList.css({
                            display: "block",
                            height: "0"
                        });
                        objList.animate({
                            height: H
                        }, 300, function() {
                            $(this).css({
                                height: "auto"
                            });
                        });
                        $("#tree_root").find(".On").attr("class", "Off");
                        objStyle.attr("class", "On");

                    } else if (style == "On") {
                        objList.find("li").children("span").children(".On").each(function() {
                            setTreeStyle($(this).parent());
                        });
                        var H = objList.innerHeight();
                        objList.animate({
                            height: 0
                        }, 300, function() {
                            $(this).css({
                                height: "auto",
                                display: "none"
                            })
                        });
                        objStyle.attr("class", "Off");
                    }
                },
                42
            );
        }
    }
    // -----------------------------------------	
});