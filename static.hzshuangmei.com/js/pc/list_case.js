
$(function() {
    $(".case_con").eq(0).show();
    $(".btn li").click(function() {
        var num = $(".btn li").index(this);
        $(".case_con").hide();
        $(".case_con").eq(num).show().slblings().hide();
    });
// 导航控制跳转显示
       //preReady();
    var tools_cases = (
      function(module) {
              //导航高亮显示
               module.getProLig = function(obj,className,conObj,conClassName) {
                    $(obj).hover(function(){
                          var index=$(this).index();
                            $(conObj).removeClass(conClassName);
                            $(conObj).eq(index).addClass(conClassName);
                    },function(){
                        //$(conObj).removeClass(conClassName);
                        //var tIndex=$(className).index();
                        //$(conObj).eq(tIndex).addClass(conClassName);
                        //console.log("tIndex:"+tIndex);
                   });
                   //tools_cases.getProLig(".cases_conT>li","conT",".cases_con1_con2_1","cases_pr");
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
                      $(opacvClass).parents(obj).addClass('cases_pr');
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
    tools_cases.getProLig(".cases_conT>li",".conT",".cases_con1_con2_1","cases_pr");
    tools_cases.hoverSon("#cases_con1_con2>.cases_con1_con2_1>li","hoverClass");
    tools_cases.sonPar(".cases_conT li",".cases_con1_con2_act",".cases_con1_con2_1");
    tools_cases.parNav(".conT","#cases_conTc>ul","cases_pr");

});
$(function() {
    //点击顶部导航
    $("#cases_conT").find('a').each(function(index, el) {
        $(this).on('click',function(){
            var href = $(this).attr('href') + "#ca_01";
            $(this).attr('href', href);
        })
    });

});
//$(function($) {
var position = $(window).height();
        //var po_left = $("#case_tab").height();
        //$("#case_tab").css('top', position / 2 - po_left / 2);
//    $(window).scroll(function(event) {
//        if ($(window).scrollTop() > 400) {
//            $("#case_tab").addClass('case_tab');
//        } else {
//            $("#case_tab").removeClass('case_tab');
//        }
//    });
//});
/*
  prerender
*/
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
    $("#case_tabCon").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
            var bool = false;
            var pre_url = $(this).attr("href");
            $("link").each(function() {
                if (($(this).attr("href") == pre_url)) {
                    bool = true;
                }
            });
            if (!bool) {
                $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + '>');
                $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + '>');
                $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + '>');
            }
        },
        function(event) {
            var pre_url = $(this).attr("href");
            $('link[rel="preconnect"][href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + ']').remove();
            $('link[rel="prefetch"][href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + ']').remove();
            $('link[rel="prerender"][href="https://www.hzshuangmei.com/cases/' + pre_url + '"' + ']').remove();
        });
}
