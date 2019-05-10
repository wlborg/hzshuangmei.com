
      $(function(){
       var infos = (
       function(module) {
           var href = window.location.href;
           module.href = href;
           return module;
       }
   )(window.infos || {});
         // 分页为空时隐藏分页dom
   var effects_sale = (
       function(module) {
           var that = this;
           module.lightCurNav = function(ulClassname, curClassname) {
               if (!$(ulClassname).length) return;
               $(ulClassname).find("a").each(function(index, element) {
                   var href = $(this).attr("href");
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
           return module;
       }
   )(window.effects_sale || {});
    effects_sale.lightCurNav("#sale_banner", "active");
     })

