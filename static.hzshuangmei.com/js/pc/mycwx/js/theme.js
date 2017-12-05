function XZSlide(options) {
    if (typeof options !== 'object') return false;
    this.speed = options.speed || 300;
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
    if (this.imgCount == null) {
        this.imgCount = this.slideCEle.find("li").length;
    }
    this.slideCEle.find("li").eq(2).clone().appendTo(this.slideCEle);
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
    var self = this;
    this.slideCEle.stop().animate({
            left: -this.step
        },
        this.speed,
        function() {
            self.slideCEle.css({
                left: "0px"
            }).find("li:first").appendTo(self.slideCEle);
        });
};
XZSlide.prototype.prev = function() {
    var self = this;
    this.slideCEle.stop().animate({
            left: this.step
        },
        this.speed,
        function() {
            self.slideCEle.css({
                left: "0px"
            }).find("li:last").prependTo(self.slideCEle);
        });
};
$(function() {
    var slide1 = new XZSlide({
        cover: $(".m1_2 .row2"),
        container: $(".m1_2 .slideC"),
        imgCount: 5,
        itemWidth: 400,
        auto: true
    });
    $(".m2 .row2 .item").hover(
        function  () {
            var index=$(this).index();
            $(this).addClass("active").siblings().removeClass("active");
            $(".m2 .row1 .item").eq(index).addClass("active").siblings().removeClass("active");
        }
    )
    $(".m3 li").hover(
        function  () {
            $(this).addClass("active").siblings().removeClass("active");
        }
    )
});