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
            addScript("https://ryak66.kuaishang.cn/bs/ks.j?cI=765150&fI=68948");
        };
        module.addBaiduScript = function() {
            addScript("https://hm.baidu.com/hm.js?6188cc7a9315dbe7155a5b2c9ecc1103");
        };

             module.addCnzzScript = function() {
            addScript("https://s13.cnzz.com/z_stat.php?id=1272981141&web_id=1272981141");
        };


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
                        var href = "https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                        window.location.href = href;
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
                        var href = "https://ryak66.kuaishang.cn/bs/im/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                        window.location.href = href;
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
                    // $("head").append('<link rel="prefetch" href="//' + hostname +"/"+ pre_url + '">');
                    // $("head").append('<link rel="preconnect" href="//' + hostname+"/" + pre_url + '">');
                    // $("head").append('<link rel="prerender" href="//' + hostname +"/"+ pre_url + '">');
                    $("head").append('<link rel="prefetch" href="' + hostname + "/" + pre_url + '">');
                    $("head").append('<link rel="preconnect" href="' + hostname + "/" + pre_url + '">');
                    $("head").append('<link rel="prerender" href="' + hostname + "/" + pre_url + '">');
                }
            });
            $("a:not([href=''],[href='#'])").on('mouseleave', function(event) {
                var pre_url = $(this).attr("href"); //只要鼠标移出就删除  不用判断
                // $('link[rel="prefetch"][href="//' + hostname +"/"+ pre_url + '"]').remove();
                // $('link[rel="preconnect"][href="//' + hostname +"/"+ pre_url + '"]').remove();
                // $('link[rel="prerender"][href="//' + hostname +"/"+ pre_url + '"]').remove();
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
                        var href = $(this).attr('href') + "#project_nav";
                    } else if (infos.href.indexOf('doctors') > 0) {
                        var href = $(this).attr('href') + "#doctor_nav";
                    } else if (infos.href.indexOf('cases') > 0) {
                        var href = $(this).attr('href') + "#ca_01";
                    } else {
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
    effects.lightCurNav("#case_nav", "currnet1");
    effects.lightCurNav("#project_nav", "currnet2");
    effects.lightCurNav("#doctor_nav", "currnet3");
    effects.showCaseBigImage(".case-article-modal", '#case-modal-img');
    //点击顶部项目子导航直接定位
    effects.goToJump("project", "project_nav");
    effects.goToJump("expert", "doctor_nav");
    effects.goToJump("project_nav", "project_nav");
    effects.goToJump("doctor_nav", "doctor_nav");
    //项目，专家，日记，新闻列表页翻页锚定位
    effects.goToPagination();
    tools.addKSTScript();
    tools.addBaiduScript();
     tools.addCnzzScript();
    tools.bindConsultHref();
    //资源预加载
    //     tools.preReady();
    //禁止盗案例图
    tools.anti_Stealing_Images();
    //禁用鼠标右键
    //tools.Disable_Rightmouse_Button();
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
// 360自动收录
(function() {
    var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?81b6cf8baf5206292b2958a63511a633" : "https://jspassport.ssl.qhimg.com/11.0.1.js?81b6cf8baf5206292b2958a63511a633";
    document.write('<script src="' + src + '" id="sozz"><\/script>');
})();
// 分期框
$(function() {
    var $fqaa = $('<a href="https://www.hzshuangmei.com/activity/fqfk.html" class="fqfk" target="_blank" rel="noopener"><img src=\'//img.hzshuangmei.com/pc/fqfk/images/fq.png\' class=\'fq\'></a>')
    $('body').append($fqaa);
});
/*   网站防护等    chj */
var protection = (function() {
    var data = {
        suffix: "com",
        main: "www.",
        red: "hz",
        beauty: "shuangmei",
        dot: "."
    }
    var d = (data.main + data.red + data.beauty).toString() + data.dot + data.suffix;
    // 如果当前URL不是设定的URL，则跳转
    var url = function() {
        if (document.location.host != "www.hzshuangmei.com") {
            location.href = location.href.replace(document.location.host, 'www.hzshuangmei.com');
        }
        return location.href;
    }
    // 复制文件到本地，打开白屏
    var authentication = function() {
        if (window.location.host.indexOf(d) < 0) {
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
protection.checkurl();
//禁止右键
protection.disableright();
//禁止键盘快捷键
//protection.shield(["disableCopy", "disableConsole", "disableSource", "disableF12"]);
protection.shield(["disableCopy", "disableSource", "disableF12"]);
