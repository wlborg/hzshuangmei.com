
var ptabs=document.getElementById("ptab").getElementsByTagName("li");
var pdivs=document.getElementById("ptabCon").getElementsByTagName("div");
for(var i=0;i<ptabs.length;i++){
    ptabs[i].onmouseover=function(){pchange1(this);}
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

//prerender
function preReady() {
//顶部导航区域
    $("#nav").find("a:not([href=''][href='#'])").hover(
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
    $("#ptabCon2").find("a:not([href=''][href='#'])").hover(
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
    preReady();
});
