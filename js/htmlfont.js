//设置根目录字体大小
var num = 1 / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width,initial-scale=' + num + ',minimum-scale=' + num + ',maximum-scale=' + num + ',user-scalable=no" />')
    //			alert(document.documentElement.clientWidth);
var fz = document.documentElement.clientWidth / 10;
document.getElementsByTagName("html")[0].style.fontSize = fz + "px";
