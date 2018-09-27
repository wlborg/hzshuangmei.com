
new WOW().init();
$(function(){

    $(".m1 .item").mouseover(function(){
        $(this).stop().animate({"top": "-3px"}, 300);
        // $(this).addClass('item-active');
    }).mouseout(function(){
        $(this).stop().animate({"top": "1px"}, 300);
        // $(this).removeClass('item-active');
    })
})
