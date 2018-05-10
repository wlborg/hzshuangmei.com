
var swiper1 = new Swiper('.m5ulbox', {
    direction: 'horizontal',
    loop: true,

    autoplay: 1000,//自动轮播
    speed: 2000,
//        spaceBetween: 100,
    // 如果需要分页器
    pagination: '.m5pagecon',
    nextButton: '.m5left',
    prevButton: '.m5right',
    autoplayDisableOnInteraction: false,
    paginationClickable: true,
    paginationType: 'custom',
    paginationCustomRender: function (swiper, current, total) {
        var customPaginationHtml = "";
        for (var i = 1; i <= total; i++) {
            //判断哪个分页器此刻应该被激活
            if (i == current) {
                customPaginationHtml += '<span class="m5active2">'+'</span>';
            } else {
                customPaginationHtml += '<span>'+ '</span>';
            }
        }
        return customPaginationHtml;
    }
//
});
$('.m5pagecon').on('click', 'span', function () {
    var index = $(this).index();
//         alert(index);
    swiper1.slideTo(index + 1, 1000, true);//切换到第一个slide，速度为1秒
});
$('.m5ulbox').mouseenter(function () {
    swiper1.stopAutoplay();
}).mouseleave(function () {
    swiper1.startAutoplay()
});
