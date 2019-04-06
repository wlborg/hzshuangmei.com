
var doctors_banner = new Swiper('.doctors_banner', {
    pagination: '.doctors_pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true
});
$(function() {
    $(".doc_con").eq(0).show();
    $(".btn li").click(function() {
        var num = $(".btn li").index(this);
        $(".doc_con").hide();
        $(".doc_con").eq(num).show().slblings().hide();
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
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
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
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com' + pre_url +'"'+ '>');
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
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
        }
    },

function(event) {
        var pre_url = $(this).attr("href");
        $('link[rel="preconnect"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();
        $('link[rel="prefetch"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();
        $('link[rel="prerender"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();

    });

//非导航区域
    $("#doctors_tabCon").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
        var bool = false;
        var pre_url = $(this).attr("href");
        $("link").each(function() {
            if (($(this).attr("href") == pre_url)) {
                bool = true;
            }
        });
        if (!bool) {
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/doctors/' + pre_url +'"'+ '>');
        }
    },

function(event) {
        var pre_url = $(this).attr("href");
        $('link[rel="preconnect"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();
        $('link[rel="prefetch"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();
        $('link[rel="prerender"][href="https://www.hzshuangmei.com/doctors/' + pre_url + '"' + ']').remove();

    });
}

$(function() {
    //preReady();
});
