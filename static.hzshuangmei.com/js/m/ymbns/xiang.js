/*轮播*/

$(function() {


  $(window).scroll(function() {

    var run = $(window).scrollTop();
    //标题一
    if (run > 10) {
      $(".titleOne .titleTop img").addClass("dongh")
      $(".titleOne .titleLeft").addClass("donghtwo")
      $(".titleOne .titleRight").addClass("donghthree")
    };
    //肌肤问题
    if (run > 20) {
      $(".problemOne li").addClass("donghproblem")
      $(".problemTwo li").addClass("donghproblemm")
    };
    //标题二
    if (run > 150) {

      $(".titletwo .titleTop img").addClass("dongh")
      $(".titletwo .titleLeft").addClass("donghtwo")
      $(".titletwo .titleRight").addClass("donghthree")
    };
    //内容第二部分动画 
    if (run > 330) {
      $(".main2-arc").addClass("dongarc")

    };
    if (run > 550) {
      $(".titlethree .titleTop img").addClass("dongh")
      $(".titlethree .titleLeft").addClass("donghtwo")
      $(".titlethree .titleRight").addClass("donghthree")
    };
    if (run > 1000) {
      $(".titlefour .titleTop img").addClass("dongh")
      $(".titlefour .titleLeft").addClass("donghtwo")
      $(".titlefour .titleRight").addClass("donghthree")
    };
    if (run > 1500) {
      $(".titlefive .titleTop img").addClass("dongh")
      $(".titlefive .titleLeft").addClass("donghtwo")
      $(".titlefive .titleRight").addClass("donghthree")
    };
    if (run > 2000) {
      $(".titlesix .titleTop img").addClass("dongh")
      $(".titlesix .titleLeft").addClass("donghtwo")
      $(".titlesix .titleRight").addClass("donghthree")
    };
    if (run > 2200) {
      $(".titleseven .titleTop img").addClass("dongh")
      $(".titleseven .titleLeft").addClass("donghtwo")
      $(".titleseven .titleRight").addClass("donghthree")
    };
  });



  $(".case:first").clone().appendTo($(".box-in ul"));
  var k = 0;
  var r = $(".case").length
  $(".right").click(function(event) {
    play();
  });

  function play() {
    k++;
    if (k > $(".case").length - 1) {
      k = 1;
      $(".box-in ul").css("left", 0);
    }
    $(".box-in ul").stop().animate({
      "left": -k * $(".box-in").width()
    }, 1000);
  }


  $(".left").click(function(event) {
    k--;
    if (k < 0) {
      k = $(".case").length - 2;
      $(".box-in ul").css("left", -($(".case").length - 1) * $(".box-in").width());
    }
    $(".box-in ul").stop().animate({
      "left": -k * $(".box-in").width()
    }, 1000);

  });
  var timer = setInterval(play, 2500);

  $(".box").click(function() {
    clearInterval(timer);
    timer = null
  });

})