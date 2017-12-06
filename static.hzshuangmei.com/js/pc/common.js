//nav固定
$(function($) {
    $(window).scroll(function(event) {
        if ($(window).scrollTop() > 175) {
            $("#nav").addClass('fixed');
        } else {
            $("#nav").removeClass('fixed');
        }
        // console.log($("#nav").offset().top);
    });
});
var banner_swiper = new Swiper('.banner_swiper', {
    loop: true,
    autoplay: 8000,
    pagination: '.banner-pagination',
    paginationClickable: true,
    spaceBetween: 30
});
//右边固定
$(function() {
    //获取当前适口高度
    var position = $(window).height();
    //浮窗高度
    var fuchuang = $(".yb_conct").height();
    //漂浮窗初始化在视口中间
    $(".yb_conct").css('top', position / 2 - fuchuang / 2);
    // 悬浮窗口
    $(".yb_conct").hover(function() {
        $(".yb_conct").css("right", "0px");
        $(".yb_bar .yb_ercode").css('height', '200px');
    }, function() {
        $(".yb_conct").css("right", "-128px");
        $(".yb_bar .yb_ercode").css('height', '56px');
    });
    // 返回顶部
    $(".yb_top").click(function() {
        $("html,body").animate({
            'scrollTop': '0px'
        }, 300);
    });
});
// 顶部菜单导航tab切换结束
// common.js 公共js文件  必须引用 JQ 库文件，将common.js文件放在 JQ的引用后面
// 说明：每个页面都必须包含该js文件，用于存放每个页面都包含的js模块
// 可能包含的模块有：百度统计、快商通......
// 工具模块   立即执行函数写法
// 提供工具api
function log(str, arg) {
    console.log(str + arg);
}
// 提供工具api:
// tools.getLastPath:获取链接末尾路径1与路径2
// tools.addKSTScript:添加快商通脚本资源
var tools = (
    function(module) {
        module.getLastPath = function(href) {
            var paths = href.split("/");
            var lastpath1 = paths[paths.length - 1].split("#")[0] || "";
            var lastpath2 = paths[paths.length - 2];
            return [lastpath1, lastpath2];
        };
        module.activeGoTopTool = function(selecterName) {
            var obj = $(selecterName);
            obj.click(function() {
                var that = $(this);
                $("html,body").stop().animate({
                    "scrollTop": 0
                }, 500);
            });
        };
        function addScript(src) {
            var bldyE = document.getElementsByTagName("body");
            var scriptE = document.createElement("script");
            scriptE.setAttribute("type", "text/javascript");
            scriptE.setAttribute("src", src);
            if (bldyE.length) {
                bldyE[0].appendChild(scriptE);
            } else {
                document.documentElement.appendChild(scriptE);
            }
        }
        module.addKSTScript = function() {
            addScript("https://hztk5.kuaishang.cn/bs/ks.j?cI=391627&fI=778788");
        };
        module.addBaiduScript = function() {
            addScript("https://hm.baidu.com/hm.js?6188cc7a9315dbe7155a5b2c9ecc1103 ");
        };
        module.bindConsultHref = function() {
            var consultEs = $('.j-consult');
            if (consultEs.length > 0) {
                consultEs.on('click', function(event) {
                    event.preventDefault();
                    var currTitle = document.title;
                    window.open("https://www.hzshuangmei.com/kst/kst.html?" + currTitle);
                    //  window.location.href = '/swt/shangwutong.html';
                });
            } else {
                console.log('若需要其他咨询按钮请给元素添加"j-consult"类以激活');
            }
        };
        /*
             前端资源预加载
             当鼠标指向超链接的时候，预加载prerender,当鼠标离开的时候取消prerender
        */
        module.preReady = function() {
            // var hostname = window.location.hostname;
           // var urls=window.location.href.split("/");
        //   urls.pop();
      // var hostname = urls.join("/");
            $("a:not([href=''],[href='#'],[class*='j-consult'])").on('mouseenter', function(event) {
                var bool = false;
                 //鼠标指向的链接
             //   var pre_url = $(this).attr("href").split("/");

                // if(pre_url[0]==""){
                //             pre_url.shift();
                // }
                //    pre_url=pre_url.join("/");
                 var pre_url = $(this).attr("href");
                $("link").each(function() {
                    if (($(this).attr("href") == pre_url)) { //判断是否已经存在,存在则不添加
                        bool = true;
                    }
                });
                if (!bool) {
                    // $("head").append('<link rel="prefetch" href="//' + hostname +"/"+ pre_url + '">');
                    // $("head").append('<link rel="preconnect" href="//' + hostname+"/" + pre_url + '">');
                    // $("head").append('<link rel="prerender" href="//' + hostname +"/"+ pre_url + '">');
                    $("head").append('<link rel="prefetch" href="'+ pre_url + '">');
                    $("head").append('<link rel="preconnect" href="' + pre_url + '">');
                    $("head").append('<link rel="prerender" href="' +  pre_url + '">');
                }
            });
            $("a:not([href=''],[href='#'])").on('mouseleave', function(event) {
                var pre_url = $(this).attr("href"); //只要鼠标移出就删除  不用判断
                // $('link[rel="prefetch"][href="//' + hostname +"/"+ pre_url + '"]').remove();
                // $('link[rel="preconnect"][href="//' + hostname +"/"+ pre_url + '"]').remove();
                // $('link[rel="prerender"][href="//' + hostname +"/"+ pre_url + '"]').remove();
                $('link[rel="prefetch"][href="' + pre_url + '"]').remove();
                $('link[rel="preconnect"][href="' + pre_url + '"]').remove();
                $('link[rel="prerender"][href="' +  pre_url + '"]').remove();
            });
        };
/*
   防止案例日记图片被盗取
 */
           module.anti_Stealing_Images = function() {
                var smallImgs =  $(".article_case_content").find(".main_content").find('img');
                var  bigImgs = $("#case-modal-img");
                    smallImgs.each(function(index) {
                                            $(this).contextmenu(function(event){
                                                event.preventDefault();
                                            });
                    });
                          bigImgs.each(function(index) {
                                            $(this).contextmenu(function(event){
                                                event.preventDefault();
                                            });
                    });
        };
        return module;
    }
)(window.tools || {});
// 提供窗口信息:
// infos.href:获取当前路径
var infos = (
    function(module) {
        var href = window.location.href;
        module.href = href;
        return module;
    }
)(window.infos || {});
// 提供效果api
// effects.lightCurNav:导航绑定单击高亮显示当前；
var effects = (
    function(module) {
        var that = this;
        module.lightCurNav = function(ulClassname, curClassname) {
            if (!$(ulClassname)) return;
            $(ulClassname).find(".nav_list").each(function(element, index) {
                var href = $(this).find(".nav_link").attr("href");
                var lastpath = tools.getLastPath(href);
                var lastpath1 = lastpath[0];
                var lastpath2 = lastpath[1];
                if (lastpath1) {
                    if (infos.href.indexOf(lastpath1) >= 0) {
                        $(this).addClass(curClassname).siblings().removeClass(curClassname);
                    }
                } else {
                    if (lastpath2 && infos.href.indexOf(lastpath2) >= 0) {
                        $(this).addClass(curClassname).siblings().removeClass(curClassname);
                    }
                }
            });
            var selector = "." + curClassname;
            if (!$(ulClassname).find(selector).length) {
                $(ulClassname).find(".nav_list").eq(0).addClass(curClassname);
            }
        };
        module.showCaseBigImage = function(modalClassName, imgSelectorName) {
            var casemodal = $(modalClassName);
            if (!casemodal) return;
            var paths = window.location.href.split("/");
            var casearticleid = paths[paths.length - 1].split(".")[0] || "";
            var baseimgurl = 'https://uploads.hzshuangmei.com/bigcaseimage/' + casearticleid + "/";
            var imgurl = "";
            var casetargetimgs = $('.article_case_content .main').find('img');
            var casetargetimgslength = casetargetimgs.length;
            var casecurrentbigimgnum = 0;
            var casemodal = $('.case-article-modal');
            var casemodalimg = $(imgSelectorName);
            var caselosebtn = $('.case-article-modal .case-close');
            var caseprevbtn = $('.case-article-modal .case-prev');
            var casenextbtn = $('.case-article-modal .case-next');
            caselosebtn.click(function() {
                casemodal.removeClass('case-show');
                casemodalimg.attr('src', "");
            })
            casetargetimgs.each(function(index) {
                $(this).on('click', function() {
                    var num = index + 1;
                    casecurrentbigimgnum = num;
                    addimgurl(num);
                    casemodal.addClass('case-show');
                })
            });
            casenextbtn.click(function() {
                var num = casecurrentbigimgnum + 1;
                if (num > casetargetimgslength) {
                    num = 0;
                }
                casecurrentbigimgnum = num;
                addimgurl(num);
            });
            caseprevbtn.click(function() {
                var num = casecurrentbigimgnum - 1;
                if (num < 0) {
                    num = casetargetimgslength;
                }
                casecurrentbigimgnum = num;
                addimgurl(num);
            });
            function addimgurl(num) {
                imgurl = baseimgurl + num + ".jpg";
                casemodalimg.attr('src', imgurl);
            }
        }
        return module;
    }
)(window.effects || {});
$(function() {
    effects.lightCurNav(".nav_ul", "currnet");
    effects.showCaseBigImage(".case-article-modal", '#case-modal-img');
    // tools.addKSTScript();
    tools.addBaiduScript();
    tools.bindConsultHref();
    //资源预加载
    tools.preReady();
    //禁止盗图
    tools.anti_Stealing_Images();
});
// 百度自动推送  17.11.25
(function() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js ';
    } else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js ';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
