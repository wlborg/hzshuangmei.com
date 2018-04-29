$(function(){
$(".main1 .ttbox, .main1-in, .main2 .ttbox, .twoul1 li, .twoul2 li, .main3 .ttbox, .main3-in, .main4 .ttbox, .main4-r, .main5 .ttbox, .main5-in, .five1, .five2, .main5 ul .nomargin, .main6 .ttbox, .main6-in, .main7-1 .ttbox, .sev-l, .sev-r, .main8 .ttbox, .main8-in")
.css("display","none");
	$(window).scroll(function(){
	var win= $(window).scrollTop();
	var bn=$(".bn").height();
	var main1=$(".main1").height()+66;
	var main2=$(".main2").height();
	var main3=$(".main3").height()+53;
	var main4=$(".main4").height();
	var main5=$(".main5").height()+72;
	var main6=$(".main6").height();
	var main7=$(".main7").height()+57;
	if(win>=bn/2){
	$(".main1 .ttbox").fadeIn();
	$(".main1-in").fadeIn();
	};
	if(win>=bn+main1/2){
	$(".main2 .ttbox").fadeIn();
	$(".twoul1 li").fadeIn();
	$(".twoul2 li").fadeIn();
	}
	if(win>=bn+main1){
	$(".twoul1 li").fadeIn();
	$(".twoul2 li").fadeIn();
	}
	if(win>=bn+main1+main2/2){
	$(".main3 .ttbox").fadeIn();
	$(".main3-in").fadeIn();
	}
	if(win>=bn+main1+main2+main3/2){
	$(".main4 .ttbox").fadeIn();
	$(".main4-r").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4/2){
	$(".main5 .ttbox").fadeIn();
	$(".main5-in").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5/3){
	$(".five1, .five2, .main5 ul .nomargin").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5/2){
	$(".five1, .five2, .main5 ul .nomargin").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5/1.5){
	$(".main6 .ttbox").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5){
	$(".main6-in").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5+main6/2){
	$(".main7-1 .ttbox").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5+main6){
	$(".sev-l, .sev-r").fadeIn();
	}
	if(win>=bn+main1+main2+main3+main4+main5+main6+main7){
	$(".main8 .ttbox, .main8-in").fadeIn();
	}
	})
})