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
    spaceBetween: 30,
    nextButton: '.news-button-next',
    prevButton: '.news-button-prev'
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
        if(tabs3[i]==obj){
            tabs3[i].className="fli3";
            divs3[i].className="fdiv3";
        }else{
            tabs3[i].className="";
            divs3[i].className="";
        }
    }
}


var index_expert = new Swiper('.swiper-container4', {
    loop:true,
    slidesPerView: 4,
    paginationClickable: true,
    autoplayDisableOnInteraction : false,
    nextButton: '.swiper-button-next4',
    prevButton: '.swiper-button-prev4',
    spaceBetween: 40
});

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

//pre render
// function preReady() {
//     $("a:not([href=''][href='#'])").on('mouseenter', function(event) {
//         var bool = false;
//         var pre_url = $(this).attr("href");
//         $("link").each(function() {
//             if (($(this).attr("href") == pre_url)) {
//                 bool = true;
//             }
//         });
//         if (!bool) {
//             $("head").stop().append('<link rel="preconnect" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
//             $("head").stop().append('<link rel="prefetch" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
//             $("head").stop().append('<link rel="prerender" href="https://www.hzshuangmei.com/' + pre_url +'"'+ '>');
//         }
//     });
//     $("a:not([href=''][href='#'])").on('mouseleave', function(event) {
//         var pre_url = $(this).attr("href");
//         $('link[rel="preconnect"][href="https://www.hzshuangmei.com/"' + pre_url + '"' + ']').stop().remove();
//         $('link[rel="prefetch"][href="https://www.hzshuangmei.com/"' + pre_url + '"' + ']').stop().remove();
//         $('link[rel="prerender"][href="https://www.hzshuangmei.com/"' + pre_url + '"' + ']').stop().remove();
//     });
// }
// $(function() {
//     preReady();
// });
