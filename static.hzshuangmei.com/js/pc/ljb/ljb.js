(function () {
    var $a = $(".buttons1 a");
    var $s = $(".buttons1 span");
    var cArr = ["p6", "p5", "p4", "p3", "p2", "p1"];
    var index = 0;
    $(".next1").click(
        function () {
            nextimg();
        }
    )
    $(".prev1").click(
        function () {
            previmg();
        }
    )

    //上一张
    function previmg() {
        cArr.unshift(cArr[5]);
        cArr.pop();
        //i是元素的索引，从0开始
        //e为当前处理的元素
        //each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
        $(".box1 li").each(function (i, e) {
            $(e).removeClass().addClass(cArr[i]);
        })
        index--;
        if (index < 0) {
            index = 5;
        }
        show();
    }

    //下一张
    function nextimg() {
        cArr.push(cArr[0]);
        cArr.shift();
        $(".box1 li").each(function (i, e) {
            $(e).removeClass().addClass(cArr[i]);
        })
        index++;
        if (index > 5) {
            index = 0;
        }
        show();
    }

    //通过底下按钮点击切换
    $a.each(function () {
        $(this).click(function () {
            var myindex = $(this).index();
            var b = myindex - index;
            if (b == 0) {
                return;
            }
            else if (b > 0) {
                /*
                 * splice(0,b)的意思是从索引0开始,取出数量为b的数组
                 * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
                 * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
                 * 这时候原本的数组也将这部分数组进行移除了
                 * 再把移除的数组添加的原本的数组的后面
                 */
                var newarr = cArr.splice(0, b);
                cArr = $.merge(cArr, newarr);
                $(".box1 li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                })
                index = myindex;
                show();
            }
            else if (b < 0) {
                /*
                 * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
                 * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
                 * 也就是从原本的照片到需要点击的照片的数组
                 * 然后将原本的数组跟取出的数组进行拼接
                 * 再次倒序,使原本的倒序变为正序
                 */
                cArr.reverse();
                var oldarr = cArr.splice(0, -b);
                cArr = $.merge(cArr, oldarr);
                cArr.reverse();
                $(".box1 li").each(function (i, e) {
                    $(e).removeClass().addClass(cArr[i]);
                });
                index = myindex;
                show();
            }
        })
    });

    //改变底下按钮的长度
    function show() {
        $($s).eq(index).addClass("chang").parent().siblings().children().removeClass("chang");
    }


    //			鼠标移入box时清除定时器
    $(".box1").mouseover(function () {
        clearInterval(timer1);
    })

    //			鼠标移出box时开始定时器
    $(".box1").mouseleave(function () {
        timer1 = setInterval(nextimg, 2000);
    });

    //			进入页面自动开始定时器
    timer1 = setInterval(nextimg, 2000);
})();



var $a1 = $(".buttons2 a");
//    var $s1 = $(".buttons2 span");
var cArr1 = [ "p5", "p4", "p3", "p2", "p1"];
var index1 = 0;
$(".next2").click(
    function () {
        nextimg1();
    }
)
$(".prev2").click(
    function () {
        previmg1();
    }
)

//上一张
function previmg1() {
    cArr1.unshift(cArr1[4]);
    cArr1.pop();
    //i是元素的索引，从0开始
    //e为当前处理的元素
    //each循环，当前处理的元素移除所有的class，然后添加数组索引i的class
    $(".box2 li").each(function (i, e) {
        $(e).removeClass().addClass(cArr1[i]);
    })
    index1--;
    if (index1 < 0) {
        index1 = 4;
    }

}

//下一张
function nextimg1() {
    cArr1.push(cArr1[0]);
    cArr1.shift();
    $(".box2 li").each(function (i, e) {
        $(e).removeClass().addClass(cArr1[i]);
    })
    index1++;
    if (index1 > 4) {
        index1 = 0;
    }

}

//通过底下按钮点击切换
$a1.each(function () {
    $(this).click(function () {
        var myindex1 = $(this).index();
        var b1 = myindex1 - index1;
        if (b1 == 0) {
            return;
        }
        else if (b1> 0) {
            /*
             * splice(0,b)的意思是从索引0开始,取出数量为b的数组
             * 因为每次点击之后数组都被改变了,所以当前显示的这个照片的索引才是0
             * 所以取出从索引0到b的数组,就是从原本的这个照片到需要点击的照片的数组
             * 这时候原本的数组也将这部分数组进行移除了
             * 再把移除的数组添加的原本的数组的后面
             */
            var newarr1 = cArr1.splice(0, b);
            cArr1 = $.merge(cArr1, newarr1);
            $(".box2 li").each(function (i, e) {
                $(e).removeClass().addClass(cArr1[i]);
            })
            index1 = myindex1;

        }
        else if (b < 0) {
            /*
             * 因为b<0,所以取数组的时候是倒序来取的,也就是说我们可以先把数组的顺序颠倒一下
             * 而b现在是负值,所以取出索引0到-b即为需要取出的数组
             * 也就是从原本的照片到需要点击的照片的数组
             * 然后将原本的数组跟取出的数组进行拼接
             * 再次倒序,使原本的倒序变为正序
             */
            cArr1.reverse();
            var oldarr1 = cArr1.splice(0, -b);
            cArr1 = $.merge(cArr1, oldarr1);
            cArr1.reverse();
            $(".box2 li").each(function (i, e) {
                $(e).removeClass().addClass(cArr1[i]);
            });
            index1 = myindex1;

        }
    })
});

//改变底下按钮的长度
//    function show() {
//        $($s1).eq(index1).addClass("chang").parent().siblings().children().removeClass("chang");
//    }

//点击class为p2的元素触发上一张照片的函数
$(document).on("click", ".p2", function () {
    previmg1();
    return false;//返回一个false值，让a标签不跳转
});

//点击class为p4的元素触发下一张照片的函数
$(document).on("click", ".p4", function () {
    nextimg1();
    return false;
});

//			鼠标移入box时清除定时器
$(".box2").mouseover(function () {
    clearInterval(timer2);
});

//			鼠标移出box时开始定时
$(".box2").mouseleave(function () {
    timer2 = setInterval(nextimg1, 2000);
});

//			进入页面自动开始定时器
timer2 = setInterval(nextimg1, 2000);
$('.t5hove').hover(function () {
    $(this).css({
        'color': 'white',
        'background-color': '#e8984c'
    });
    $(this).siblings('.t5hove').css(
        {
            'background-color': 'white',
            'color': 'black'
        }
    )
});
$('.face').hover(function () {
    $('.t51').css('display','block') ;
    $('.quyu1').css('display','block');
    $('.quyu2').css('display', 'none');
    $('.t52').css('display', 'none');
});
$('.ruf').hover(function () {
    $('.t52').css('display','block') ;
    $('.quyu2').css('display','block');
    $('.quyu1').css('display', 'none');
    $('.t51').css('display', 'none');
});
$('.xgpage').hover(function () {
    $(this).css({
        'background-color': '#4f3077'

    });
    $(this).siblings('.xgpage').css(
        {
            'background-color': '#cccccc'
        }
    )
})
$('.xgpage1').hover(
    function () {
        $('.xgpage_img1').css('display','block') ;
        $('.xgpage_img2').css('display','none');
    }
)
$('.xgpage2').hover(
    function () {
        $('.xgpage_img2').css('display','block') ;
        $('.xgpage_img1').css('display','none');
    }
)