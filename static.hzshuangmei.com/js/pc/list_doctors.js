
var doctors_banner = new Swiper('.doctors_banner', {
    pagination: '.doctors_pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true
});

var doctors_tabs=document.getElementById("doctors_tab").getElementsByTagName("li");
var doctors_tabCons=document.getElementById("doctors_tabCon").getElementsByTagName("ul");
for(var i=0;i<doctors_tabs.length;i++){
    doctors_tabs[i].onmouseover=function(){change(this);}
}
function change(obj){
    for(var i=0;i<doctors_tabs.length;i++){
        if(doctors_tabs[i]==obj){
            doctors_tabs[i].className="doc_fli";
            doctors_tabCons[i].className="doc_fdiv clearFix";
        }else{
            doctors_tabs[i].className="";
            doctors_tabCons[i].className="clearFix";
        }
    }
}
