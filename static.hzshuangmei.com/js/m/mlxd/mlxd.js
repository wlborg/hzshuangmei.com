var mySwiper3 = new Swiper('.box6_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.pagination6',
            clickable: true,

        },
    });
    var mySwiper2 = new Swiper('.box5_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.pagination5',
            clickable: true,

        },
    });

    var mySwiper1 = new Swiper('.box2_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.pagination2',
            clickable: true,

        },
        on: {
            slideChangeTransitionStart: function () {
                var num = (this.realIndex);
                $(".tab li").removeClass("active");
                $(".tab li:eq(" + num + ")").addClass("active");
            }
        }
    })


    $('.tab li').click(function () {
        var index = $(this).index();
        mySwiper1.slideTo(index + 1);
    });