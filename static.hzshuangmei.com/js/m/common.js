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
           module.addKSTScript = function() {
            //to be changed
               addScript("https://hztk5.kuaishang.cn/bs/ks.j?cI=391627&fI=78939");
           }
           module.addBaiduScript = function() {
               addScript("https://hm.baidu.com/hm.js?cdb0e6daab9a851a15e716817a452897");
           }
           module.bindConsultHref = function() {
               var consultEs = $('.j-consult');
               if (consultEs.length > 0) {
                   consultEs.on('click', function(event) {
                       event.preventDefault();
                       window.location.href = '/kst/kst.html';
                   });
               } else {
                   console.log('若需要其他咨询按钮请给元素添加"j-consult"类以激活');
               }
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
   // effects.showMoreProject:项目列表页显示隐藏的项目
   var effects = (
       function(module) {
           var that = this;
           module.lightCurNav = function(ulClassname, curClassname) {
               if (!$(ulClassname)) return;

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
               num = num + 1;
               var moreitems = $('.project-items li:nth-child(n+' + num + ')');
               if (moreitems.length) {
                   var morebtn = $('.pro-more');
                   moreitems.css('display', "none")
                   morebtn.css('display', 'block');
                   morebtn.click(function(event) {
                       moreitems.css('display', 'block');
                       $(this).css('display', 'none');
                   });
               }
           };
           module.showBigCasePic = function(modalClassName, imgSelectorName) {
               var casemodal = $(modalClassName);
               if (!casemodal) return;
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
                       var num=index+1;
                       imgurl = baseimgurl + num + ".jpg";
                      casemodalimg.attr('src', imgurl);
                      casemodal.addClass('show');
                   })
               });

           }

           return module;
       }
   )(window.effects || {});

   $(function() {
       effects.lightCurNav("#doctornav", "active");
       effects.lightCurNav("#projectnav", "active");
       effects.lightCurNav("#casenav", "active");
       effects.showMoreProject(6);
       effects.showBigCasePic(".case-article-modal", '#modal-img');
       tools.addBaiduTuiSong();
       // tools.addKSTScript();
       tools.addBaiduScript();
       tools.bindConsultHref();
       tools.activeGoTopTool(".j-gotop");
   });

//Baidu自动推送
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

   //360自动收录
(function(){
var src = (document.location.protocol == "http:") ? "http://js.passport.qihucdn.com/11.0.1.js?9a2fee064c0366479d1f4add3636d9e2":"https://jspassport.ssl.qhimg.com/11.0.1.js?9a2fee064c0366479d1f4add3636d9e2";
document.write('<script src="' + src + '" id="sozz"><\/script>');
})();
