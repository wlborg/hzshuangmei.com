$(function(){
   $(".libox").hover(function(){
    $(this).children("span, p").stop().animate({"bottom":-100},600);

   },function(){
   	   $(this).children("span, p").stop().animate({"bottom":0},600);
   });
});