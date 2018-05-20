$(function() {

    $('.tab-indicator').find('div').hover(function(e){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
         $('.zt-m8 .zt-content .item').eq(index).addClass('active').siblings().removeClass('active');
    });
    
       
});