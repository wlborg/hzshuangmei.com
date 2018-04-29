//    轮播1
var swiper1 = new Swiper('.swiper-container1', {
    direction: 'horizontal',
    loop: true,
       autoplay: 3000,//自动轮播
    speed: 500,
    slideToClickedSlide:true,
    slidesPerView : 3,
    nextButton: '.next1',
    prevButton: '.prev1',
    spaceBetween: 70,
    // 如果需要分页器
    autoplayDisableOnInteraction: false,
    paginationClickable: true,
});
$('.swiper-container1').mouseenter(function () {
    swiper1.stopAutoplay();
}).mouseleave(function () {
    swiper1.startAutoplay()
});
//    $('.swiper-slide').on('click', 'div', function () {
//        var index = $(this).index();
//
//        swiper1.slideTo(index , 1000, true);//切换到第一个slide，速度为1秒
//    });
function aa() {
    var a1=$('.swiper-slide-active').children("p").html();
    $(".page").eq(a1).css('display','block').siblings().css('display','none');
}
setInterval(aa,100);

var swiper2 = new Swiper('.swiper-container2', {
    direction: 'horizontal',
    loop: true,
       autoplay: 3000,//自动轮播
    speed: 500,
    slidesPerView : 3,
    loopedSlides: 3,
    nextButton: '.next1',
    prevButton: '.prev1',
    centeredSlides : true,

    // 如果需要分页器
    autoplayDisableOnInteraction: false,
    slideToClickedSlide:true,
    paginationClickable: true,
});
$('.swiper-container2').mouseenter(function () {
    swiper2.stopAutoplay();
}).mouseleave(function () {
    swiper2.startAutoplay()
});
var swiper3 = new Swiper('.swiper-container3', {
    direction: 'horizontal',
    loopedSlides: 3,
    loop: true
});
//    轮播1

swiper2.params.control = swiper3;//Swiper2控制Swiper3，需要在Swiper1初始化后
swiper3.params.control = swiper2