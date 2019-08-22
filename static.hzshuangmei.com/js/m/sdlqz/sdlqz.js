
$(function () {
    var swiper = new Swiper('.box4_swiper', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {delay: 4000, disableOnInteraction: false,},
        loop: true,
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',},
        on: {
            slideChangeTransitionStart: function () {
                var num = (this.realIndex);
                $(".tab li").removeClass("active");
                $(".tab li:eq(" + num + ")").addClass("active");
            }
        }
    });
    $('.tab li').click(function () {
        var index = $(this).index();
        swiper.slideTo(index + 1);
    });

});



