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
    this.figure = options.figure || false;
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
    this.slideCEle.css("width", (this.itemCount + 1) * this.step + 10 + "px");
    if (this.auto) {
        this.timer = setInterval($.proxy(this.prev, this), this.interval);
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
            self.prev(index + 1); //传入参数为0的话，next函数接收的值为undefined,原因未知。
        });
    }
    if (this.figure) {
        this.orient();
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
        self.timer = setInterval($.proxy(self.prev, self), self.interval);
    });
};
XZSlide.prototype.prev = function(number) {
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
XZSlide.prototype.next = function() {
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
};
XZSlide.prototype.orient = function() {
    var startX;
    var startY;
    var self = this;
    this.slideWEle.on("touchstart", function(e) {
        clearTimeout(self.timer);
        startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    this.slideWEle.on("touchend", function(e) {
        var moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        //左滑
        if (X > 0 && Math.abs(X)>Math.abs(Y)) {
            self.next();
        }
        //右滑
        else if (X < 0 && Math.abs(X)>Math.abs(Y)) {
            self.prev();
        }
         self.timer = setInterval($.proxy(self.prev, self), self.interval);
    });
}

$(function() {
    var slide1 = new XZSlide({
        cover: $(".zt-m1 .sliderWrapper"),
        container: $(".zt-m1 .slideContainer"),
        itemCount: 3,
        itemWidth: 1108,
        speed: 300,
        auto: true,
        resp: true,
        figure: true,
        indicator: $(".zt-m1 .indicators")
    });
       var video1=$("#video1");
       var jsVideo1=video1[0];
       video.click(function(event) {
            jsVideo1.setAttribute("currentTime","0");
            jsVideo1.play();
       });

        var video2=$("#video2");
       var jsVideo2=video2[0];
       video.click(function(event) {
            jsVideo2.setAttribute("currentTime","0");
            jsVideo2.play();
       });
});