
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    debugger: true,
    autoplay: 5000,
    loop: true,
    effect: 'fade',
    fade: {
        crossFade: true,
    }
})
var wow = new WOW({ boxClass: 'wow', animateClass: 'animated', offset: 0, mobile: true, live: true, callback: function(box) {}, scrollContainer: null });
wow.init();