var news_banner = new Swiper('.news_banner', {
    pagination: '.news_pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
});
window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdMiniList": false, "bdPic": "", "bdStyle": "1", "bdSize": "24" }, "share": {} };
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];


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

//非导航区域
    $(".news_main").find("a:not([href='javascript:void(0)'])").hover(
        function(event) {
        var bool = false;
        var pre_url = $(this).attr("href");
        $("link").each(function() {
            if (($(this).attr("href") == pre_url)) {
                bool = true;
            }
        });
        if (!bool) {
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/news/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/news/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/news/' + pre_url +'"'+ '>');
        }
    },

function(event) {
        var pre_url = $(this).attr("href");
        $('link[rel="preconnect"][href="https://www.hzshuangmei.com/news/' + pre_url + '"' + ']').remove();
        $('link[rel="prefetch"][href="https://www.hzshuangmei.com/news/' + pre_url + '"' + ']').remove();
        $('link[rel="prerender"][href="https://www.hzshuangmei.com/news/' + pre_url + '"' + ']').remove();

    });
}

$(function() {
    //preReady();

});
