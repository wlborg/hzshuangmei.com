$(function() {

    var ele = $(".m3 .box");

    function bns() {

        ele.stop().animate({
            left: "-630px"
        }, 1000, function() {
            ele.css({
                left: "-356px"
            }).find(".item:first").appendTo(ele);
        })

        ele.find(".item.active").removeClass('active');
        ele.find(".item").eq(3).addClass('active');

    }
    var timer = setInterval(bns, 2000);
    ele.bind("mouseover", function() {
        console.log("hehe" + timer);
        clearInterval(timer);
    });
    ele.bind("mouseleave", function() {
        console.log("haha" + timer);
        timer = setInterval(bns, 2000);
    });
});
