// $(function(){
//     var $img=$("<img src='./images/fq.png' class='fq'>");
//     $('body').append($img);
// });
$('.m4page>div').hover(
    function () {
        $(this).addClass('d1').siblings().removeClass('d1');
        var i=$(this).index();
        $('.m4pagecon>div').eq(i).css('display',' block').siblings().css('display','none')
    }

);
$('.m3page>div').hover(function () {
    $(this).css( 'background-color','rgba(79, 110, 225, 0.8)'
    ).siblings().css('background-color','rgba(79, 159, 225, 0.8)')
});
$(window).scroll(function(){
    if($(window).scrollTop()>1000){
        $('.anniu1').animate({right:'50%', marginRight:'-293px'},1500);
    }
    if($(window).scrollTop()>2500){
        $('.anniu2').animate({left:'50%'},1500);

    }
    if($(window).scrollTop()>4000){
        $('.anniu3').animate({top:'-20px'},1000);
        $('.anniu3').animate({top:'20px'},1000);
        $('.anniu3').animate({top:'0'},1000,function () {
            $('.anniu3').stop(true,true);
        });


    }
    if($(window).scrollTop()>6300){
        $('.anniu4').animate({left:'-20px'},1000);
        $('.anniu4').animate({left:'20px'},1000);
        $('.anniu4').animate({left:'-20px'},1000,function () {
            $('.anniu4').stop(true,true);
        });
    }
});
// $("body").delegate(".fq","click",function(){
//     window.open("http://www.baidu.com.cn")
// });