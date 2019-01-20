var mySwiper = new Swiper(".swiper-container", {
		    prevButton:'.swiper-button-prev',
		    nextButton:'.swiper-button-next',
			autoplay: 2000,//可选选项，自动滑动
		    loop: true,
	})
	$('.swiper-button-con').click(function(){
			    mySwiper.startAutoplay();
			})