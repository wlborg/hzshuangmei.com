$(document).ready(function() {
    var obj = $('.part_ul');
    obj.find('li').mouseover(function() {
        $(this).addClass("show").siblings().removeClass("show");
    });
    obj.find('li').mouseout(function(){
    	$(this).removeClass("show");
    });
})
