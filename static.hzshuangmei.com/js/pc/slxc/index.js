var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,

    live: true,
    callback: function(box) {},
    scrollContainer: null
});
wow.init();
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    debugger: true,
    loop: true,
    autoplay:5000,
    effect: 'fade',
    fade: {
        crossFade: true
    }
})
