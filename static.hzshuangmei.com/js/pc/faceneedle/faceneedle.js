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
		// 向上滑动动画
	$(".part1-panel .list-item").mouseover(function(){
	    $(this).stop().animate({"top": "-3px"}, 300);
	    // $(this).addClass('item-active');
	}).mouseout(function(){
	    $(this).stop().animate({"top": "0px"}, 300);
	    // $(this).removeClass('item-active');
	})

	// 按钮特效
	$(".btn-wrap a").mouseover(function(){
		var index = $(this).index(".btn-wrap a");
		// console.log($(".go"));
		$(".go").eq(index).stop().animate({
			"left": ".33rem"
		}, 350)
		$(".go-img").eq(index).stop().animate({
			"left": "-.33rem"
		}, 350)
	}).mouseout(function(){
		var index = $(this).index(".btn-wrap a");
		// console.log($(".go"));
		$(".go").eq(index).stop().animate({
			"left": "0px"
		}, 350)
		$(".go-img").eq(index).stop().animate({
			"left": "0px"
		}, 350)
	})



	// 圆圈特效

	$(".part2 .pic-item").mouseover(function(){
		var index = $(this).index(".part2 .pic-item");
		$(".part2 .circle .nor-circle").eq(index).addClass('active').siblings().removeClass("active");
	})

	var mySwiper =  new Swiper(
		'.swiper-container', {
			autoplay: 2500,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
			loop: true
		}
	)

	$('.swiper-button-con').click(function(){
			    mySwiper.startAutoplay();
			})
	$(".swiper .img-wrap img").mouseover(function(){
		mySwiper.stopAutoplay();
	}).mouseout(function(){
		mySwiper.startAutoplay();
	})
	 new WOW().init();