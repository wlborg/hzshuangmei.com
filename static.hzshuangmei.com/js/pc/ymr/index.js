var obig = document.getElementById("big");
function selectTag(showContent, selfObj) {
    var tag = document.getElementById("tags").getElementsByTagName("li");
    var taglength = tag.length;
    for (i = 0; i < taglength; i++) {
        tag[i].className = "";
    }
    selfObj.parentNode.className = "selectTag";
    for (i = 0; j = document.getElementById("tagContent" + i); i++) {
        j.style.display = "none";
    }
    document.getElementById(showContent).style.display = "block";
}
var x = 0;
function scrollTag() {
    var tags = document.getElementById("tags").getElementsByTagName("a");
    if (x < 4) {
        x = x + 1
    } else x = 0;
    var tag = document.getElementById("tags").getElementsByTagName("li");
    var tag1=document.getElementById("tags").getElementsByTagName("i");
    console.log(tag1);
    var taglength = tag.length;
    for (i = 0; i < taglength; i++) {
        tag[i].className = "";
    }
    tags[x].parentNode.className = "selectTag";
    tag1[x].style.backgound = "#f04624";
    for (i = 0; j = document.getElementById("tagContent" + i); i++) {
        j.style.display = "none";
    }
    document.getElementById("tagContent" + x).style.display = "block";

}
var scrolll = setInterval(scrollTag, 4000);
function zhuan() {
    clearInterval(scrolll);
}
function jixu() {
    scrolll = setInterval(scrollTag, 4000);
}



