$(function  () {
	$('.indicator').find("li").hover(function  () {
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".des").find("li").eq(index).addClass("active").siblings().removeClass("active");
	})
})