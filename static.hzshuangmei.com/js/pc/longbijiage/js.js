$(document).ready(function() {
    // 栏目切换
    var items = $('#longbi_way li');
    var examp_li = $(".examp li");
    for (i = 0; i < items.length; i++) {
        items[i].onmouseover = function() {
            var _this = this;
            var test = $(_this).siblings();
            _this.style.cursor = "pointer";
            if (_this.className === "") {
                _this.className = "on";
            }
            for (j = 0; j < test.length; j++) {
                test[j].className = "";
            }
        }
        examp_li[i].onmouseover = function() {
            var _this = this;
            var test = $(_this).siblings();
            _this.style.cursor = "pointer";
            if (_this.className === "") {
                _this.className = "on_2";
            }
            for (j = 0; j < test.length; j++) {
                test[j].className = "";
            }
        }
    }


    //内容切换

    $('#way1').mouseover(function() {
        $('.way1').removeClass('none').addClass('show');
        $('.way2').removeClass('show').addClass('none');
    });
    $('#way2').mouseover(function() {
        $('.way2').removeClass('none').addClass('show');
        $('.way1').removeClass('show').addClass('none');
    });
    $('#examp1').mouseover(function() {
        $('.box2').removeClass('none').addClass('show');
        $('.box3').removeClass('show').addClass('none');
    });
    $('#examp2').mouseover(function() {
        $('.box3').removeClass('none').addClass('show');
        $('.box2').removeClass('show').addClass('none');
    });

    //滚动动画效果
    $('.button').addClass('animated pulse');
    $(document).scroll(function() {
        var Height = $(document).scrollTop();
        if (Height >= 500) {
            $('.part1 li,.part1 .title_part1,.part1 h2,.part1 p,.part1 ul').addClass("animated bounceInRight");
        }
        if (Height < 500) {
            $('.part1 li,.part1 .title_part1,.part1 h2,.part1 p,.part1 ul').removeClass("animated bounceInRight");
        }
        if(Height >= 900){
        	$('.line_1').addClass("animated bounceInLeft");
        }
        if (Height < 900) {
        	$('.line_1').removeClass("animated bounceInLeft");
        }
        if(Height >=1100){
        	$('.part2 .title').addClass('animated fadeInUpBig');
        }
        if(Height < 1000){
        	$('.part2 .title').removeClass('animated fadeInUpBig');
        }
        if(Height >=1000){
        	$(".part2 li").addClass('animated fadeInUpBig');
        }
        if(Height < 1000){
        	$(".part2 li").removeClass('animated fadeInUpBig');
        }
        if(Height >= 1400){
        	$(".part3").addClass('animated bounceIn');
        }
        if(Height < 1400){
        	$(".part3").removeClass('animated bounceIn');
        }
        if(Height >= 4660){
        	$('.part6 .title,.part6 li,.part6 span,.part6 h2,.part6 p,.part6 .in').addClass("animated bounceInDown");
        }
        if(Height < 4660){
        	$('.part6 .title,.part6 li,.part6 span,.part6 h2,.part6 p,.part6 .in').removeClass("animated bounceInDown");
        }
        if(Height >= 5600){
        	$('.part7 .title').addClass("animated bounceIn");
        }
        if(Height < 5600){
        	$('.part7 .title').removeClass("animated bounceIn");
        }
        if(Height >= 5800){
        	$('.part7 .li_1,.part7 .li_3,.part7 .bottom li').addClass("animated bounceInLeft");
        	$('.part7 .li_2,.part7 .li_4').addClass("animated bounceInRight");
        }
        if(Height < 5800){
        	$('.part7 .li_1,.part7 .li_3,.part7 .bottom li').removeClass("animated bounceInLeft");
        	$('.part7 .li_2,.part7 .li_4').removeClass("animated bounceInRight");
        }
        if(Height >= 6500){
        	$('.part8').addClass("animated flipInX");
        }
        if(Height < 6500){
        	$('.part8').removeClass("animated flipInX");
        }

    })

});
