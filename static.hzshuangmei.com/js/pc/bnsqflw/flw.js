wow = new WOW(
    {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    }
);
wow.init();
var zjindex=1;
$(".m5jh div").click(function () {

    zjindex=$(this).index();
    var qh=zjindex+1;
    $(".m5qh").attr("src",'//img.hzshuangmei.com/pc/bnsqflw/images/m5qh'+qh+'.png');
    $(".m5zj div").eq($(this).index()).css("display","block").siblings().css("display","none");

});
function zjqh() {
    $('.m5zj div').eq(zjindex).show().siblings().hide();
    var qh2=zjindex+1;
    $(".m5qh").attr("src",'//img.hzshuangmei.com/pc/bnsqflw/images/m5qh'+qh2+'.png');
    zjindex++;
    if (zjindex>2){
        zjindex=0
    }
}
$(".m5zj div").hover(
    function () {
        clearInterval(bb);
    },function () {
        bb = setInterval(zjqh, 4000);
    }
);
var bb=setInterval(zjqh,4000)