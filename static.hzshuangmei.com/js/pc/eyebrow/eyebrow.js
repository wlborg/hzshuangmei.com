//PC端自适应
	window.onresize = function () {
	    rem()
	}
	// 进行rem的计算 因为是已1920px为基准进行计算的，所以为了方便，把1rem等于100px
	function rem() {
	    var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
	    var wH = window.innerHeight;// 当前窗口的高度
	    var wW = window.innerWidth;// 当前窗口的宽度
	    var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
	    $('html').css('font-size', rem + "px");
	}
	rem();
	$(".part1 .part1-panel .item").mouseover(function(){
		var index = $(this).index('.part1 .part1-panel .item');
		$('.part1-mask').eq(index).stop().animate({"opacity": "1"}, 650);
		// $('.part1-mask').eq(index).stop().animate({"height": "100%", "opacity": "1"}, 300)
	}).mouseout(function() {
		var index = $(this).index('.part1 .part1-panel .item');
		$('.part1-mask').eq(index).stop().animate({"opacity": "0"}, 650);
		// $('.part1-mask').eq(index).stop().animate({"height": "0", "opacity": "0"}, 300)
	})
	
	$('.part3 .part3-panel .pic-item').mouseover(function(){
		// var index = $(this).index('.part3 .part3-panel .pic-item');
		$(this).stop().animate({"top": "-3px"}, 350)
	}).mouseout(function(){
		$(this).stop().animate({"top": "0"}, 350)
	})
	var mySwiper = new Swiper(".swiper-container", {
			autoplay: 2200,//可选选项，自动滑动
		    loop: true,
			pagination : '.swiper-pagination',
			paginationType : 'custom',
			paginationCustomRender: function (swiper, current, total) {
				$('.part4 .swiper-btn .swiper-btn-item').eq(current-1).addClass('active').siblings().removeClass('active');
			 }
	})
	$('.part4 .swiper-btn .swiper-btn-item').mouseover(function(){
			    var index = $(this).index('.part4 .swiper-btn .swiper-btn-item');
			    mySwiper.slideTo(index + 1);
			    mySwiper.stopAutoplay();
			}).mouseout(function(){
				mySwiper.startAutoplay();
			})