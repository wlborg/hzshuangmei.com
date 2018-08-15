var mySwiper = new Swiper('.swiper-container', {
	    autoplay: 2000,//可选选项，自动滑动
		loop: true,
		pagination : '.swiper-pagination',
		effect : 'fade',
		fade: {
		  crossFade: false
		},
		paginationType : 'custom',
		paginationCustomRender: function (swiper, current, total) {
			$('.part6 .bullet-wrap .item').eq(current-1).addClass('active').siblings().removeClass('active');
		 }
	})
	$('.part6 .bullet-wrap .item').mouseover(function(){
			    var index = $(this).index('.part6 .bullet-wrap .item');
			    mySwiper.slideTo(index + 1);
			    mySwiper.startAutoplay();
			})

	/*$(".swiper-container").mouseenter(function () {//滑过悬停
	    mySwiper.stopAutoplay();//mySwiper 为上面你swiper实例化的名称
	}).mouseleave(function(){//离开开启
	    mySwiper.startAutoplay();
	})*/


	$(".img-bg-wrap").mouseover(function(){
		var index = $(this).index('.img-bg-wrap');
		if(index < 2) {
			$(this).addClass('active');
		}else {
			$(this).addClass('active-1');
		}
		$('.part1 .txt-wrap .title').eq(index).css({
			"color": "#fff"
		});
		$(".part1 .txt-wrap .title-chl").eq(index).css({
			"color": "#fff"
		})
	}).mouseout(function(){
		var index = $(this).index('.img-bg-wrap');
		if(index < 2) {
			$(this).removeClass('active');
		}else{
			$(this).removeClass('active-1');
		}
		$('.part1 .txt-wrap .title').eq(index).css({
			"color": "#333333"
		});
		$(".part1 .txt-wrap .title-chl").eq(index).css({
			"color": "#666666"
		})
	})

	wow = new WOW({
					boxClass: 'wow', // default 盒子类名
					animateClass: 'animated', // default 为animate.css触发css动画的库
					offset: 0, // default 偏移量
					mobile: true, // default 是否支持手机
					live: true // default 检查新元素
				})
				wow.init();
