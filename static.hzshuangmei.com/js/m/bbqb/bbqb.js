/**
 * Created by Administrator on 2019/8/7.
 */
var mySwiper2 = new Swiper('.box2_swiper', {
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
});

var mySwiper1 = new Swiper('.box3_swiper', {
    direction: 'horizontal',
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: '.pagination3',
        clickable: true,

    },
})

var mySwiper1 = new Swiper('.box5_swiper', {
        direction: 'horizontal',
//        autoplay: {
//            delay: 5000,
//            disableOnInteraction: false,
//        },
        loop: true,
        pagination: {
            el: '.pagination5',
            clickable: true,

        },
    })
