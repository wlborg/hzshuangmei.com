
var case_tabs=document.getElementById("case_tab").getElementsByTagName("li");
var case_divs=document.getElementById("case_tabCon").getElementsByTagName("li");
for(var i=0;i<case_tabs.length;i++){
    case_tabs[i].onclick=function(){case_change(this);}
}
function case_change(obj){
    for(var i=0;i<case_tabs.length;i++){
        if(case_tabs[i]==obj){
            case_tabs[i].className="case_fli";
            case_divs[i].className="case_fdiv clearFix";
        }else{
            case_tabs[i].className="";
            case_divs[i].className="clearFix";
        }
    }
}

$(function () {
    var position = $(window).height();
    var po_left = $("#case_tab").height();
    $("#case_tab").css('top', position / 2 - po_left / 2);
});
$(function ($) {
    $(window).scroll(function (event) {
        if ($(window).scrollTop() > 400) {
            $("#case_tab").addClass('case_tab');
        }else {
            $("#case_tab").removeClass('case_tab');
        }
    });
});