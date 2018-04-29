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
}

function debounce(fn, delay) {
    var timer = null;
    return function() {
        var that = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(
            function() {
                fn.apply(that, arguments);
            }, delay)
    }
}

function ScrollToDo() {
    this.targets = [];
    this.scrollH = 0;
    this.viewportH = $(window).height();
    this.init();
}
ScrollToDo.prototype.add = function(classname, fn) {
    var el = $(classname).eq(0);
    if (!el) return;
    var offset = el.offset().top;
    var height=el.height();
    var target = { 'offset': offset,"height":height, "fn": fn ,"state":0};
    // console.log(height);
    this.targets.push(target);
    // console.log(this.targets);
}
ScrollToDo.prototype.init = function() {
    var self = this;
    this.scrollH = $(document).scrollTop();
    $(window).scroll(function(){debounce(self.do(self), 200)});
}

ScrollToDo.prototype.do = function(self) {
    var scrollH=self.scrollH = $(document).scrollTop();
    var targets = self.targets;
    if (targets.length) {
        targets.forEach(function(el, i, a) {
            if (scrollH > el.offset-el.height && scrollH < el.offset + self.viewportH) {
                if(el.state==0){
                    (el.fn)();
                    el.state=1;
                }
            }
            else{
                el.state=0;
                // console.log(el.state);
            }
        });
    }
}
$(function() {

    var slide1 = new XZSlide({
        cover: $(".zt-m1 .sliderWrapper"),
        container: $(".zt-m1 .slideContainer"),
        itemCount: 3,
        itemWidth: 1108,
        speed: 300,
        auto: true,
        indicator: $(".zt-m1 .indicators")
    });

    var scrolldo = new ScrollToDo();
    scrolldo.add("#video1", function() {
        var video=$("#video1")[0];
        video.setAttribute("currentTime","0");
        video.play();
    });
    scrolldo.add("#video2", function() {
        var video=$("#video2")[0];
        video.setAttribute("currentTime","0");
        video.play();
    });
});

