$(function() {

    var ele = $(".m3 .box");
    var count=0;
    function next() {
        count+=1;
        if(count<5){
            ele.find(".item.active").removeClass('active');
            ele.find(".item").eq(count).addClass('active');
        }else{
            count=0;
             ele.find(".item.active").removeClass('active');
            ele.find(".item").eq(count).addClass('active');
        }
      
    }
     function prev() {
        if(count>=0){
            ele.find(".item.active").removeClass('active');
            ele.find(".item").eq(count).addClass('active');
        }else{
            count=4;
             ele.find(".item.active").removeClass('active');
            ele.find(".item").eq(count).addClass('active');
        }
        count-=1;
      
    }
    var timer = setInterval(next, 2000);
    ele.bind("mouseover", function() {
        clearInterval(timer);
    });
    ele.bind("mouseleave", function() {
        timer = setInterval(next, 2000);
    });
    ele.find(".next").bind("click",function  () {
        next();
    });
     ele.find(".prev").bind("click",function  () {
        prev();
    });

});
