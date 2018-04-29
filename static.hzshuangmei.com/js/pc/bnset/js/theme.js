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
    this.effectType = options.effectType || 1;
    this.init();
}
XZSlide.prototype.init = function() {
    var self = this;
    switch (this.effectType) {
        case 1:
            init1(self);
            break;
        case 2:
            init2(self);
            break;
        default:
            // statements_def
            break;
    }

    function init2(self) {
        if (self.indicator) {
            self.indicator.find("li").mouseover(function(e) {
                var event = window.event || e;
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                self.slideCEle.find(".item").eq(index).addClass('active').siblings().removeClass("active");
            });
        }
    }

    function init1(self) {
        // this=self;
        if (self.slideCEle == null) return false;
        if (self.resp) {
            self.step = parseInt(self.slideWEle.css("width"));
        }
        self.slideCEle.css("position", "relative");
        if (self.itemCount == null) {
            self.itemCount = self.slideCEle.find(".item").length;
        }
        self.slideCEle.find(".item:first").clone().appendTo(self.slideCEle);
        self.slideCEle.css("width", (self.itemCount + 1) * self.step + "px");
        if (self.auto) {
            self.timer = setInterval($.proxy(self.next, self), self.interval);
            self.timerControl(self.slideWEle);
        }
        if (self.nextEle) {
            self.timerControl(self.nextEle);
            self.nextEle.click(function() {
                self.next();
            });
        }
        if (self.prevEle) {
            self.timerControl(self.prevEle);
            self.prevEle.click(function() {
                self.prev();
            });
        }
        if (self.indicator) {
            self.timerControl(self.indicator);
            self.indicator.find("li").click(function() {
                var index = $(this).index();
                // $(self).addClass("active").siblings().removeClass("active");
                self.next(index + 1); //传入参数为0的话，next函数接收的值为undefined,原因未知。
            });
        }
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
    var slide1 = new XZSlide({
        cover: $(".m2 .slideW"),
        container: $(".m2 .slideC"),
        itemCount: 3,
        itemWidth: 631,
        speed: 300,
        auto: true,
        nextBtn: $(".m2 .next"),
        prevBtn: $(".m2 .prev")
    });
    var slide2 = new XZSlide({
        cover: $(".m5 .slideW"),
        container: $(".m5 .slideC"),
        itemCount: 2,
        itemWidth: 755,
        speed: 300,
        auto: true,
        nextBtn: $(".m5 .next"),
        prevBtn: $(".m5 .prev")
    });
    var slide3 = new XZSlide({
        cover: $(".m6 .slideW"),
        container: $(".m6 .slideC"),
        itemCount: 3,
        itemWidth: 900,
        speed: 300,
        auto: true,
        indicator: $(".m6 .indicator")
    });
});