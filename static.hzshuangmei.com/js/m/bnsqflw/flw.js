
var zjindex=1;
$(".m5jh div").click(function () {
    $(this).css("background-color","#e9b33e").siblings().css("background-color","#72d2ec");
    $(".m5zj div").eq($(this).index()).css("display","block").siblings().css("display","none")
    zjindex=$(this).index();
});
function zjqh() {
    $('.m5zj div').eq(zjindex).show().siblings().hide();
    $(".m5jh div").eq(zjindex).css("background-color","#e9b33e").siblings().css("background-color","#72d2ec");
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
