require("./index.scss");
import afn from "./a.js";
import Logo from "./logo.png";
import Happy from "./happy.jpg";
afn();

var element = document.getElementById("img");

var myHappy = new Image();
myHappy.src = Happy;
element.appendChild(myHappy);

// 将图像添加到我们已经存在的 div 中。
var myLogo = new Image();
myLogo.src = Logo;
element.appendChild(myLogo);

console.log("hello webpack!");
