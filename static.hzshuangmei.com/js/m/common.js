   /*!
    * Bootstrap v3.3.7 (http://getbootstrap.com)
    * Copyright 2011-2017 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    */
   /*!
    * Generated using the Bootstrap Customizer (http://v3.bootcss.com/customize/?id=3da3850ccd29a74cd14f312ac1d4e99b)
    * Config saved to config.json and https://gist.github.com/3da3850ccd29a74cd14f312ac1d4e99b
    */
   if (typeof jQuery === 'undefined') {
       throw new Error('Bootstrap\'s JavaScript requires jQuery')
   } +
   function($) {
       'use strict';
       var version = $.fn.jquery.split(' ')[0].split('.')
       if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
           throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
       }
   }(jQuery);
   /* ========================================================================
    * Bootstrap: carousel.js v3.3.7
    * http://getbootstrap.com/javascript/#carousel
    * ========================================================================
    * Copyright 2011-2016 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    * ======================================================================== */
   +
   function($) {
       'use strict';
       // CAROUSEL CLASS DEFINITION
       // =========================
       var Carousel = function(element, options) {
           this.$element = $(element)
           this.$indicators = this.$element.find('.carousel-indicators')
           this.options = options
           this.paused = null
           this.sliding = null
           this.interval = null
           this.$active = null
           this.$items = null
           this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))
           this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
               .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
               .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
       }
       Carousel.VERSION = '3.3.7'
       Carousel.TRANSITION_DURATION = 600
       Carousel.DEFAULTS = {
           interval: 5000,
           pause: 'hover',
           wrap: true,
           keyboard: true
       }
       Carousel.prototype.keydown = function(e) {
           if (/input|textarea/i.test(e.target.tagName)) return
           switch (e.which) {
               case 37:
                   this.prev();
                   break
               case 39:
                   this.next();
                   break
               default:
                   return
           }
           e.preventDefault()
       }
       Carousel.prototype.cycle = function(e) {
           e || (this.paused = false)
           this.interval && clearInterval(this.interval)
           this.options.interval &&
               !this.paused &&
               (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
           return this
       }
       Carousel.prototype.getItemIndex = function(item) {
           this.$items = item.parent().children('.item')
           return this.$items.index(item || this.$active)
       }
       Carousel.prototype.getItemForDirection = function(direction, active) {
           var activeIndex = this.getItemIndex(active)
           var willWrap = (direction == 'prev' && activeIndex === 0) ||
               (direction == 'next' && activeIndex == (this.$items.length - 1))
           if (willWrap && !this.options.wrap) return active
           var delta = direction == 'prev' ? -1 : 1
           var itemIndex = (activeIndex + delta) % this.$items.length
           return this.$items.eq(itemIndex)
       }
       Carousel.prototype.to = function(pos) {
           var that = this
           var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))
           if (pos > (this.$items.length - 1) || pos < 0) return
           if (this.sliding) return this.$element.one('slid.bs.carousel', function() { that.to(pos) }) // yes, "slid"
           if (activeIndex == pos) return this.pause().cycle()
           return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
       }
       Carousel.prototype.pause = function(e) {
           e || (this.paused = true)
           if (this.$element.find('.next, .prev').length && $.support.transition) {
               this.$element.trigger($.support.transition.end)
               this.cycle(true)
           }
           this.interval = clearInterval(this.interval)
           return this
       }
       Carousel.prototype.next = function() {
           if (this.sliding) return
           return this.slide('next')
       }
       Carousel.prototype.prev = function() {
           if (this.sliding) return
           return this.slide('prev')
       }
       Carousel.prototype.slide = function(type, next) {
           var $active = this.$element.find('.item.active')
           var $next = next || this.getItemForDirection(type, $active)
           var isCycling = this.interval
           var direction = type == 'next' ? 'left' : 'right'
           var that = this
           if ($next.hasClass('active')) return (this.sliding = false)
           var relatedTarget = $next[0]
           var slideEvent = $.Event('slide.bs.carousel', {
               relatedTarget: relatedTarget,
               direction: direction
           })
           this.$element.trigger(slideEvent)
           if (slideEvent.isDefaultPrevented()) return
           this.sliding = true
           isCycling && this.pause()
           if (this.$indicators.length) {
               this.$indicators.find('.active').removeClass('active')
               var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
               $nextIndicator && $nextIndicator.addClass('active')
           }
           var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
           if ($.support.transition && this.$element.hasClass('slide')) {
               $next.addClass(type)
               if ($next[0]) {
                   $next[0].offsetWidth // force reflow
               }
               $active.addClass(direction)
               $next.addClass(direction)
               $active
                   .one('bsTransitionEnd', function() {
                       $next.removeClass([type, direction].join(' ')).addClass('active')
                       $active.removeClass(['active', direction].join(' '))
                       that.sliding = false
                       setTimeout(function() {
                           that.$element.trigger(slidEvent)
                       }, 0)
                   })
                   .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
           } else {
               $active.removeClass('active')
               $next.addClass('active')
               this.sliding = false
               this.$element.trigger(slidEvent)
           }
           isCycling && this.cycle()
           return this
       }
       // CAROUSEL PLUGIN DEFINITION
       // ==========================
       function Plugin(option) {
           return this.each(function() {
               var $this = $(this)
               var data = $this.data('bs.carousel')
               var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
               var action = typeof option == 'string' ? option : options.slide
               if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
               if (typeof option == 'number') data.to(option)
               else if (action) data[action]()
               else if (options.interval) data.pause().cycle()
           })
       }
       var old = $.fn.carousel
       $.fn.carousel = Plugin
       $.fn.carousel.Constructor = Carousel
       // CAROUSEL NO CONFLICT
       // ====================
       $.fn.carousel.noConflict = function() {
           $.fn.carousel = old
           return this
       }
       // CAROUSEL DATA-API
       // =================
       var clickHandler = function(e) {
           var href
           var $this = $(this)
           var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
           if (!$target.hasClass('carousel')) return
           var options = $.extend({}, $target.data(), $this.data())
           var slideIndex = $this.attr('data-slide-to')
           if (slideIndex) options.interval = false
           Plugin.call($target, options)
           if (slideIndex) {
               $target.data('bs.carousel').to(slideIndex)
           }
           e.preventDefault()
       }
       $(document)
           .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
           .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
       $(window).on('load', function() {
           $('[data-ride="carousel"]').each(function() {
               var $carousel = $(this)
               Plugin.call($carousel, $carousel.data())
           })
       })
   }(jQuery);
   /* ========================================================================
    * Bootstrap: transition.js v3.3.7
    * http://getbootstrap.com/javascript/#transitions
    * ========================================================================
    * Copyright 2011-2016 Twitter, Inc.
    * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
    * ======================================================================== */
   +
   function($) {
       'use strict';
       // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
       // ============================================================
       function transitionEnd() {
           var el = document.createElement('bootstrap')
           var transEndEventNames = {
               WebkitTransition: 'webkitTransitionEnd',
               MozTransition: 'transitionend',
               OTransition: 'oTransitionEnd otransitionend',
               transition: 'transitionend'
           }
           for (var name in transEndEventNames) {
               if (el.style[name] !== undefined) {
                   return { end: transEndEventNames[name] }
               }
           }
           return false // explicit for ie8 (  ._.)
       }
       // http://blog.alexmaccaw.com/css-transitions
       $.fn.emulateTransitionEnd = function(duration) {
           var called = false
           var $el = this
           $(this).one('bsTransitionEnd', function() { called = true })
           var callback = function() { if (!called) $($el).trigger($.support.transition.end) }
           setTimeout(callback, duration)
           return this
       }
       $(function() {
           $.support.transition = transitionEnd()
           if (!$.support.transition) return
           $.event.special.bsTransitionEnd = {
               bindType: $.support.transition.end,
               delegateType: $.support.transition.end,
               handle: function(e) {
                   if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
               }
           }
       })
   }(jQuery);
   //  +function() {
   //     var items = $('.carousel-indicators li');
   //     if (items.length) {
   //         items.each(function(i){
   //             $(this).attr('data-slide-to', i);
   //         })
   //     }
   // }();
   // 顶部菜单导航
   var menuH = 0;
   (function(window, document) {
       var menu = document.getElementById('menu'),
           wrapper = document.getElementsByClassName('wrapper')[0];
       if (!menu) return;
       WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange' : 'resize';

       function toggleHorizontal() {
           [].forEach.call(
               document.getElementById('menu').querySelectorAll('.custom-can-transform'),
               function(el) {
                   el.classList.toggle('pure-menu-horizontal');
               }
           );
       };

       function toggleMenu() {
           // set timeout so that the panel has a chance to roll up
           // before the menu switches states
           menu.classList.toggle('open');
           getMenuH();
           if (menu.classList.contains('open')) {
               // setTimeout(toggleHorizontal, 500);
               setContainerH();
           } else {
               // toggleHorizontal();
               restoreContainerH();
           }
           document.getElementById('toggle').classList.toggle('x');
           // if(menu.classList.contains('open'))
       };

       function closeMenu() {
           if (menu.classList.contains('open')) {
               toggleMenu();
           }
       }

       function getMenuH() {
           if (menuH < 100) {
               var style = null;
               if (window.getComputedStyle) {
                   style = window.getComputedStyle(menu, null); // 非IE
               } else {
                   style = obj.currentStyle; // IE
               }
               menuH = style.height;
               menuH = parseInt(menuH);
           };
       }

       function setContainerH() {
           if (menuH > 100) {
               wrapper.style.height = menuH + "px";
               wrapper.style.overflowY = "hidden";
           }
       }

       function restoreContainerH() {
           wrapper.style.height = "auto";
           wrapper.style.overflowY = "visible";
       }
       document.getElementById('toggle').addEventListener('click', function(e) {
           toggleMenu();
           e.preventDefault();
       });
       window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
   })(this, this.document);
   // 顶部菜单导航结束
   // 顶部菜单导航tab切换
   $(function() {
       var topnavs = $('#menu').find('.tab-nav');
       var tabcontents = $('#menu').find('.tab-content');
       topnavs.click(function() {
           var index = $(this).index()
           $(this).addClass('active').siblings().removeClass('active');
           tabcontents.eq(index).addClass('active').siblings().removeClass('active');
       });
       var navmain = $("#nav .nav-main");
       var navmore = $("#nav .nav-more");
       $('#nav .nav-toggle').click(function() {
           navmain.addClass('hidden');
           navmore.addClass('show');
       })
       $('#nav .close').click(function() {
           navmain.removeClass('hidden');
           navmore.removeClass('show');
       })
   })
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
   // tools.addBaiduTuiSong:添加百度推送代码
   var tools = (
       function(module) {
           module.getLastPath = function(href) {
               var paths = href.split("/");
               var lastpath1 = paths[paths.length - 1].split("#")[0] || "";
               var lastpath2 = paths[paths.length - 2];
               return [lastpath1, lastpath2];
           }
           module.activeGoTopTool = function(selecterName) {
               var obj = $(selecterName);
               obj.click(function() {
                   var that = $(this);
                   $("html,body").stop().animate({
                       "scrollTop": 0
                   }, 500);
               })
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
           module.addBaiduTuiSong = function() {
               var bp = document.createElement('script');
               var curProtocol = window.location.protocol.split(':')[0];
               if (curProtocol === 'https') {
                   bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
               } else {
                   bp.src = 'http://push.zhanzhang.baidu.com/push.js';
               }
               var s = document.getElementsByTagName("script")[0];
               s.parentNode.insertBefore(bp, s);
           }

            //添加快商通
                module.addKSTScript = function(value) {
                    addScript(value);
                };
                   // module.addCnzzScript = function() {
                   //     addScript("https://s19.cnzz.com/z_stat.php?id=1273015059&web_id=1273015059");
                   // }
                 //添加百度统计代码
                 module.addBaiduScript = function(value) {
                     addScript(value);
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
                           // var href = "https://ryak66.kuaishang.cn/bs/mim/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                          var href = "https://m.hzshuangmei.com/kst.html?ref=" + infos.href + "&infos=" + linkInfo;
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
                           // var href = "https://ryak66.kuaishang.cn/bs/mim/68948/58194/765150.htm?ref=" + infos.href + "&infos=" + linkInfo;
                           var href = "https://m.hzshuangmei.com/kst.html?ref=" + infos.href + "&infos=" + linkInfo;
                           // window.location.href = href;
                           window.open(href,"_blank");
                       })
                   });
               } else {
                   console.log('若站点中需要其他咨询按钮请给元素添加"j-site-consult"类以激活，注意和专题中的咨询做区别');
               }
           }
           /*
             防止案例日记图片被盗取
           */
           module.anti_Stealing_Images = function() {
               var smallImgs = $(".case-main").find(".pic").find('img');
               var bigImgs = $("#modal-img");
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
   // effects.showMoreProject:项目列表页显示隐藏的项目
   // 分页为空时隐藏分页dom
   var effects = (
       function(module) {
           var that = this;
           module.lightCurNav = function(ulClassname, curClassname) {
               if (!$(ulClassname).length) return;
               $(ulClassname).find("li").each(function(index, element) {
                   var href = $(this).find("a").attr("href");
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
           };
           module.showMoreProject = function(num) {
               var num = num + 1;
               var moreitems = $('.project-items li:nth-child(n+' + num + ')');
               if (moreitems.length) {
                   var morebtn = $('.pro-more');
                   moreitems.css('display', "none")
                   morebtn.css('display', 'block');
                   morebtn.click(function(event) {
                       moreitems.css('display', 'inline-block');
                       $(this).css('display', 'none');
                   });
               }
           };
           module.showBigCasePic = function(modalClassName, imgSelectorName) {
               var casemodal = $(modalClassName);
               if (!casemodal.length) return;
               var casemodalimg = $(imgSelectorName);
               var paths = window.location.href.split("/");
               var casearticleid = paths[paths.length - 1].split(".")[0] || "";
               var baseimgurl = '//uploads.hzshuangmei.com/bigcaseimage/' + casearticleid + "/";
               var imgurl = "";
               casemodal.click(function() {
                   $(this).removeClass('show');
                   casemodalimg.attr('src', "");
               });
               var targetImgs = $('.case-main').find('img');
               var length = targetImgs.length;
               targetImgs.each(function(index) {
                   $(this).on('click', function() {
                       var num = index + 1;
                       imgurl = baseimgurl + num + ".jpg";
                       casemodalimg.attr('src', imgurl);
                       casemodal.addClass('show');
                   })
               });
           };
           module.hiddeEmptyRelate = function() {
               if (!$('.relateporject').length) return;
               var slidecase = $('#articleslidecase');
               var slidedocotor = $('#articleslidedoctor');
               var relateProject = $('.relateporject  .imgbox');
               if (!slidecase.length) {
                   $('.articlerelatecase').css("display", "none");
               }
               if (!slidedocotor.length) {
                   $('.articlerelatedoctor').css("display", "none");
               }
               if (!relateProject.length) {
                   $('.relateporject').css("display", "none");
               }
           };
           module.hidePageindex=function(obj){
              if($(obj).text()==""){
                 $(obj).addClass('hidePadeindex');
              }
           };
           return module;
       }
   )(window.effects || {});
   $(function() {
       effects.lightCurNav("#doctornav", "active");
       effects.lightCurNav("#projectnav", "active");
       effects.lightCurNav("#casenav", "active");
       effects.lightCurNav("#infonav", "active");
       effects.showMoreProject(6);
       effects.showBigCasePic(".case-article-modal", '#modal-img');
       effects.hiddeEmptyRelate();
       effects.hidePageindex(".pageindex");
      // tools.addBaiduTuiSong();
       if (window.location.host.indexOf("m.hzshuangmei.com")>=0){
           tools.addKSTScript("https://ryak66.kuaishang.cn/bs/ks.j?cI=765150&fI=68948");
           tools.addBaiduScript("https://hm.baidu.com/hm.js?15ebca203caa17b82e19afb88696f5de");
          // min1("https://ryak66.kuaishang.cn/bs/mim/68948/58194/765150.htm?ref=https://m.hzshuangmei.com/&infos=AnotherConsultLinksCountIs8----visitedLinkNumberIs8");
       }
       // if (window.location.host.indexOf("m.syshuangmei.com")>=0){
       //     tools.addKSTScript("https://ryak66.kuaishang.cn/bs/ks.j?cI=765150&fI=70009&ism=1");
       //     tools.addBaiduScript("https://hm.baidu.com/hm.js?e54e63908fd614d270231443c6a57edd");
       //     //min1();
       // }
       //  effects.goToJump("info_nav", "info_nav");
    //资讯如果是二级,重定义激活状态颜色
     if(window.location.pathname.indexOf("Tinfo")!=-1){
             $(".active").css("background","#F6A7B6");
     }
      //资讯如果是3级,重定义激活状态颜色
     if(window.location.pathname.indexOf("Thinfo")!=-1){
             $(".active").css("background","#B17E6B");
     }
       function min1(href){
           setTimeout(function(){
               window.location.href=href;
           }, 120000);
       }
      // tools.addCnzzScript();
       tools.bindConsultHref();
       tools.activeGoTopTool(".j-gotop");
       //禁止右键盗取案例图片
       tools.anti_Stealing_Images();
          //点击详情页的推进栏目和最新文章传当前文章名称
           $(document).on("click",".clickParameter",function(){
               var url=$(this).attr("href")+"?"+$("#art_title").html();
               location.href=url;
               event.preventDefault();
           });

   });
   //Baidu自动推送
   // (function() {
   //     var bp = document.createElement('script');
   //     var curProtocol = window.location.protocol.split(':')[0];
   //     if (curProtocol === 'https') {
   //         bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
   //     } else {
   //         bp.src = 'http://push.zhanzhang.baidu.com/push.js';
   //     }
   //     var s = document.getElementsByTagName("script")[0];
   //     s.parentNode.insertBefore(bp, s);
   // })();
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
   //360自动收录
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
      o = "9a2fee064c0366479d1f4add3636d9e2",
      u = t(o),
      a = new Image;
      r && (i += "?url=" + encodeURIComponent(r)),
      o && (i += "&sid=" + o),
      u && (i += "&token=" + u),
      o && (a.src = i)
    }
  })(window);
   /*滑动屏幕隐藏和现实导航栏*/
   // 手指在屏幕上滑动的时候顶部的导航栏自动隐藏，只保留离线宝
   //
   // window.onload = function() {
   //     //底层共用
   //     var iBase = {
   //         Id: function(name) {
   //             return document.getElementById(name);
   //         },
   //         //设置元素透明度,透明度值按IE规则计,即0~100
   //         SetOpacity: function(ev, v) {
   //             ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
   //         }
   //     }
   //     //淡入效果(含淡入到指定透明度)
   //     function fadeIn(elem, speed, opacity) {
   //         /*
   //          * 参数说明
   //          * elem==>需要淡入的元素
   //          * speed==>淡入速度,正整数(可选)
   //          * opacity==>淡入到指定的透明度,0~100(可选)
   //          */
   //         speed = speed || 20;
   //         opacity = opacity || 100;
   //         //显示元素,并将元素值为0透明度(不可见)
   //         elem.style.display = 'block';
   //         iBase.SetOpacity(elem, 0);
   //         //初始化透明度变化值为0
   //         var val = 0;
   //         //循环将透明值以10递增,即淡入效果
   //         (function() {
   //             iBase.SetOpacity(elem, val);
   //             val += 10;
   //             if (val <= opacity) {
   //                 setTimeout(arguments.callee, speed)
   //             }
   //         })();
   //     }
   //     //淡出效果(含淡出到指定透明度)
   //     function fadeOut(elem, speed, opacity) {
   //          * 参数说明
   //          * elem==>需要淡出的元素
   //          * speed==>淡出速度,正整数(可选)
   //          * opacity==>淡出到指定的透明度,0~100(可选)
   //         speed = speed || 20;
   //         opacity = opacity || 0;
   //         //初始化透明度变化值为0
   //         var val = 100;
   //         //循环将透明值以10递减,即淡出效果
   //         (function() {
   //             iBase.SetOpacity(elem, val);
   //             val -= 10;
   //             if (val >= opacity) {
   //                 setTimeout(arguments.callee, speed);
   //             } else if (val < 0) {
   //                 //元素透明度为0后隐藏元素
   //                 elem.style.display = 'none';
   //             }
   //         })();
   //     }
   //     document.addEventListener("touchstart", function(e) {
   //         // e.preventDefault();
   //         fadeOut(iBase.Id('menu'));
   //         console.log('执行滑动');
   //     }, false)
   //     document.addEventListener("touchmove", function(e) {
   //         // e.preventDefault();
   //         fadeOut(iBase.Id('menu'));
   //         console.log('执行滑动');
   //     }, false)
   //     // 当手指离开屏幕的时候，显示导航栏
   //     document.addEventListener("touchend", function(e) {
   //          e.preventDefault();
   //         fadeIn(iBase.Id('menu'));
   //         console.log('手离开屏幕');
   //     }, false)
   // }
   /*   网站防护等    chj */
   var protection = (function() {
        // 专题详情页点击链接调整传当前页面文章标题过去

       // var data = {
       //     suffix: "com",
       //     main: "m.",
       //     red: "hz",
       //     beauty: "shuangmei",
       //     dot: "."
       // }
       // var d = (data.main + data.red + data.beauty).toString() + data.dot + data.suffix;
       // 如果当前URL不是设定的URL，则跳转
       var url = function() {
           if (document.location.host != "m.hzshuangmei.com" && document.location.host != "m.syshuangmei.com") {
               location.href = location.href.replace(document.location.host, 'm.hzshuangmei.com');
           }
           return location.href;
       }
       // 复制文件到本地，打开白屏
       var authentication = function() {
           if (window.location.host.indexOf("m.hzshuangmei.com") < 0 && window.location.host.indexOf("m.syshuangmei.com") < 0) {
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




// https://github.com/GoogleChromeLabs/quicklink/tree/master/translations/zh-cn
// google quilclink 项目 加快后续页面加载速度
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.quicklink=n()}(this,function(){var e={};function n(e){return new Promise(function(n,t){var r=new XMLHttpRequest;r.open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var t,r,i=(t="prefetch",((r=document.createElement("link")).relList||{}).supports&&r.relList.supports(t)?function(e){return new Promise(function(n,t){var r=document.createElement("link");r.rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:n);function o(t,r,o){if(!(e[t]||(o=navigator.connection)&&((o.effectiveType||"").includes("2g")||o.saveData)))return(r?function(e){return null==self.fetch?n(e):fetch(e,{credentials:"include"})}:i)(t).then(function(){e[t]=!0})}var u=u||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},c=new Set,f=new IntersectionObserver(function(e){e.forEach(function(e){if(e.isIntersecting){var n=e.target.href;c.has(n)&&a(n)}})});function a(e){c.delete(e),o(new URL(e,location.href).toString(),f.priority)}return function(e){e=Object.assign({timeout:2e3,priority:!1,timeoutFn:u,el:document},e),f.priority=e.priority;var n=e.origins||[location.hostname],t=e.ignores||[];e.timeoutFn(function(){e.urls?e.urls.forEach(a):Array.from(e.el.querySelectorAll("a"),function(e){f.observe(e),n.length&&!n.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,t)||c.add(e.href)})},{timeout:e.timeout})}});

//初始化 quicklink
window.addEventListener('load', () =>{
   quicklink({ priority:true,
           ignores:[
             /baidu/,
             /kuaishang/,
              uri => uri.includes('.php'),
       ],
       origins:[
       'm.hzshuangmei.com',
       'www.hzshuangmei.com',
       'uploads.hzshuangmei.com',
       'js.hzshuangmei.com',
        'css.hzshuangmei.com',
         'img.hzshuangmei.com'
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

// 让 PWA 安装提示在首次访问时弹出
window.addEventListener('beforeinstallprompt', event => {
  event.userChoice.then(result => {console.log(result.outcome)
  })
})


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

self.addEventListener('unhandledrejection', function (event) {
  // event.reason
  if (/Quota exceeded/i.test(event.reason)) {
    // maybe clean some cache here
  }
});


