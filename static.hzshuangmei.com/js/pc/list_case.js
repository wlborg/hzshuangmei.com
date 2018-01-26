//
//var case_tabs=document.getElementById("case_tab").getElementsByTagName("li");
//var case_divs=document.getElementById("case_tabCon").getElementsByTagName("li");
//for(var i=0;i<case_tabs.length;i++){
//    case_tabs[i].onclick=function(){case_change(this);}
//}
//function case_change(obj){
//    for(var i=0;i<case_tabs.length;i++){
//        if(case_tabs[i]==obj){
//            case_tabs[i].className="case_fli";
//            case_divs[i].className="case_fdiv clearFix";
//        }else{
//            case_tabs[i].className="";
//            case_divs[i].className="clearFix";
//        }
//    }
//}
$(function() {
    $(".case_con").eq(0).show();
    $(".btn li").click(function() {
        var num = $(".btn li").index(this);
        $(".case_con").hide();
        $(".case_con").eq(num).show().slblings().hide();
    })
});
$(function() {
    var position = $(window).height();
    var po_left = $("#case_tab").height();
    $("#case_tab").css('top', position / 2 - po_left / 2);
});
$(function($) {
    $(window).scroll(function(event) {
        if ($(window).scrollTop() > 400) {
            $("#case_tab").addClass('case_tab');
        } else {
            $("#case_tab").removeClass('case_tab');
        }
    });
});
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
    $("#project").find("li:not([class='n_button'])").find("a:not([href='javascript:void(0)'][)").hover(
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
/*
案例列表页，翻页定位优化
 */
function paginationFixed() {
    $('.pagination').find('a').on('click', function(event) {
        var thisLink = $(this).attr('href') + "#ca_01";
        $(this).attr('href', thisLink);
    });
    // $('html,body').animate({scrollTop: '850px'}, 800);
$(function() {
    //preReady();
    paginationFixed();
});
