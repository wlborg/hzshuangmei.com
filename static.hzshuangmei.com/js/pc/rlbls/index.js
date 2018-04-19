
var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 0,
    mobile: true,
    live: true
});
wow.init();

var content=['<p>减龄<br/>除皱</p>','<p>填充<br/>凹陷</p>','<p>微雕<br/>塑型</p>','<p>补水<br/>保湿</p>'];
var swiper = new Swiper('.swiper-container', {
    loop:true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    paginationBulletRender: function (swiper, index, className) {
       return '<span class="' + className + '">' + content[index] + '</span>';
    }
});

var time=setInterval(auto,3000);
var num=0;
var res=0;
$(".part_Six_Auto").eq(0).show();
function auto() {
    // 0,1,2   0,1,2
    res=(++num)%3;
    fade(res);
}
// 点击上一张
$(".part_Six_Left_LeftRow ").on("click",function () {
    clearInterval(time);
    num=--num;
    if(num==-1){
        num=2;
    }
    res=(num)%3;
    fade(res);
    time=setInterval(auto,3000);
});
$(".part_Six_Right_RightRow ").on("click",function () {
    clearInterval(time);
    num=++num;
    res=(num)%3;
    fade(res);
    time=setInterval(auto,3000);
});
function fade(num) {
    $(".part_Six_Auto").fadeOut();
    $(".part_Six_Auto").eq(res).fadeIn();
    function ul_Two() {
        var pro= '  <li>'+
            '  <p>'+
            '  <span>面部</span>'+
            '  <span>微创整形</span>'+
            '  </p>'+
            '  <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon1.png" alt="面部微创整形">'+
            '      </li>'+
            '      <li>'+
            '      <p>'+
            '      <span>眼部</span>'+
            '      <span>综合整形</span>'+
            '      </p>'+
            '      <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon2.png" alt="眼部综合整形">'+
            '      </li>'+
            '      <li>'+
            '      <p>'+
            '      <span>鼻部</span>'+
            '      <span>综合整形</span>'+
            '      </p>'+
            '      <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon3.png" alt="鼻部综合整形">'+
            '      </li>'+
            '      </ul>';
        $(".part_Six_Ul_TWO").html(pro)
    }
    function ul_Two2() {
        var pro= '  <li>'+
            '  <p>'+
            '  <span>无创</span>'+
            '  <span>面部抗衰</span>'+
            '  </p>'+
            '  <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon_Two_1.jpg" alt="无创面部抗衰">'+
            '      </li>'+
            '      <li>'+
            '      <p>'+
            '      <span>赫本</span>'+
            '      <span>软骨鼻</span>'+
            '      </p>'+
            '      <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon_Two_2.jpg" alt="赫本软骨鼻" style="width: 115px;">'+
            '      </li>'+
            '      <li>'+
            '      <p>'+
            '      <span>鼻部</span>'+
            '      <span>综合整形</span>'+
            '      </p>'+
            '      <img src="//img.hzshuangmei.com/pc/rlbls/images/part_Six_Left_Icon3.png" alt="鼻部综合整形">'+
            '      </li>'+
            '      </ul>';
        $(".part_Six_Ul_TWO").html(pro)
    }
    if(res==0){
        $(".part_Six_dean").html("刘志坤/院长");
        var str=
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>红妆双美整形外科院长</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>中国整形美容协会海峡两岸分会委员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>中西医结合医学美容专业委员会脂肪整形分会委员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>中国整形美容协会眼整形美容理事会青年理事</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>湖南省医疗美容协会鼻整形专业委员会委员</li>\n";

        $(".part_Six_Ul").html(str);
        ul_Two();
    }
    if(res==1){
        $(".part_Six_dean").html("关海涛/院长");
        var str=" <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span> 达拉斯隆鼻海南技术带头人 </li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>国际医疗美容整形协会会员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>大韩整形美容外科协会荣誉会员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>中国医师协会整形与美容分会会会员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span> 第31、39界中韩国际整形美容交流会专家组核心成员</li>\n" ;

        $(".part_Six_Ul").html(str);
        ul_Two();

    }
    if(res==2){
        $(".part_Six_dean").html("朱振红/院长");
        var str=
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span> 全鼻整形技术集大成者 </li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>中韩整形技术交流峰会中方代表</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>大型整形真人秀《美丽新约》评审委员</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span>韩国心美眼鼻医院客座专家</li>\n" +
            "                <li class=\"c_relative\"><span class=\"c_part_absolute\">&nbsp;</span> 大韩整形美容外科协会会员</li>\n" +
            "                <li class=\"c_relative part_Six_Ul_Li_Six c_part_absolute\"><span class=\"c_part_absolute\">&nbsp;</span> 国际医疗整形美容协会会员</li>\n" ;
        $(".part_Six_Ul").html(str);
        ul_Two2();
    }
}
