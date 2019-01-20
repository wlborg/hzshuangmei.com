$(function () {
	$('.tab-indicator li').hover(function (e) {
		var index = $(this).index()
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab-content .item').eq(index).addClass('active').siblings().removeClass('active');
	})
})