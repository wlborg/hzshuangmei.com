var e2 = {
    description: "单击左右切换,连图",
    num: 0,
    prev: function(obj) {
        this.num++;
        $(obj).find(".slider").stop().animate({
            marginLeft: -930 * this.num + "px"
        }, 500, function() {

            if (e2.num >= 1) {
                $(this).css({
                    marginLeft: "0px"
                }).find("img:first").appendTo(this);
                e2.num = 0;
            }

        })

    },
    next: function(obj) {
        this.num--;
        if (this.num < 0) {
            $(obj).find(".slider").find("img:last").prependTo($(obj).find(".slider"));
            $(obj).find(".slider").css({
                marginLeft: "-930px"
            });
            this.num = 0;
        }

        if (this.num >= 0) {
            $(obj).find(".slider").stop().animate({
                marginLeft: -930 * this.num + "px"
            }, 500)
        }
    },
    Imgchange_left: function(obj) {
        $('.left .change').mouseover(function() {
            $('.left .change2').css('display', 'block');
            $('.left .change1').css('display', 'none');
        })
        $('.left .change').mouseout(function() {
            $('.left .change2').css('display', 'none');
            $('.left .change1').css('display', 'block');
        })
    },
    Imgchange_Right: function(obj) {
        $('.right .change').mouseover(function() {
            $('.right .change2').css('display', 'block');
            $('.right .change1').css('display', 'none');
        })
        $('.right .change').mouseout(function() {
            $('.right .change2').css('display', 'none');
            $('.right .change1').css('display', 'block');
        })
    }
}

$(function() {
    var id2 = setInterval("e2.prev('.imgwrap');", 3000);
    $('.wrap').mouseover(function() {
        clearInterval(id2);
        this.style.cursor = 'pointer';
    });
    $('.wrap').mouseout(function() {
        id2 = setInterval("e2.prev('.imgwrap');", 3000);
    });

    $('.prev').click(function() {
        e2.prev('.imgwrap');
    })
    $('.next').click(function() {
        e2.next('.imgwrap');
    })
    $('.change').mouseover(function() {
        this.style.cursor = 'pointer';
    })
    e2.Imgchange_left();
    e2.Imgchange_Right();
});
