var e2 = {
    description: "单击左右切换,连图",
    num: 0,
    count: 0,
    prev: function(obj) {
        e2.Width = $('.wrap .box').width();
        var itemsLi = $('.examp li');
        this.num++;
        console.log(this.num);
        var _text = itemsLi[this.num];
        if (this.num === 2) {
            _text = itemsLi[0];
        }
        console.log(_text);
        var s = $(_text).siblings();
        if (_text.className === "on") {
            _text.className = "";
        }
        for (j = 0; j < s.length; j++) {
            s[j].className = "on";
        }



        //内容切换
        $(obj).find(".slider").stop().animate({
            marginLeft: -e2.Width * this.num + "px"
        }, 500, function() {
            if (e2.num >= 2) {
                $(this).css({
                    marginLeft: "0px"
                });
                e2.num = 0;
            }
        })

    }
}
$(function() {
    var id = setInterval("e2.prev('.wrap');", 5000);
    // e2.show();

    $('.part5 .main').mouseover(function() {
        clearInterval(id);
        this.style.cursor = 'pointer';
    });
    $('.part5 .main').mouseout(function() {
        id = setInterval("e2.prev('.wrap')", 5000);
    });
})
