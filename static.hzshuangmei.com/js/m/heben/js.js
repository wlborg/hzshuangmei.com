var e2 = {
    description: "单击左右切换,连图",
    num: 0,
    count: 0,
    Width:0,
    prev: function(obj) {
        e2.Width = $('.box').width();
        var itemsLi = $('.list li');
        this.num++;
        var _text = itemsLi[this.num];
        if (this.num === 5) {
            _text = itemsLi[0];
        }
        var s = $(_text).siblings();
        if (_text.className === "dark") {
            _text.className = "";
        }
        for (j = 0; j < s.length; j++) {
            s[j].className = "dark";
        }
        $(obj).find(".slider").stop().animate({
            marginLeft: -e2.Width * this.num + "px"
        }, 500, function() {
            if (e2.num >= 5) {
                $(this).css({
                    marginLeft: "0px"
                });
                e2.num = 0;
            }
        })

    },
    next: function(obj) {
        e2.Width = $('.box').width();
        var itemsLi = $('.list li');
        this.num--;

        if (this.num < 0) {
            $(obj).find(".slider").find("box:last").prependTo($(obj).find("slider"));
            $(obj).find(".slider").css({
                marginLeft: "e2.Width"
            });
            this.num = 4;
        }

        if (this.num >= 0) {
            var _text = itemsLi[this.num];
            if (this.num === 5) {
                _text = itemsLi[0];
            }
            var s = $(_text).siblings();
            if (_text.className === "dark") {
                _text.className = "";
            }
            for (j = 0; j < s.length; j++) {
                s[j].className = "dark";
            }
            $(obj).find(".slider").stop().animate({
                marginLeft: -e2.Width * this.num + "px"
            }, 500)
        }
    },
    Slider: function(obj) {
        e2.Width = $('.box').width();
        var itemsLi = $('.list li');
        for (i = 0; i < itemsLi.length; i++) {
            itemsLi[i].onmouseover = function() {
                var j = $(this).index();
                $('.slider').stop().animate({
                    marginLeft: -e2.Width * j + "px"
                }, 500)
                var _this = this;
                var test = $(_this).siblings();
                if (_this.className === "dark") {
                    _this.className = "";
                }
                for (j = 0; j < test.length; j++) {
                    test[j].className = "dark";
                }

            }
        }
        $('.prev').click(function() {
            e2.prev('.wrap');
        });
        $('.prev').mouseover(function() {
            this.style.cursor = 'pointer';
        })
        $('.next').click(function() {
            e2.next('.wrap');
        })
    },
}
$(function() {
    var id = setInterval("e2.prev('.wrap');", 5000);
    // e2.show();
    e2.Slider();

    $('.part6 .main').mouseover(function() {
        clearInterval(id);
        this.style.cursor = 'pointer';
    });
    $('.part6 .main').mouseout(function() {
        id = setInterval("e2.prev('.wrap')", 5000);
    });
})
