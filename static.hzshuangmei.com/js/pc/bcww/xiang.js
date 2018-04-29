$(function(){
  $(window).scroll(function(){
     var runtwo = $(window).scrollTop();
          if(runtwo>400)
          {
              $(".main1-content p").addClass("fadeIn")    
          }
          if(runtwo>1500)
          {
              $(".main2-in h3").addClass("pulse")    
          }
          if(runtwo>2200)
          {
              $(".main3-in h3").addClass("pulse")    
          }
         if(runtwo>2300)
          {
              $(".main3-one .yuanli").addClass("fadeInUp")    
              $(".main3-one .yuanli-arc").addClass("fadeInDown")    
          }
         if(runtwo>3000)
          {
              $(".main3-two .yuanli").addClass("fadeInUp")    
              $(".main3-two .yuanli-arc").addClass("fadeInDown")    
          }
         if(runtwo>3500)
          {
              $(".main4-one .yuanli").addClass("fadeInUp")    
              $(".main4-one .yuanli-arc").addClass("fadeInDown")    
          }
         if(runtwo>3600)
          {
              $(".main4-two .yuanli").addClass("fadeInUp")    
              $(".main4-two .yuanli-arc").addClass("fadeInDown")    
          }
          if(runtwo>4300)
          {
              $(".main-five h3").addClass("pulse")    
          }
          if(runtwo>5500)
          {
              $(".main-six h3").addClass("pulse")    
          }
  })
   $(".mian6-content").hover(function(){
    $(".zxzj em strong").addClass("flash")
   },function(){
    $(".zxzj em strong").removeClass("flash")
   })
   $(".main3-two, .main4-two").hover(function(){
    $(".zixun a span").addClass("flash")
   },function(){
    $(".zixun a span").removeClass("flash")
   })
   $(".determined").mouseenter(function(){
    $(".determined").addClass("slideOutDown")
   })
})
