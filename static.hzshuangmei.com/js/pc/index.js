//Swiper
var video = new Swiper('.video_swiper', {
    //loop:true,
    slidesPerView: 1,
    //paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
    nextButton: '.video-button-next',
    prevButton: '.video-button-prev'
    //autoplay:5000
});
var news = new Swiper('.news_swiper', {
    pagination: '.news-pagination',
    paginationClickable: true,
    spaceBetween: 30
});

var news_tuijian = new Swiper('.news_tuijian', {
    loop:true,
    autoplay:3000,
    direction: 'vertical'
});
$('.news_tuijian').hover(function(){
    news_tuijian.stopAutoplay();
},function(){
    news_tuijian.startAutoplay();

});
var tabs2=document.getElementById("tab2").getElementsByTagName("li");
var divs2=document.getElementById("tabCon2").getElementsByTagName("li");
for(var i=0;i<tabs2.length;i++){
    tabs2[i].onmouseover=function(){change2(this);}
}
function change2(obj){
    for(var i=0;i<tabs2.length;i++){
        if(tabs2[i]==obj){
            tabs2[i].className="fli2";
            divs2[i].className="fdiv2";
        }else{
            tabs2[i].className="";
            divs2[i].className="";
        }
    }
}
var tabs3=document.getElementById("tab3").getElementsByTagName("li");
var divs3=document.getElementById("tabCon3").getElementsByTagName("li");
for(var i=0;i<tabs3.length;i++){
    tabs3[i].onmouseover=function(){change3(this);}
}
function change3(obj){
    for(var i=0;i<tabs3.length;i++){
        if(tabs3[tabs3.length-1]==obj){
            tabs3[tabs3.length-1].className="fli3";
            divs3[tabs3.length-1].className="fdiv3";
            $('.swiper-button-prev').css("display",'none');
            $('.swiper-button-next').css("display",'none');
          tabs3[0].className='';
            tabs3[1].className='';
            tabs3[2].className='';
        }
       else if(tabs3[i]==obj){
            tabs3[i].className="fli3";
            divs3[i].className="fdiv3";
           $('.swiper-button-prev').css("display",'block');
           $('.swiper-button-next').css("display",'block');
        }else{
            tabs3[i].className="";
            divs3[i].className="";
            $('.swiper-button-prev').css("display",'block');
            $('.swiper-button-next').css("display",'block');
        }

    }
}


var index_expert = new Swiper('.swiper-container4', {
    loop:true,
    slidesPerView: 4,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    nextButton: '.swiper-button-next4',
    prevButton: '.swiper-button-prev4'
    //spaceBetween: 40
});

// 日记切换
var tabs4=document.getElementById("tab4").getElementsByTagName("li");
var divs4=document.getElementById("tabCon4").getElementsByTagName("ul");
for(var i=0;i<tabs4.length;i++){
    tabs4[i].onmouseover=function(){change4(this);}
}
function change4(obj){
    for(var i=0;i<tabs4.length;i++){
        if(tabs4[i]==obj){
            tabs4[i].className="fli4";
            divs4[i].className="fdiv4 clearFix";
        }else{
            tabs4[i].className="";
            divs4[i].className="clearFix";
        }
    }
}

