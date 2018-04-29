$(function(){
$(".main1 .ttbox, .main1-in, .main2 .ttbox, .twoul1 li, .main2-in, .twoul2 li, .main3 .ttbox, .main3-in, .main4 .ttbox, .main4-r, .main5 .ttbox,.main5-in, .five1, .five2, .main5 ul .nomargin, .main6 .ttbox, .main6-in, .main7-1 .ttbox, .sev-l, .sev-r, .main8 .ttbox")
.css("display","none");
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
$(".main7").hover(function(){
  clearInterval(timer);
  timer=null
},function(){
  clearInterval(timer);
  timer=setInterval(autoplay,3000)
});
// ..........
$(window).scroll(function(){
	var win= $(window).scrollTop();
	var bn=$(".bn").height();
	var main1=$(".main1").height();
	var main2=$(".main2").height();
	var main3=$(".main3").height();
	var main4=$(".main4").height();
	var main5=$(".main5").height();
	var main6=$(".main6").height();
	var main7=$(".main7").height();
	if(win>=1){
	$(".main1 .ttbox").fadeIn();
	$(".main1-in").fadeIn();
	};
	if(win>=bn+main1/2){
	$(".main2 .ttbox").fadeIn();
	$(".main2 .ttbox").fadeIn();
	$(".main2-in").fadeIn();
	};
	if(win>=bn+main1/3){
	$(".twoul1 li").fadeIn();
	$(".twoul2 li").fadeIn();
	};
	if(win>=bn+main1+main2/2){
	$(".main3 .ttbox").fadeIn();
	$(".main3-in").fadeIn();
	};
	if(win>=bn+main1+main2+main3/2){
	$(".main4 .ttbox").fadeIn();
	$(".main4-r").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4/2){
	$(".main5 .ttbox").fadeIn();
	$(".main5-in").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5/3){
	$(".five1, .five2, .main5 ul .nomargin").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5/2){
	$(".five1, .five2, .main5 ul .nomargin").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5/1.5){
	$(".main6 .ttbox").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5){
	$(".main6-in").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5+main6/2){
	$(".main7-1 .ttbox").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5+main6){
	$(".sev-l, .sev-r").fadeIn();
	};
	if(win>=bn+main1+main2+main3+main4+main5+main6+main7){
	$(".main8 .ttbox").fadeIn();
	};
	});
})
