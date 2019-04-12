var ptabs = document.getElementById("ptab").getElementsByTagName("li");
var pdivs = document.getElementById("ptabCon").getElementsByTagName("div");
for (var i = 0; i < ptabs.length; i++) {
    ptabs[i].onclick = function() { pchange1(this); }
}

function pchange1(obj) {
    for (var i = 0; i < ptabs.length; i++) {
        if (ptabs[i] == obj) {
            ptabs[i].className = "pli";
            pdivs[i].className = "pdiv";
        } else {
            ptabs[i].className = "";
            pdivs[i].className = "";
        }
    }
}
$(function() {
    $(".project_con").eq(0).show();
    $(".btn1 li").click(function() {
        var num = $(".btn1 li").index(this);
        $(".project_con").hide();
        $(".project_con").eq(num).show().slblings().hide();
    })
});
//prerender
function preReady() {
    //顶部主导航区域
    $(".nav_list").children("a:not([href='javascript:void(0)'])").hover(
        function(event) {
            var bool = false;
            var pre_url = $(this).attr("href");
            $("link").each(function() {
                if (($(this).attr("href") == pre_url)) {
                    bool = true;
                }
            });
            if (!bool) {
                $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
                $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
                $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
            }
        },
        function(event) {
            var pre_url = $(this).attr("href");
            $('link[rel="preconnect"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
            $('link[rel="prefetch"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
            $('link[rel="prerender"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
        });
    //子导航区域
    //项目
    $("#project").find("li:not([class='n_button'])").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
            var bool = false;
            var pre_url = $(this).attr("href");
            $("link").each(function() {
                if (($(this).attr("href") == pre_url)) {
                    bool = true;
                }
            });
            if (!bool) {
                $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
                $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
                $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
            }
        },
        function(event) {
            var pre_url = $(this).attr("href");
            $('link[rel="preconnect"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
            $('link[rel="prefetch"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
            $('link[rel="prerender"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
        });
    //专家
    $("#expert").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
            var bool = false;
            var pre_url = $(this).attr("href");
            $("link").each(function() {
                if (($(this).attr("href") == pre_url)) {
                    bool = true;
                }
            });
            if (!bool) {
                $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
                $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
                $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com' + pre_url + '"' + '>');
            }
        },
        function(event) {
            var pre_url = $(this).attr("href");
            $('link[rel="preconnect"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
            $('link[rel="prefetch"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
            $('link[rel="prerender"][href="https://www.hzshuangmei.com' + pre_url + '"' + ']').remove();
        });
    //非导航区域
    $("#ptabCon2").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
            var bool = false;
            var pre_url = $(this).attr("href");
            $("link").each(function() {
                if (($(this).attr("href") == pre_url)) {
                    bool = true;
                }
            });
            if (!bool) {
                $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
                $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
                $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + '>');
            }
        },
        function(event) {
            var pre_url = $(this).attr("href");
            $('link[rel="preconnect"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
            $('link[rel="prefetch"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
            $('link[rel="prerender"][href="https://www.hzshuangmei.com/projects/' + pre_url + '"' + ']').remove();
        });
}
$(function() {
    //preReady();
    var tools_pro = (
      function(module) {
              //导航高亮显示
               module.getProLig = function(obj,className,conObj,conClassName) {
                    $(obj).hover(function(){
                          var index=$(this).index();
                          //$(obj).removeClass(className);
                          //$(obj).eq(index).addClass(className);
                            $(conObj).removeClass(conClassName);
                            $(conObj).eq(index).addClass(conClassName);
                    },function(){
                        $(conObj).removeClass(conClassName);
                        var tIndex=$(className).index();
                        $(conObj).eq(tIndex).addClass(conClassName);
                    });
               };
              //经过二级导航下边框出现
              module.hoverSon=function(obj,className){
                   $(obj).removeClass(className);
                   $(this).addClass(className);
              };
              //判断顶部导航的下标
              module.sonPar=function(TObj,opacvClass,obj){
                  var index=parseInt($(opacvClass).parents(obj).index());
                  if(index>=0){
                      $(TObj).removeClass("conT");
                      $(TObj).eq(index).addClass("conT");
                      $(opacvClass).parents(obj).addClass('pro_pr');
                  }
              };
            //获取一级导航显示的下标显示对应内容
             module.parNav=function(ulClassname,obj,className){
                 if (!$(ulClassname)) return;
                 var index=$(ulClassname).index();
                 $(obj).eq(index).addClass(className);
            };
          return module;
     }
    )(window.tools_pro || {});
    tools_pro.getProLig(".pro_conT>li","conT",".pro_con1_con2_1","pro_pr");
    tools_pro.hoverSon("#pro_con1_con2>.pro_con1_con2_1>li","hoverClass");
    tools_pro.sonPar(".pro_conT li",".pro_con1_con2_act",".pro_con1_con2_1");
    tools_pro.parNav(".conT","#pro_conTc>ul","pro_pr");
});
