<script type="text/javascript">
	var mySwiper = new Swiper('.swiper-container', {
	autoplay: 2500,//可选选项，自动滑动
	loop: true,
	effect : 'fade',
    fade: {
            crossFade: false
            },
	prevButton:'.swiper-button-prev',
	nextButton:'.swiper-button-next',
	pagination : '.swiper-pagination',
  	paginationType : 'custom',
 	paginationCustomRender: function (swiper, current, total) {
    	  $('.left-btn .btn-item').eq(current-1).addClass('active').siblings().removeClass('active');
  }
}) 
	$('.left-btn .btn-item').mouseover(function(){
	    var index = $(this).index('.left-btn .btn-item');
	    mySwiper.slideTo(index + 1);
	    mySwiper.startAutoplay();
	})
</script>