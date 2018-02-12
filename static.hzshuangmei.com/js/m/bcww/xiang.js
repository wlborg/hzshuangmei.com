$(function(){
  $(window).scroll(function(){
     var runtwo = $(window).scrollTop();
          if(runtwo>100)
          {
              $("p.pone").addClass("fadeInLeft")    
          }
          if(runtwo>110)
          {
              $("p.ptwo").addClass("fadeInLeft")    
          }
          if(runtwo>200)
          {
              $(".xtwo-box img").addClass("fadeInDown")    
          }
          if(runtwo>400)
          {
              $(".xthree-box ul li:first-child").addClass("fadeInUp")    
              $(".xthree-box ul li:nth-child(2)").addClass("fadeInUp2")    
              $(".xthree-box ul li:nth-child(3)").addClass("fadeInUp3")    
              $(".xthree-box ul li:nth-child(4)").addClass("fadeInUp4")    
          }
          if(runtwo>1000)
          {
              $(".xfour-box .yuanliArc").addClass("fadeInDown")    
          }
          if(runtwo>1400)
          {
              $(".dongone").addClass("fadeInDown")    
          }
          if(runtwo>1800)
          {
              $(".xsix-box .yuanliArc").addClass("fadeInDown")    
          }
          if(runtwo>2200)
          {
              $(".xfive-box .arcdong").addClass("fadeInDown")    
          }
  })
})
