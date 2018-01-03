
var ptabs=document.getElementById("ptab").getElementsByTagName("li");
var pdivs=document.getElementById("ptabCon").getElementsByTagName("div");
for(var i=0;i<ptabs.length;i++){
    ptabs[i].onmouseover=function(){pchange1(this);}
}
function pchange1(obj){
    for(var i=0;i<ptabs.length;i++){
        if(ptabs[i]==obj){
            ptabs[i].className="pli";
            pdivs[i].className="pdiv";
        }else{
            ptabs[i].className="";
            pdivs[i].className="";
        }
    }
}

