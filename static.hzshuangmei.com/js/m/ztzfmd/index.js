var wow = new WOW({ boxClass: 'wow', animateClass: 'animated', offset: 0, mobile: true, live: true, callback: function(box) {}, scrollContainer: null });
wow.init();

var tabs = document.getElementById("tab").getElementsByTagName("li");
var divs = document.getElementById("tabCon").getElementsByTagName("ul");
for (var i = 0; i < tabs.length; i++) {
    tabs[i].onclick = function() { change(this); }
}

function change(obj) {
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i] == obj) {
            tabs[i].className = "fli";
            divs[i].className = "fdiv";
        } else {
            tabs[i].className = "";
            divs[i].className = "";
        }
    }
}

var tabs1 = document.getElementById("tab1").getElementsByTagName("li");
var tabs2 = tabs1.getElementsByTagName("div");
for (var i = 0; i < tabs1.length; i++) {
    tabs1[i].onclick = function() { change1(this); }
}
function change1(obj) {
    for (var i = 0; i < tabs1.length; i++) {
        if (tabs1[i] == obj) {
            tabs2[i].className = "changeli";
        } else {
            tabs2[i].className = "";
        }
    }
}