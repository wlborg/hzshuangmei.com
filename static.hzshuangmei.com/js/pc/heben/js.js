var e2 = {
    description: "单击左右切换,连图",
    num: 0,
    count: 0,
    prev: function(obj) {
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
            marginLeft: -936 * this.num + "px"
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
        var itemsLi = $('.list li');
        this.num--;

        if (this.num < 0) {
            $(obj).find(".slider").find("box:last").prependTo($(obj).find("slider"));
            $(obj).find(".slider").css({
                marginLeft: "-936px"
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
                marginLeft: -936 * this.num + "px"
            }, 500)
        }
    },
    Slider: function(obj) {
        var itemsLi = $('.list li');
        for (i = 0; i < itemsLi.length; i++) {
            itemsLi[i].onmouseover = function() {
                var j = $(this).index();
                $('.slider').stop().animate({
                    marginLeft: -936 * j + "px"
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
            this.style.cursor = 'pointer';
        })
    },
    // show: function() {
    //     for (i = 0; i < 10; i++) {
    //         var items = new Array();
    //         itemsP = new Array();
    //         itemsImg = new Array();
    //         items[i] = $('.part2_contain ul').children("li").eq(i);
    //         var _items = items[i];
    //         itemsP[i] = _items.children().eq(0);
    //         itemsImg[i] = _items.children().eq(1);console.log(itemsImg[9]);
    //         // itemsImg[9].hover (function() {
    //         //     this.css("display", "none");
    //         //     this.style.cursor = 'pointer';
    //         // })
    //     }
    // },
}
$(function() {
    // var id = setInterval("e2.prev('.wrap');", 5000);
    // e2.show();
    e2.Slider();

    // $('.part6 .main').mouseover(function() {
    //     clearInterval(id);
    //     this.style.cursor = 'pointer';
    // });
    // $('.part6 .main').mouseout(function() {
    //     id = setInterval("e2.prev('.wrap')", 5000);
    // });
})
