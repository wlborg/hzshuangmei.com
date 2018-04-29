var e2 = {
    description: "单击左右切换,连图",
    num: 0,
    count: 0,
    prev: function(obj) {
        $(obj).find(".slider").stop().animate({
            marginLeft: "-620px"
        }, 500, function() {
            $(this).css({
                marginLeft: "0px"
            }).find("img:first").appendTo(this);
        })
    },
    Slider: function(obj) {
        var itemsLi = $('.change li');
        for (i = 0; i < itemsLi.length; i++) {
            itemsLi[i].onmouseover = function() {
                var j = $(this).index();
                $('.slider_part8').stop().animate({
                    marginLeft: -394 * j + "px"
                }, 500)
                $(this).addClass('current').siblings().removeClass('current');
                this.style.cursor = 'pointer';

            }
        }

    },

}
$(function() {
    // var id = setInterval("e2.prev('.wrap');", 5000);
    e2.Slider();
    $('#face li').mouseover(function() {
        $(this).addClass('current').siblings().removeClass('current');
        this.style.cursor = 'pointer';
    });

})
