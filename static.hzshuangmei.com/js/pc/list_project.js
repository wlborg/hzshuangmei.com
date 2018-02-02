
var ptabs=document.getElementById("ptab").getElementsByTagName("li");
var pdivs=document.getElementById("ptabCon").getElementsByTagName("div");
for(var i=0;i<ptabs.length;i++){
    ptabs[i].onclick=function(){pchange1(this);}
}
function pchange1(obj){
    for(var i=0;i<ptabs.length;i++){
        if(ptabs[i]==obj){
            ptabs[i].className="pli";
            pdivs[i].className="pdiv";
        }else{
            ptabs[i].className="";
            pdivs[i].className="";
        }
    }
}


var ptabs2=document.getElementById("ptab2").getElementsByTagName("li");
var pdivs2=document.getElementById("ptabCon2").getElementsByTagName("li");
for(var k=0;k<ptabs2.length;k++){
    ptabs2[k].onclick=function(){pchange2(this);}
}
function pchange2(obj){
    for(var k=0;k<ptabs2.length;k++){
        if(ptabs2[k]==obj){
            ptabs2[k].className="pli2";
            pdivs2[k].className="pdiv2";

        }else{
            ptabs2[k].className="";
            pdivs2[k].className="";

        }
    }
}

$(function() {
    $(".project_con").eq(0).show();
    $(".btn li").click(function() {
        var num = $(".btn li").index(this);
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
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
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
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/projects/' + pre_url +'"'+ '>');
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
});
