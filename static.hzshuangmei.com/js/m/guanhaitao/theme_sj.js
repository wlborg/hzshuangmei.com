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
XZSlide.prototype.next = function() {
    if (this.num > this.itemCount-1) {
        this.num = 0;
        this.slideCEle.find(".item").eq(this.num).addClass('active').siblings().removeClass('active');
    } else {
       this.slideCEle.find(".item").eq(this.num).addClass('active').siblings().removeClass('active');
    }
    this.num += 1
};
XZSlide.prototype.prev = function() {
    if (this.num < 0) {
        this.slideCEle.find(".item").eq(this.num).addClass('active').siblings().removeClass('active');
        this.num = this.itemCount - 1;
    } else {
        this.slideCEle.find(".item").eq(this.num).addClass('active').siblings().removeClass('active');
    }
    this.num -= 1;
};
$(function() {
    var slide1 = new XZSlide({
        cover: $(".m6 .slideW"),
        container: $(".m6 .slideC"),
        itemCount: 3,
        // itemWidth: 631,
        speed: 300,
        auto: true,
        resp:true,
        nextBtn: $(".m6 .next"),
        prevBtn: $(".m6 .prev")
    });
    $(".m2 .indicator li").hover(function (e) {
        var index= $(this).index();
        var temp=index+1;
          $(this).addClass("active").siblings().removeClass("active");
          $(this).parent().removeClass("indicator1 indicator2 indicator3").addClass("indicator"+temp);
        $('.m2 .tabs .item').eq(index).addClass('active').siblings().removeClass('active');
    })
});