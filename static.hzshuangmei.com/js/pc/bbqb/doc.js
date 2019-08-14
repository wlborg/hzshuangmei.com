/**
 * Created by Administrator on 2019/6/7.
 */
$(function(){
    // 提供工具api:
    var tools = (
        function(module) {

            module.brand_honour = function(con,obj) {
                var brand_honour_container = new Swiper(con, {
                    slidesPerView: 3,
                    spaceBetween: 28,
                    loop:true,
                    autoplay: {
                        delay: 3000000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: con+' .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: obj+' .swiper-button-next',
                        prevEl: obj+' .swiper-button-prev'
                    }
                });
            };
            return module;
        }
    )(window.tools || {});
    tools.brand_honour('.box5 .swiper-container','.box5');//品牌页面设备轮播图
});
