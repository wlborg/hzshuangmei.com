

$(function() {



    $('.m1 .content div').mouseover(function() {



        $(this).removeClass('notcurr').siblings().addClass('notcurr');



    });







    $('.m7 .content .index').find('li').mouseover(function() {



        var index = $(this).index();



        $('.m7 .content .show').find('li').eq(index).removeClass('notcurr').siblings().addClass('notcurr');



    });



});
