//nav固定
$(function($) {
    $(window).scroll(function(event) {
        if ($(window).scrollTop() > 175) {
            $("#nav").addClass('fixed');
        } else {
            $("#nav").removeClass('fixed');
        }
    });
   // 顶部轮播图双十一按钮鼠标经过处理
      $(".Double_Eleven_Button").bind(
            {mouseenter:function(){
          $(this).removeClass("Double_Eleven_Button_anima");
          },mouseleave :function(){
          $(this).addClass("Double_Eleven_Button_anima");
         }});
    //点击推荐栏目传当前文章标题过去
    $(document).on("click",".clickParameter",function(){
        var url=$(this).attr("href")+"?"+$("#art_title").html();
        location.href=url;
        event.preventDefault();
    });
     // 隐藏专题案例，加类名 zt_case
    $(".zt_case").hide();
});
var banner_swiper = new Swiper('.banner_swiper', {
    loop: true,
    autoplay: 8000,
    pagination: '.banner-pagination',
    paginationClickable: true,
    spaceBetween: 30,
      lazy: {
            loadPrevNext: true,
        },
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
            //获取当前URL文档文件名
           module.getHtmlDocNAme=function(){
               var  str = window.location.href;
                    str = str.substring(str.lastIndexOf("/") + 1);
                    str = str.substring(0, str.lastIndexOf("."));
                    return str;
           }
        //增加外部脚本
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
              //添加快商通
                module.addKSTScript = function(value) {
                    addScript(value);
                };
        //添加百度统计代码
        module.addBaiduScript = function(value) {
            addScript(value);
        };
        //       module.addCnzzScript = function() {
        //     addScript("https://s19.cnzz.com/z_stat.php?id=1273015059&web_id=1273015059");
        // };
        module.bindConsultHref = function() {
            //专题快商通
            var consultEs = $('.j-consult');
            //专题内容区快商通链接总数
            var linkCount = consultEs.length;
            if (linkCount > 0) {
                //给每个咨询元素绑定单击事件
                consultEs.each(function(index) {
                    $(this).on('click', function() {
                        var num = index + 1;
                        var linkInfo = "porjectConsultLinksCountIs" + linkCount + "----visitedLinkNumberIs" + num;
                        var href = "https://www.hzshuangmei.com/kst.html?ref=" + infos.href + "&infos=" + linkInfo;
                        // var href = "https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                        // window.location.href = href;
                        window.open(href,"_blank");
                    })
                });
            } else {
                console.log('若专题中需要咨询按钮请给元素添加"j-consult"类以激活');
            }
            //站点快商通
            var siteConsultEs = $('.j-site-consult');
            //非专题内容区的咨询链接总数
            var siteLinkCount = siteConsultEs.length;
            if (siteLinkCount > 0) {
                siteConsultEs.each(function(index) {
                    $(this).on('click', function() {
                        var num = index + 1;
                        var linkInfo = "AnotherConsultLinksCountIs" + siteLinkCount + "----visitedLinkNumberIs" + num;
                         var href = "https://www.hzshuangmei.com/kst.html?ref=" + infos.href + "&infos=" + linkInfo;
                        // var href = "https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                       // window.location.href = href;
                       window.open(href,"_blank");
                    })
                });
            } else {
                console.log('若站点中需要其他咨询按钮请给元素添加"j-site-consult"类以激活，注意和专题中的咨询做区别');
            }
        };
        /*
             前端资源预加载
             当鼠标指向超链接的时候，预加载prerender,当鼠标离开的时候取消prerender
        */
        module.preReady = function() {
            var hostname = window.location.hostname;
            var urls = window.location.href.split("/");
            urls.pop();
            hostname = urls.join("/");
            $("a:not([href=''],[href='#'],[class*='j-consult'])").on('mouseenter', function(event) {
                var bool = false;
                //鼠标指向的链接
                var pre_url = $(this).attr("href").split("/");
                if (pre_url[0] == "") {
                    pre_url.shift();
                }
                pre_url = pre_url.join("/");
                $("link").each(function() {
                    if (($(this).attr("href") == pre_url)) { //判断是否已经存在,存在则不添加
                        bool = true;
                    }
                });
                if (!bool) {
                    $("head").append('<link rel="prefetch" href="' + hostname + "/" + pre_url + '">');
                    $("head").append('<link rel="preconnect" href="' + hostname + "/" + pre_url + '">');
                    $("head").append('<link rel="prerender" href="' + hostname + "/" + pre_url + '">');
                }
            });
            $("a:not([href=''],[href='#'])").on('mouseleave', function(event) {
                var pre_url = $(this).attr("href"); //只要鼠标移出就删除  不用判断
                $('link[rel="prefetch"][href="' + hostname + "/" + pre_url + '"]').remove();
                $('link[rel="preconnect"][href="' + hostname + "/" + pre_url + '"]').remove();
                $('link[rel="prerender"][href="' + hostname + "/" + pre_url + '"]').remove();
            });
        };
        /*
           防止案例日记图片被盗取
         */
        module.anti_Stealing_Images = function() {
            var smallImgs = $(".article_case_content").find(".main_content").find('img');
            var bigImgs = $("#case-modal-img");
            smallImgs.each(function(index) {
                $(this).contextmenu(function(event) {
                    event.preventDefault();
                });
            });
            bigImgs.each(function(index) {
                $(this).contextmenu(function(event) {
                    event.preventDefault();
                });
            });
        };
        /*
        全站禁用鼠标右键
         */
        module.Disable_Rightmouse_Button = function() {
            $(document).ready(function() {
                $(document).bind("contextmenu", function(e) {
                    e.preventDefault();
                    return false;
                });
            });
        }
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
                // $(ulClassname).find(".nav_list").eq(0).addClass(curClassname);
            }
        };
         module.lightCurNavHelp = function(ulClassname, curClassname) {
            if (!$(ulClassname)) return;
            var helpRg =/^\/[123456789]_[123456789]h\/$/;
            $(ulClassname).find(".nav_list").each(function(element, index) {
                var href = $(this).find(".nav_link").attr("href");
                var lastpath = tools.getLastPath(href);
                var lastpath1 = lastpath[0];
                var lastpath2 = lastpath[1];
                    if (helpRg.test(infos.href.pathname)) {
                        $(this).addClass(curClassname).siblings().removeClass(curClassname);
                    }
            });
            var selector = "." + curClassname;
            if (!$(ulClassname).find(selector).length) {
                // $(ulClassname).find(".nav_list").eq(0).addClass(curClassname);
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
                if($(this).attr("class")!="cases_nobig"){
                    $(this).on('click', function() {
                        var num = index + 1;
                        casecurrentbigimgnum = num;
                        addimgurl(num);
                        casemodal.addClass('case-show');
                    })
                }
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
        /*  点击顶部项目子导航 直接定位*/
        /*
 @param  typeid  可取的值为 project 或者  expert
 表示点击的是顶部导航为项目或者专家的子导航
@param  postion 可选的值为 project_nav 或者 doctor_nav
表示锚点定位的位置.
******使用方法：
effects.goToJump("project","project_nav");
effects.goToJump("expert","doctor_nav");
如果是在项目列表页。或者专家列表页。则直接说页面内定位
*** 可以这样
effects.goToJump("project_nav","project_nav");
effects.goToJump("doctor_nav","doctor_nav");
   */
        module.goToJump = function(typeid, position) {
            $("#" + typeid).find('a').each(function(index, el) {
                $(this).on('click', function() {
                    //过滤掉非栏目的链接
                    if ($(this).attr('href').indexOf('.') == -1) {
                        var href = $(this).attr('href') + "#" + position;
                        $(this).attr('href', href);
                    }
                });
            });
        }
        /*
        列表页翻页锚定位
        ** 使用方法：
        effects.goToPagination();
         */
        module.goToPagination = function() {
            $('.pagination').find('a').each(function(index, el) {
                $(this).on('click', function() {
                    //判断当前在哪个页面 项目？专家？日记？新闻?
                    if (infos.href.indexOf('projects') > 0) {
                        var href = $(this).attr('href') + "#pro_01";
                    } else if (infos.href.indexOf('doctors') > 0) {
                        var href = $(this).attr('href') + "#doctor_nav";
                    } else if (infos.href.indexOf('cases') > 0) {
                        var href = $(this).attr('href') + "#ca_01";
                    }else if (infos.href.indexOf('info') > 0) {
                        var href = $(this).attr('href') + "#info_nav";
                    }else if (infos.href.indexOf('help') > 0) {
                        var href = $(this).attr('href') + "#help_content";
                    }
                    else {
                        var href = $(this).attr('href') + "#news_nav";
                    }
                    $(this).attr('href', href);
                });
            });
        }
        return module;
    }
)(window.effects || {});
$(function() {
    effects.lightCurNav(".nav_ul", "currnet");
    // 案例
    effects.lightCurNav("#cases_conT", "conT");
    effects.lightCurNav("#cases_conTc", "cases_con1_con2_act");
    //项目的项目导航
    effects.lightCurNav("#project_nav_n", "currnet2_n");
    effects.lightCurNav("#pro_conT", "conT");
    effects.lightCurNav("#pro_conTc", "pro_con1_con2_act");
    //------------------------------------
    effects.lightCurNav("#project_nav", "currnet2");
    effects.lightCurNav("#doctor_nav", "currnet3");
    effects.lightCurNav(".list_information_nav", "currnet4");
    effects.lightCurNavHelp("#help_left", "conT");
    effects.showCaseBigImage(".case-article-modal", '#case-modal-img');
    //点击顶部项目子导航直接定位
    effects.goToJump("project", "project_nav");
    // 项目导航
     effects.goToJump("project_nav_n", "pro_01");
     effects.goToJump("pro_con1_con2", "pro_01");
     //effects.goToJump("cases_conT", "ca_01");
    effects.goToJump("cases_conTc", "ca_01");
    effects.goToJump("expert", "doctor_nav");
    effects.goToJump("project_nav", "project_nav");
    effects.goToJump("doctor_nav", "doctor_nav");
    effects.goToJump("list_information_nav", "list_information_nav");
    effects.goToJump("help_left", "help_content");
    //资讯如果是二级,重定义激活状态颜色
     if(window.location.pathname.indexOf("Tinfo")!=-1){
             $(".currnet4").css("background","#F6A7B6");
     }
     $(".list_information_nav>li").hover(function(){
          if(window.location.pathname.indexOf("Tinfo")!=-1){
            $(this).addClass("actvie_T");
            $(".infors_main").addClass("infors_main_T");
          }
     },function(){
         $(this).removeClass('actvie_T');
     });
      //资讯如果是3级,重定义激活状态颜色
     if(window.location.pathname.indexOf("Thinfo")!=-1){
             $(".currnet4").css("background","#B17E6B");
     }
      $(".list_information_nav>li").hover(function(){
          if(window.location.pathname.indexOf("Thinfo")!=-1){
             $(this).addClass("actvie_Th");
             $(".infors_main").addClass("infors_main_Th");
          }
     },function(){
         $(this).removeClass('actvie_Th');
     });
    //项目，专家，日记，新闻列表页翻页锚定位
    effects.goToPagination();
    if (window.location.host.indexOf("www.hzshuangmei.com")>=0){
        tools.addKSTScript("https://ryak66.kuaishang.cn/bs/ks.j?cI=765150&fI=68948");
        tools.addBaiduScript("https://hm.baidu.com/hm.js?f645e32a0c17c6569cfe9c11fe44a3c4");
        //1分钟后打开快商通对话
       // min1("https://ryak66.kuaishang.cn/bs/im.htm?cSource=2&cas=58194___765150&fi=68948&ri=1165638906&vi=b164047ac5d24764869d00a3b3d5b74d");
    }
    if (window.location.host.indexOf("www.syshuangmei.com")>=0){
        tools.addKSTScript("https://ryak66.kuaishang.cn/bs/ks.j?cI=765150&fI=70009");
        tools.addBaiduScript("https://hm.baidu.com/hm.js?f645e32a0c17c6569cfe9c11fe44a3c4");
        //1分钟后打开快商通对话
        //min1();
    }
    function min1(href){
        setTimeout(function(){
            window.location.href=href;
        }, 120000);

    }
    //tools.addCnzzScript();
    tools.bindConsultHref();
    //资源预加载
    //tools.preReady();
    //禁止盗案例图
    tools.anti_Stealing_Images();
    //禁用鼠标右键
    //tools.Disable_Rightmouse_Button();
});
// 百度自动推送  17.11.25
// (function() {
//     var bp = document.createElement('script');
//     var curProtocol = window.location.protocol.split(':')[0];
//     if (curProtocol === 'https') {
//         bp.src = 'https://zz.bdstatic.com/linksubmit/push.js ';
//     } else {
//         bp.src = 'http://push.zhanzhang.baidu.com/push.js ';
//     }
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(bp, s);
// })();
// 百度推送 改良版
//改良版本的百度索引自动推送脚本
    (function(){
        var canonicalURL, curProtocol;
        //Get the  tag
        var x=document.getElementsByTagName("link");
        //Find the last canonical URL
        if(x.length > 0){
            for (i=0;i<x.length;i++){
                if(x[i].rel.toLowerCase() == 'canonical' && x[i].href){
                    canonicalURL=x[i].href;
                }
            }
        }
        //Get protocol
        if (!canonicalURL){
            curProtocol = window.location.protocol.split(':')[0];
        }
        else{
            curProtocol = canonicalURL.split(':')[0];
        }
        //Get current URL if the canonical URL does not exist
        if (!canonicalURL) canonicalURL = window.location.href;
        //Assign script content. Replace current URL with the canonical URL
        !function(){var e=/([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,r=canonicalURL,t=document.referrer;if(!e.test(r)){var n=(String(curProtocol).toLowerCase() === 'https')?"https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif":"//api.share.baidu.com/s.gif";t?(n+="?r="+encodeURIComponent(document.referrer),r&&(n+="&l="+r)):r&&(n+="?l="+r);var i=new Image;i.src=n}}(window);})();
// 360自动收录
(function(e) {
    function t(e) {
      var t = location.href,
      n = t.split("").reverse(),
      r = e.split(""),
      i = [];
      for (var s = 0,
      o = 16; s < o; s++) i.push(r[s] + (n[s] || ""));
      return i.join("")
    }
    var n = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.so\.com)/gi,
    r = e.location.href;
    if (r && !n.test(r) && window.navigator.appName) {
      var i = "//s.360.cn/so/zz.gif",
      o = "81b6cf8baf5206292b2958a63511a633",
      u = t(o),
      a = new Image;
      r && (i += "?url=" + encodeURIComponent(r)),
      o && (i += "&sid=" + o),
      u && (i += "&token=" + u),
      o && (a.src = i)
    }
  })(window);
// 分期框
// $(function() {
//     var $fqaa = $('<a href="https://www.hzshuangmei.com/activity/fqfk.html" class="fqfk" target="_blank" rel="noopener"><img src=\'//img.hzshuangmei.com/pc/fqfk/images/fq.png\' class=\'fq\'></a>')
//     $('body').append($fqaa);
// });
/*   网站防护等    chj */
var protection = (function() {
    // var data = {
    //     suffix: "com",
    //     main: "www.",
    //     red: "hz",
    //     beauty: "shuangmei",
    //     dot: "."
    // }
    // var d = (data.main + data.red + data.beauty).toString() + data.dot + data.suffix;
    // 如果当前URL不是设定的URL，则跳转
    var url = function() {
        if (document.location.host != "www.hzshuangmei.com" && document.location.host != "www.syshuangmei.com") {
            location.href = location.href.replace(document.location.host, 'www.hzshuangmei.com');
        }
        return location.href;
    }
    // 复制文件到本地，打开白屏
    var authentication = function() {
        if (window.location.host.indexOf("www.hzshuangmei.com") < 0 || window.location.host.indexOf("www.syshuangmei.com") < 0){
            $("body").remove();
            //document.querySelector('html').removeChild('body');
            return false
        }
        return true
    }
    // 防止打开右键
    var disableMouseRight = function() {
        $(document).ready(function() {
            $(document).on("contextmenu", function(e) {
                e.preventDefault();
                return false;
            });
        });
    }
    var shield = function(config) {
        shield.config = config;
        var disable = {
            disableCopy: function(e, keycode) {
                //屏蔽Ctrl+s 保存页面
                if (e.ctrlKey && keycode == 83) {
                    console.log(shield.config)
                    e.preventDefault();
                    e.returnValue = false;
                }
            },
            disableSource: function(e, keycode) {
                //屏蔽Ctrl+u  查看页面的源代码
                if (e.ctrlKey && keycode == 85) {
                    e.preventDefault();
                    e.returnValue = false;
                }
            },
            disableF12: function(e, keycode) {
                //屏蔽F12
                if (keycode == 123) {
                    e.preventDefault();
                    e.returnValue = false;
                    //  $("body").remove();
                    window.location.href = "about:blank";
                    window.close();
                }
            },
            disableConsole: function(e, keycode) {
                //屏蔽Ctrl+shift+i   屏蔽调出控制台 和F12一样
                if (e.ctrlKey && e.shiftKey && keycode == 73) {
                    $("body").remove();
                    e.preventDefault();
                    e.returnValue = false;
                }
            }
        }
        document.addEventListener('keydown', function(e) {
            e = window.event || e;
            var keycode = e.keyCode || e.which;
            for (var i = 0; i < shield.config.length; i++) {
                disable[shield.config[i]](e, keycode);
            }
        });
    }

    var facility = {
        geturl: url,
        checkurl: authentication,
        disableright: disableMouseRight,
        shield: shield
    }
    return facility;
})();
/* 启动防护盾 */
//确保URL唯一正确
protection.geturl();
//防止本地打开
// protection.checkurl();
//禁止右键
 protection.disableright();
//禁止键盘快捷键
//protection.shield(["disableCopy", "disableConsole", "disableSource", "disableF12"]);
protection.shield(["disableCopy", "disableSource", "disableF12"]);

// 增加PC端公告
//$(document).ready( function(){
//    $( '#howdy' ).howdyDo({
//        action      : 'hover',
//        effect      : 'slide',
//        easing      : 'easeInOutExpo',
//        duration    : 600,
//        openAnchor  : '<img src="//img.hzshuangmei.com/pc/down-arr-16x16.png" border=0 />',
//        closeAnchor : '<img src="//img.hzshuangmei.com/pc/close-16x16.png" border=0 />'
//    });
//});


// https://github.com/GoogleChromeLabs/quicklink/tree/master/translations/zh-cn
// google quilclink 项目 加快后续页面加载速度
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.quicklink=n()}(this,function(){var e={};function n(e){return new Promise(function(n,t){var r=new XMLHttpRequest;r.open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var t,r,i=(t="prefetch",((r=document.createElement("link")).relList||{}).supports&&r.relList.supports(t)?function(e){return new Promise(function(n,t){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:n);function o(t,r,o){if(!(e[t]||(o=navigator.connection)&&((o.effectiveType||"").includes("2g")||o.saveData)))return(r?function(e){return null==self.fetch?n(e):fetch(e,{credentials:"include"})}:i)(t).then(function(){e[t]=!0})}var u=u||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},c=new Set,f=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var n=e.target.href;c.has(n)&&a(n)}})});function a(e){c.delete(e),o(new URL(e,location.href).toString(),f.priority)}return function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:u,el:document},e),f.priority=e.priority;var n=e.origins||[location.hostname],t=e.ignores||[];e.timeoutFn(function(){e.urls?e.urls.forEach(a):Array.from(e.el.querySelectorAll("a"),function(e){f.observe(e),n.length&&!n.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,t)||c.add(e.href)})},{timeout:e.timeout})}});

