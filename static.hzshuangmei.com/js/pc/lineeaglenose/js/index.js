
var tabs=document.getElementById("tab").getElementsByTagName("li");
var tabs1=document.getElementById("tab").getElementsByTagName("div");
for(var i=0;i<tabs.length;i++){
    tabs[i].onmouseover=function(){change(this);}
}
function change(obj){
    for(var i=0;i<tabs.length;i++){
        if(tabs[i]==obj){
            tabs1[i].className="fli";
        }else{
            tabs1[i].className="";
        }
    }
}

var tabs2=document.getElementById("tab2").getElementsByClassName("top");
for(var i=0;i<tabs2.length;i++){
    tabs2[i].onmouseover=function(){change2(this);}
}
function change2(obj){
    for(var i=0;i<tabs.length;i++){
        if(tabs2[i]==obj){
            tabs2[i].className="top fli2";
        }else{
            tabs2[i].className="top";
        }
    }
}
var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    loop: true,
    autoplay: 5000,
    //effect : 'fade',
    //fade: {
    //    crossFade: false
    //},
    loopedSlides: 3 //looped slides should be the same
});
var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 5,
    slidesPerView: 3,
    touchRatio: 0.2,
    loop: true,
    loopedSlides: 3, //looped slides should be the same
    slideToClickedSlide: true
});
galleryTop.params.control = galleryThumbs;
galleryThumbs.params.control = galleryTop;

var btabs=document.getElementById("tab1").getElementsByTagName("li");
var divs=document.getElementById("tabCon").getElementsByTagName("div");
for(var i=0;i<btabs.length;i++){
    btabs[i].onmouseover=function(){change1(this);}
}
function change1(obj){
    for(var i=0;i<btabs.length;i++){
        if(btabs[i]==obj){
            btabs[i].className="fli";
            divs[i].className="fdiv";
        }else{
            btabs[i].className="";
            divs[i].className="";
        }
    }
}
