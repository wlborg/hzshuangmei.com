$(function() {
    var eles = $('.consult1');
    var offsets = [];
    eles.each(function() {
        var offset = getElementPosition(this).y;
        offsets.push(offset);
        $(this).addClass('roll');
    })
    var scrollTop = 0;
    var viewportH = getViewportSize().w;
    var eleClientHeight = eles[0].clientHeight;
    // $(window).scroll(debounce(saveScrollTop, 200));
    $(window).scroll(function  () {
        saveScrollTop();
    });

    function saveScrollTop() {
        scrollTop = getScrollOffsets().y;
        offsets.forEach(function(e, i) {
            if (scrollTop > e - viewportH + eleClientHeight && scrollTop < e) {
                eles.eq(i).removeClass('roll');
            } 
        })
    }
    /**
     * [getScrollOffsets 获取文档滚动位置]
     * @param  {object} w [窗体对象]
     * @return {object}  滚动位置对象
     */
    function getScrollOffsets(w) {
        w = w || window;
        if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };

        var d = w.document;
        if (document.compatMode == "CSS1Compat") {
            return { x: d.documentElement.scrollLeft, y: documentElement.scrollTop };
        }
        return { x: d.bocy.scrollLeft, y: d.body.scrollTop };
    }

    function getViewportSize(w) {
        w = w || window;
        // if(w.innerWidth!=null) return {w:w.innerWidth,h:w.innerHeight};

        var d = w.document;
        if (document.compatMode == "CSS1Compat")
            return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };

        return { w: d.body.clientWidth, h: d.body.clientHeight }
    }
    /**
     * 获取元素相对于文档的职位
     * @param  {element} e 元素
     * @return {object}   元素文档位置对象 
     */
    function getElementPosition(e) {
        var x = 0,
            y = 0;
        while (e != null) {
            x += e.offseLeft;
            y += e.offsetTop;
            e = e.offsetParent;
        }
        return { x: x, y: y };
    }
    /**
     * 防抖动函数，做法限制下次函数调用之前必须等待的时间间隔。
     * @param  {Function} fn    待调用函数	
     * @param  {Number}   delay  时间间隔	
     * @return {null}    
     */
    function debounce(fn, delay) {

        var timer = null;
        return function() {
            var context = this;
            var args = arguments;

            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    }
})