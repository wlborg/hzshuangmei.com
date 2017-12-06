function XZSlide(options) {
    if (typeof options !== 'object') return false;
    this.speed = options.speed || 500;
    this.interval = options.interval || 3000;
    this.step = options.itemWidth || 0;
    this.slideWEle = options.cover || null;
    this.slideCEle = options.container || null;
    this.imgCount = options.imgCount || null;
    this.num = 0;
    this.nextEle = options.nextBtn || null;
    this.prevEle = options.prevBtn || null;
    this.auto = options.auto || false;
    this.timer = 0;
    this.init();
}
XZSlide.prototype.init = function() {
    var self = this;
    if (this.slideCEle == null) return false;
    this.slideCEle.css("position", "relative");
    if (this.imgCount == null) {
        this.imgCount = this.slideCEle.find("li").length;
    }
    this.slideCEle.find("li:first").clone().appendTo(this.slideCEle);
    this.slideCEle.css("width", (this.imgCount + 1) * this.step + "px");
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
};
XZSlide.prototype.timerControl = function(ele) {
    var self = this;
    ele.mouseenter(function() {
        clearTimeout(self.timer);
    }).mouseleave(function() {
        self.timer = setInterval($.proxy(self.next, self), self.interval);
    });
};
XZSlide.prototype.next = function() {
    this.num += 1;
    if (this.num > this.imgCount) {
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
};
XZSlide.prototype.prev = function() {
    this.num -= 1;
    if (this.num < 0) {
        var length1 = -this.step * (this.imgCount);
        var length2 = -this.step * (this.imgCount - 1);
        this.slideCEle.css({
            left: length1
        }).stop().animate({
            left: length2
        }, this.speed);
        this.num = this.imgCount - 1;
    } else {
        var length = -this.num * this.step;
        this.slideCEle.stop().animate({
            left: length
        }, this.speed);
    }
};
$(function() {
    var slide1=new XZSlide({
        cover: $(".m2 .slideW"),
        container: $(".m2 .slideC"),
        imgCount: 4,
        itemWidth: 1059,
        auto: true,
        nextBtn: $(".m2 .next"),
        prevBtn: $(".m2 .prev")
    });
    var slide2=new XZSlide({
        cover: $(".m4 .slideW"),
        container: $(".m4 .slideC"),
        imgCount: 3,
        itemWidth: 1186,
        auto: true
    });
});