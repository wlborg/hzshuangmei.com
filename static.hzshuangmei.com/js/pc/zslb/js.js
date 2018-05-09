var lbindex=0;
$(".m5_tab1 li").click(function () {
    $(this).addClass("m5active1").siblings().removeClass("m5active1");
    lbindex=$(this).index();
    $('.m5_tab2 li').eq( lbindex).addClass('m5active2').siblings().removeClass('m5active2');
});
var lblb=function () {
    if (lbindex==2){
        lbindex=-1
    }
    ++lbindex;
    $('.m5_tab1 li').eq(lbindex).addClass('m5active1').siblings().removeClass('m5active1');
    $('.m5_tab2 li').eq(lbindex).addClass('m5active2').siblings().removeClass('m5active2');
};
$(".m5_tab1 li,.m5_tab2 li").hover(
    function () {
        clearInterval(bb);
    },function () {
        bb = setInterval(lblb, 2000);
    }
);
var bb=setInterval(lblb,2000)