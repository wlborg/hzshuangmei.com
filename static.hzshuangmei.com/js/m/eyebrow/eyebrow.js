var mySwiper = new Swiper(".swiper-container", {
			autoplay: 2500,//可选选项，自动滑动
		    loop: true,
			pagination : '.swiper-pagination',
			paginationType : 'custom',
			paginationCustomRender: function (swiper, current, total) {
				$('.swiper .swiper-btn .swiper-btn-item').eq(current-1).addClass('active').siblings().removeClass('active');
			 }
	})
	$('.swiper .swiper-btn .swiper-btn-item').click(function(){
			    var index = $(this).index('.swiper .swiper-btn .swiper-btn-item');
			    mySwiper.slideTo(index + 1);
			    mySwiper.startAutoplay();
			})