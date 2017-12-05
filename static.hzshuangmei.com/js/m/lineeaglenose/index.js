var tabs = document.getElementById("tab").getElementsByTagName("li");
var divs = document.getElementById("tabCon").getElementsByTagName("div");
for (var i = 0; i < tabs.length; i++) {
    tabs[i].onmouseover = function() { change(this); }
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



var tabs2=document.getElementById("tab2").getElementsByClassName("top");
for(var i=0;i<tabs2.length;i++){
    tabs2[i].onmouseover=function(){change2(this);}
}
function change2(obj){
    for(var i=0;i<tabs2.length;i++){
        if(tabs2[i]==obj){
            tabs2[i].className="top fli2";
        }else{
            tabs2[i].className="top";
        }
    }
}

