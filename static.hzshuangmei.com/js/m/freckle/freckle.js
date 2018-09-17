var mySwiper = new Swiper('.swiper-container', {
        autoplay: 2500,
        loop: true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next'
    })
    $(".swiper-button-prev").click(function(){
         mySwiper.startAutoplay();
    })
    $(".swiper-button-next").click(function(){
         mySwiper.startAutoplay();
         
    })