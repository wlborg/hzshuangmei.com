$(function  () {
	var targets=$('.zt-m3 .slide-container li');
	var count=targets.length;
	var num=$('.zt-m3 .slide-container li.active').index();
	var leftBtnController= $('.zt-m3 .prev');
	var rightBtnController= $('.zt-m3 .next');
	
    leftBtnController.click(function  (e) {
       if(num==0){
         targets.eq(count-1).removeClass('left');
         targets.eq(num).removeClass('active').addClass('left');
         targets.eq(num+1).removeClass('right').addClass('active');
         targets.eq(num+2).addClass('right');
         num=num+1;
         return;
       }
       if(num>0&&num+2<count){

         targets.eq(num-1).removeClass('left');
         targets.eq(num).removeClass('active').addClass('left');
         targets.eq(num+1).removeClass('right').addClass('active');
         targets.eq(num+2).addClass('right');
         num=num+1;
         return;
       }
       if(num+2==count){
       	 targets.eq(num-1).removeClass('left');
         targets.eq(num).removeClass('active').addClass('left');
         targets.eq(num+1).removeClass('right').addClass('active');
         targets.eq(0).addClass('right');
         num=num+1;
          return;
       }
       if (num+2>count) {
         targets.eq(num-1).removeClass('left');
         targets.eq(num).removeClass('active').addClass('left');
         targets.eq(0).removeClass('right').addClass('active');
         targets.eq(1).addClass('right');
         num=0;
          return;
       }   
    });

    rightBtnController.click(function  (e) {
       if(num==0){
         
         targets.eq(count-2).addClass('left');
         targets.eq(count-1).removeClass('left').addClass('active');
         targets.eq(num).removeClass('active').addClass('right');
         targets.eq(num+1).removeClass('right');
         num=count-1;
         return;
       }
       if(num>0&&num+2<count){

         targets.eq(num-2).addClass('left');
         targets.eq(num-1).removeClass('left').addClass('active');
         targets.eq(num).removeClass('active').addClass('right');
         targets.eq(num+1).removeClass('right');
         
         num=num-1;
         return;
       }
       if(num+2==count){

       	 targets.eq(num-2).addClass('left');
       	 targets.eq(num-1).removeClass('left').addClass('active');
         targets.eq(num).removeClass('active').addClass('right');
         targets.eq(num+1).removeClass('right');
        
         num=num-1;
          return;
       }
       if (num+2>count) {
         targets.eq(num-2).addClass('left');
         targets.eq(num-1).removeClass('left').addClass('active');
         targets.eq(num).removeClass('active').addClass('right');
         targets.eq(0).removeClass('right');
         
         num=num-1;
          return;
       }   
    });

})

function XZSlide(options) {
    if (typeof options !== 'object') return false;
    this.speed = options.speed || 500;
    this.interval = options.interval || 3000;
    this.step = options.itemWidth || 0;
    this.slideWEle = options.cover || null;
    this.slideCEle = options.container || null;
    this.itemCount = options.itemCount || null;
    this.num = 0;
    this.nextEle = options.nextBtn || null;
    this.prevEle = options.prevBtn || null;
    this.indicator = options.indicator || null;
    this.auto = options.auto || false;
    this.resp = options.resp || false;
    this.timer = 0;
    this.init();
}
XZSlide.prototype.init = function() {
    var self = this;
    if (this.slideCEle == null) return false;
    if (this.resp) {
        this.step = parseInt(this.slideWEle.css("width"));
    }
    this.slideCEle.css("position", "relative");
    if (this.itemCount == null) {
        this.itemCount = this.slideCEle.find(".slide-item").length;
    }
    this.slideCEle.find(".slide-item:first").clone().appendTo(this.slideCEle);
    this.slideCEle.css("width", (this.itemCount + 1) * this.step + "px");
    if (this.auto) {
        this.timer = setInterval($.proxy(this.next, this), this.interval);
        this.timerControl(this.slideWEle);
    }
    if (this.nextEle) {
        this.timerControl(this.nextEle);
        this.nextEle.click(function() {
            self.next();
        });
    }
    if (this.prevEle) {
        this.timerControl(this.prevEle);
        this.prevEle.click(function() {
            self.prev();
        });
    }
    if (this.indicator) {
        this.timerControl(this.indicator);
        this.indicator.find("li").click(function() {
            var index = $(this).index();
            // $(this).addClass("active").siblings().removeClass("active");
            self.next(index + 1); //传入参数为0的话，next函数接收的值为undefined,原因未知。
        });
    }
};
XZSlide.prototype.timerControl = function(ele) {
    var self = this;
    ele.mouseover(function(e) {
        var event = window.event || e;
        event.stopPropagation();
        clearTimeout(self.timer);
    }).mouseout(function(e) {
        var event = window.event || e;
        event.stopPropagation();
        self.timer = setInterval($.proxy(self.next, self), self.interval);
    });
};
XZSlide.prototype.next = function(number) {
    //indicator支持
    if (number) {
        this.num = number - 1;
    } else {
        this.num += 1;
    }
    if (this.num > this.itemCount) {
        var length = -this.step;
        this.slideCEle.css({
            left: 0
        }).stop().animate({
            left: length
        }, this.speed);
        this.num = 1;
    } else {
        var length = -this.num * this.step;
        this.slideCEle.stop().animate({
            left: length
        }, this.speed);
    }
    //indicator支持
    if (this.indicator) {
        this.indi();
    }
};
XZSlide.prototype.prev = function() {
    this.num -= 1;
    if (this.num < 0) {
        var length1 = -this.step * (this.itemCount);
        var length2 = -this.step * (this.itemCount - 1);
        this.slideCEle.css({
            left: length1
        }).stop().animate({
            left: length2
        }, this.speed);
        this.num = this.itemCount - 1;
    } else {
        var length = -this.num * this.step;
        this.slideCEle.stop().animate({
            left: length
        }, this.speed);
    }
    //indicator支持
    if (this.indicator) {
        this.indi();
    }
};
XZSlide.prototype.indi = function() {
    if (this.num > this.itemCount - 1) {
        this.indicator.find("li").eq(0).addClass("active").siblings().removeClass("active");
    } else {
        this.indicator.find("li").eq(this.num).addClass("active").siblings().removeClass("active");
    }
}
$(function() {
    // var slide1 = new XZSlide({
    //     cover: $(".m1 .slideW"),
    //     container: $(".m1 .slideC"),
    //     itemCount: 3,
    //     itemWidth: 950,
    //     speed: 300,
    //     auto: true,
    //     nextBtn: $(".m1 .next"),
    //     prevBtn: $(".m1 .prev")
    // });
    var slide1 = new XZSlide({
        cover: $(".zt-m4 .slide-wrapper"),
        container: $(".zt-m4 .slide-container"),
        itemCount: 3,
        itemWidth: 1195,
        speed:300,
        interval:5000,
        auto: true,
        indicator: $(".zt-m4 .slide-indecator")
    });
    var slide2 = new XZSlide({
        cover: $(".zt-m6 .slide-wrapper"),
        container: $(".zt-m6 .slide-container"),
        itemCount: 4,
        itemWidth: 1218,
        speed: 300,
        auto: true,
        nextBtn: $(".zt-m6 .slide-wrapper .prev"),
        prevBtn: $(".zt-m6 .slide-wrapper .next")
    });
});