var aside_swiper = new Swiper('.aside_swiper', {
    pagination: '.aside-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true
});
//·ÖÏí
window._bd_share_config = { "common": { "bdSnsKey": {}, "bdText": "", "bdMini": "2", "bdMiniList": false, "bdPic": "", "bdStyle": "1", "bdSize": "24" }, "share": {} };
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = '/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];
//²àÀ¸¹Ì¶¨
$(document).ready(function () {
    var a = $("#ar_aside").offset();
    var c = $("#index_items").offset();
    $(window).scroll(function () {
        var b = $(window).scrollTop();
        if (b > a.top+1000 && b+ 1151< c.top) {
            if ((b + 1151 +900 ) < document.body.parentNode.scrollHeight)
                $("#ar_aside").addClass("fixed2");
        } else {
            $("#ar_aside").removeClass("fixed2");
        }
    });
});