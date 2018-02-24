
var swiper2 = new Swiper ('.swiper-container2', {
    loop: true,
    autoplay: 3000,//自动轮播
    nextButton: '.m7next',
    prevButton: '.m7prev',
    speed: 1000,
//        slidesPerView: 4,
    autoplayDisableOnInteraction : false,
//        spaceBetween: 50,
    freeMode: true,
})
$('.swiper-container2').mouseenter(function () {
    swiper2.stopAutoplay();
}).mouseleave(function () {
    swiper2.startAutoplay()
})

function LcSlideLedt() {
    $(".lun1box").append($(".lun1box .lun1boxcon").eq(0).clone(true));
    var SlideBox = $(".lun1box"),
        SlideList = $(".lun1box .lun1boxcon"),
        NavList = $(".lc_con_b .lc_con_btn"),
        SlideListWidth = SlideList.width(),
        SlideListLegth = SlideList.length,
        SlideBoxWidth = SlideBox.width(SlideListWidth * SlideListLegth),
        $num = 0,
        $slideNum = 0,
        slideTimer = null;
    //滑动开始
    //点击切换
    slideTimer = setInterval(autoSlide,25);

    function autoSlide() {
        $slideNum++;
        if ($slideNum > ($num * SlideListWidth + SlideListWidth)) {
            $num++;
        }
        if ($num == 4) {
            SlideBox.css("left", 0);
            $num = 0;
            $slideNum = 0;
        }
        SlideBox.css(
            "left", -$slideNum);
    }

    $('.lun1boxcon img').hover(function () {
        clearInterval(slideTimer);
    }, function () {
        clearInterval(slideTimer);
        slideTimer = setInterval(autoSlide,25);
    });
}
$(function () {
    LcSlideLedt();
})
