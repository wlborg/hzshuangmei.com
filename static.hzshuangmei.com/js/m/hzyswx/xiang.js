$(function(){
	var $key=0;
var timer=setInterval(autoplay,3000)
	$(".rightx").click(function(){
    autoplay()
	});
	$(".leftx").click(function(){
		$key--;
		$key=$key%(".main7-box li").length;
		console.log($key);
		$(".main7-box li").eq($key).show().siblings().hide();
		if($key<-3){
			$key=0;
			 $(".main7-box li").eq($key).show().siblings().hide();
		};
	});
 function autoplay(){
		$key++;
		 $key=$key%(".main7-box li").length;
		   $(".main7-box li").eq($key).show().siblings().hide();
		   if($key>3){
             $key=0;
             $(".main7-box li").eq($key).show().siblings().hide();
		   };
 };

// $(".main7").hover(function(){
//   clearInterval(timer);
//   timer=null
// },function(){
//   clearInterval(timer);
//   timer=setInterval(autoplay,3000)
// })

})
