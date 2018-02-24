
var swiper1 = new Swiper ('.swiper-container1', {
    loop: true,
//        autoplay: 1,//自动轮播
    speed:10000,
    slidesPerView: 2,
    autoplayDisableOnInteraction : false,
    spaceBetween: 50,
    freeMode: true,
})
$('.swiper-container1').mouseenter(function () {
    swiper1.stopAutoplay();
}).mouseleave(function () {
    swiper1.startAutoplay()
})
var swiper2 = new Swiper ('.swiper-container2', {
    loop: true,
    autoplay: 3000,//自动轮播
    nextButton: '.m7next',
    prevButton: '.m7prev',
    speed: 500,
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