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
    this.slideCEle.css("position", "absolute");
    if (this.itemCount == null) {
        this.itemCount = this.slideCEle.find(".slider-item").length;
    }
    this.slideCEle.find(".slider-item:first").clone().appendTo(this.slideCEle);
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
            self.prev(index + 1);
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
        if (X > 0 && Math.abs(X) > Math.abs(Y)) {
            self.next();
        }
        //右滑
        else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
            self.prev();
        }
        self.timer = setInterval($.proxy(self.prev, self), self.interval);
    });
}
var XZmarquee = function(options) {
    if (typeof options != "object") return false;
    this.targetEle = options.target || null;
    this.targetLength = options.length || null;
    this.hoverStop = options.hoverStop || true;
    this.stepVal = 0;
    this.timer = 0;
    this.hasRAF = false;
    this.init();
}
XZmarquee.prototype.init = function() {
    var self = this;
    var targetChild = this.targetEle.html();
    this.targetEle.append(targetChild);


    if (window.requestAnimationFrame) this.hasRAF = true;
    if (this.hoverStop && this.hasRAF) {
        this.targetEle.mouseover(function() {
            window.cancelAnimationFrame(self.timer);
        }).mouseout(
            function() {
                self.timer = window.requestAnimationFrame($.proxy(self.run, self));
            }
        );
    } else if (this.hoverStop && !this.hasRAF) {
        this.targetEle.mouseover(function() {
            window.clearInterval(self.timer);
        }).mouseout(
            function() {
                self.timer = window.setTimeout($.proxy(self.run, self), 16);
            }
        );
    }

    this.run();
}
XZmarquee.prototype.run = function() {
    var self = this;
    if (this.stepVal < this.targetLength) {
        this.targetEle.css('left', -this.stepVal + 'px');
        this.stepVal += 1;
    } else {
        this.stepVal = 0;
        this.targetEle.css('left', this.stepVal + 'px');
    }
    if (this.hasRAF) {
       this.timer = window.requestAnimationFrame($.proxy(self.run, self));
    } else {
        this.timer = window.setTimeout($.proxy(self.run, self), 16);

    }
}

$(function() {
    var slide1 = new XZSlide({
        cover: $(".zt-m2 .slider-wrapper"),
        container: $(".zt-m2 .slider-container"),
        itemCount: 3,
        itemWidth: 1200,
        speed: 10,
        auto: true,
        indicator: $(".zt-m2 .indicators")
    });

    var marquee1 = new XZmarquee({
        target: $(".zt-m5 .slider-container"),
        length: 3942
    });
});