var swiper5 = new Swiper('.swiper-container5_1', {
    loop:true,
    autoplay:3000,
    slidesPerView: 1,
    spaceBetween: 30,
    keyboardControl: true,
    autoplayDisableOnInteraction : false,
    nextButton: '.swiper-button-next5_1',
    prevButton: '.swiper-button-prev5_1'
});
var swiper6 = new Swiper('.swiper-container5_2', {
       loop:true,
       autoplay:3000,
    slidesPerView: 1,
    spaceBetween: 30,
    keyboardControl: true,
    autoplayDisableOnInteraction : false,
    nextButton: '.swiper-button-next5_2',
    prevButton: '.swiper-button-prev5_2'
});
var swiper7 = new Swiper('.swiper-container5_3', {
    loop:true,
    autoplay:3000,
    slidesPerView: 1,
    spaceBetween: 30,
    keyboardControl: true,
    nextButton: '.swiper-button-next5_3',
    prevButton: '.swiper-button-prev5_3',
    autoplayDisableOnInteraction : false
});
function preReady() {
    $("a:not([href='javascript:void(0)'])").hover(
        function(event) {
        var bool = false;
        var pre_url = $(this).attr("href");
        $("link").each(function() {
            if (($(this).attr("href") == pre_url)) {
                bool = true;
            }
        });
        if (!bool) {
            $("head").append('<link rel="preconnect" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prefetch" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
            $("head").append('<link rel="prerender" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
        }
    },

function(event) {
        var pre_url = $(this).attr("href");
        $('link[rel="preconnect"][href="https://www.hzshuangmei.com/' + pre_url + '"' + ']').remove();
        $('link[rel="prefetch"][href="https://www.hzshuangmei.com/' + pre_url + '"' + ']').remove();
        $('link[rel="prerender"][href="https://www.hzshuangmei.com/' + pre_url + '"' + ']').remove();

    });
}

$(function() {
    //preReady();
    // 首页新闻和资讯切换
     $(".news_infos").click(function(){
                 var index=parseInt($(".news_h.active").index());
                   newsAc(index);
     });
      $(".news_h").hover(function(){
                 var indexs=parseInt($(this).index());
                  $(".news_h").removeClass('active');
                  if(indexs==1){
                       // 导航切换样式
                         $(".news_h").eq(indexs).addClass('active');
                         // 导航对应内容切换
                         $(".news_content").removeClass('active');
                         $(".inform").removeClass('active');
                         $(".news_content").eq(indexs).addClass('active');
                  }else if(indexs==0){
                         $(".news_content").removeClass('active');
                         $(".news_content").eq(indexs).addClass('active');
                        $(".inform").addClass('active');
                         $(".news_h").eq(indexs).addClass('active');
                  }
          })
               function newsAc(indexs){
                    if(indexs==0){
                         indexs=1;
                    }else if(indexs==1){
                         indexs=0;
                    }
                   $(".news_h").removeClass('active');
                   $(".news_h").eq(indexs).addClass('active');
                   infoAC(indexs);
                }
             function infoAC(indexs){
                   if(indexs==0){
                         $(".news_content").removeClass('active');
                         $(".news_content").eq(indexs).addClass('active');
                        $(".inform").addClass('active');
                    }else if(indexs==1){
                         $(".news_content").removeClass('active');
                         $(".inform").removeClass('active');
                         $(".news_content").eq(indexs).addClass('active');
                    }

             }
    //案例经过显示二级导航
    $("#tab4>ul>li").hover(function(){
        var index=$(this).index();
        $("#tabCon4>ul").eq(index).find("ol").addClass("fdiv4Ol");
    })
    $("#tabCon4>ul>ol").hover(function(){
             $(this).addClass("fdiv4Ol");
    })
});
function LcSlideLedt() {
    $(".lc_list_box").append($(".lc_list_box .lc_list_con").eq(0).clone(true));
    var SlideBox = $(".lc_list_box"),
        SlideList = $(".lc_list_box .lc_list_con"),
        NavList = $(".lc_con_b .lc_con_btn"),
        SlideListWidth = SlideList.width(),
        SlideListLegth = SlideList.length,
        SlideBoxWidth = SlideBox.width(SlideListWidth * SlideListLegth),
        $num = 0,
        $slideNum = 0,
        slideTimer = null;
    //滑动开始
    //点击切换
    $(NavList).eq(0).click(function () {
        var index = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        SlideBox.animate({
            "left": 0
        });
        $slideNum =0;
    });
    $(NavList).eq(1).click(function () {
        var index = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        SlideBox.animate({
            "left": -1872
        });
        $slideNum =1872;
    });
    $(NavList).eq(2).click(function () {
        var index = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        SlideBox.animate({
            "left": -3892
        });
        $slideNum =3892;
    });
    $(NavList).eq(3).click(function () {
        var index = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        SlideBox.animate({
            "left": -5870
        });
        $slideNum =5870;
    });
    $(NavList).eq(4).click(function () {
        var index = $(this).index();
        $(this).addClass("now").siblings().removeClass("now");
        SlideBox.animate({
            "left": -7815
        });
        $slideNum =7815;
    });
    slideTimer = setInterval(autoSlide,20);

    function autoSlide() {
        $slideNum++;
        if (0<$slideNum&&$slideNum<1872) {
            $num=0;
        }
        if (1872<$slideNum&&$slideNum<3892) {
            $num=1;
        }
        if (3892<$slideNum&&$slideNum<5870) {
            $num=2;
        }
        if (5870<$slideNum&&$slideNum<7815) {
            $num=3;
        }
        if (7815<$slideNum&&$slideNum<9585) {
            $num=4;
        }
        if (9585<$slideNum) {
            $num=5;
        }
        if ($num ==5) {
            SlideBox.css("left", 0);
            $num = 0;
            $slideNum = 0;
        }
        ;
        SlideBox.css(
            "left", -$slideNum);
        NavList.eq($num).addClass('now').siblings().removeClass('now');
    }

    $(NavList).hover(function () {
        clearInterval(slideTimer);
    }, function () {
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide,20);
    });
    $('.lc_list_box .lc_list_con img').hover(function () {
        clearInterval(slideTimer);
    }, function () {
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide,20);
    });
}
$(function () {
    LcSlideLedt();
});