//初始化 quicklink
window.addEventListener('load', () =>{
   quicklink({ priority:true,
        origins:[
       'www.hzshuangmei.com',
       'm.hzshuangmei.com',
       'uploads.hzshuangmei.com',
       'js.hzshuangmei.com',
       'css.hzshuangmei.com',
        'img.hzshuangmei.com'
       ],
       ignores:[
       /\/search\/?/,
       ]
      });
});


//注册  serviceWorker
//if('serviceWorker'in navigator){navigator.serviceWorker.register('/serviceworker.js');}
// 延迟注册serviceWorker
window.addEventListener('load', function() {
  if('serviceWorker' in navigator){
     navigator.serviceWorker.register('/serviceworker.js').then(function (registration) {
      console.log('Service Worker Registered,register script: serviceworker.js.');
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
});



//显示service worker缓存占用情况
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(estimate => {
    console.log(`Using ${estimate.usage/1024/1024} out of ${estimate.quota/1024/1024} MB.And the proportion is ${estimate.usage/estimate.quota*100}%`);
  });
}

//PWA 用户端监测
self.addEventListener('error', function (event) {
  var msg = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    stack: event.error && event.error.stack
  };
  // report error msg
});

self.addEventListener('unhandledrejection', function(event) {
    reportError({
        message: event.reason
    })
});
