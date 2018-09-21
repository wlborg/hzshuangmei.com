window.fontreset = (function(win, doc) {
    var width = 1920;
    if (window.screen.width <= 1920) {
        width = Math.max(window.screen.width,1200);
    }
    var scale = parseInt((width / 1920 * 100));
    var ele = document.getElementsByTagName('html')[0];
    ele.style.fontSize = scale + 'px';
    return scale;
})(window, document);