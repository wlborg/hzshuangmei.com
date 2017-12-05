var e7 = {
    description: "单击左右切换2",
    rowWidth: 1200,
    speed: 500,
    contextWraper: "#slideContent",
    imgNum: 0,
    num: 0, //当前图片前面有几张图片
    getImgN: function(obj) {
        e7.imgN = $(obj).find("li").length;
        return e7.imgN;
    },
    init: function(contextWraper, wrapWraper) {
        e7.imgNum = e7.getImgN(contextWraper) - 1;
        var contextWraper = $(contextWraper);
        contextWraper.css('width', (e7.imgNum + 1) * 1200 + 'px');
    },
    prev: function(obj) {
        e7.num -= 1;
        //小于0说明在第一张图的位置，触发了右滑函数，而第一张图片左边没有图片
        if (e7.num < 0) {
            //回到容器最后一张，并右滑显示图片最后一张
            var length1 = -e7.rowWidth * (e7.imgNum);
            var length2 = -e7.rowWidth * (e7.imgNum - 1);
            $(obj).css({
                left: length1
            }).stop().animate({
                left: length2
            }, e7.speed);
            e7.num = e7.imgNum - 1;

        } else {
            //大于0,说明在非第一张图片的位置触发了右滑函数，
            var length = -e7.num * e7.rowWidth;
            $(obj).stop().animate({
                left: length
            }, e7.speed);
        }
        if (e7.num == e7.imgNum - 1) {
            $('#slideTab li').eq(e7.imgNum - 1).addClass('active').siblings().removeClass('active');
        } else {
            $('#slideTab li').eq(e7.num).addClass('active').siblings().removeClass('active');

        }

    },
    next: function(obj) {
        e7.num += 1;
        //大于图片总数说明在最后一张伪首张图的位置，触发了左滑函数，而伪首张图片右边没有图片
        if (e7.num > e7.imgNum) {
            //回到容器第一张，并左滑显示第二张图片
            var length = -e7.rowWidth;
            $(obj).css({
                left: 0
            }).stop().animate({
                left: length
            }, e7.speed);
            e7.num = 1;
        } else {
            //小于总数,说明在非伪首图的位置触发了左滑函数，
            var length = -e7.num * e7.rowWidth;
            $(obj).stop().animate({
                left: length
            }, e7.speed);
        }
        if (e7.num == e7.imgNum) {
            $('#slideTab li').eq(0).addClass('active').siblings().removeClass('active');
        } else {
            $('#slideTab li').eq(e7.num).addClass('active').siblings().removeClass('active');

        }

    },
    indexHover: function(obj, _this) {
        $(_this).addClass('active').siblings().removeClass('active');
        var i = $(_this).index();
        $(obj).stop().animate({
            left: -i * e7.rowWidth
        }, 500);
        e7.num = i;
    }
}

function hoverStop(intervalID) {
    clearInterval(intervalID);
}

function outStart(intervalIDStr) {
    var id = null;
    switch (intervalIDStr) {

        case 'timer':

            id = setInterval('e7.next("#slideContent")', 2000);
            return id;
        default:
            // statements_def
            break;
    }
}
$(function() {
    setTimeout("$(' .ban_piece3 ,.ban_piece4').addClass('show');", 500);
    e7.init('#slideContent', '.m5 .content');

    var timer = setInterval('e7.next("#slideContent")', 2000);
    $('#slideBox').mouseenter(function() {
        hoverStop(timer);
    }).mouseleave(function() {
        timer = outStart("timer");
    });

    $('#slideTab li').mouseover(function() {
        hoverStop(timer);
        e7.indexHover("#slideContent", this);
    }).mouseleave(function() {
        timer = outStart("timer");
    });

    $('.m7 .wrap').mouseover(function() {
        $(this).addClass('active').siblings().removeClass("active");
    });
})
