
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


var ptabs2=document.getElementById("ptab2").getElementsByTagName("li");
var pdivs2=document.getElementById("ptabCon2").getElementsByTagName("li");


for(var k=0;k<ptabs2.length;k++){
    ptabs2[k].onclick=function(){pchange2(this);}
}
function pchange2(obj){
    for(var k=0;k<ptabs2.length;k++){
        if(ptabs2[k]==obj){
            ptabs2[k].className="pli2";
            pdivs2[k].className="pdiv2";

        }else{
            ptabs2[k].className="";
            pdivs2[k].className="";

        }
    }
}

