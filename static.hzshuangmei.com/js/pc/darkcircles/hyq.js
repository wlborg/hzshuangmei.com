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

var mySwiper = new Swiper('.swiper-container', {
	autoplay: 1500,//可选选项，自动滑动
	loop: true,
	prevButton:'.swiper-button-prev',
	nextButton:'.swiper-button-next',
})

$(".swiper-container").mouseenter(function () {//滑过悬停
    mySwiper.stopAutoplay();//mySwiper 为上面你swiper实例化的名称
}).mouseleave(function(){//离开开启
    mySwiper.startAutoplay();
})


// WOW.js
var　wow = new WOW({
      　　animateClass: 'animated',
      });
      wow.init();