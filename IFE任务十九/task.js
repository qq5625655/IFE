var aqi = [];
var count = 0;
var state = [];

// 对输入的值进行判断
function onLeftIn() {
    var input = document.getElementById("input").value;
    if (!input.match(/^([1-9]{1}[0-9]{1}|100)$/)) {
        alert("请您输入一个 10到100 的数字");
        return;
    }
    if (aqi.length > 60) {
        alert("最多能输入60个数字！");
    }
    aqi.unshift(input);
    numblock();

}



function onRightIn() {
    var input = document.getElementById("input").value;
    if (!input.match(/^([1-9]{1}[0-9]{1}|100)$/)) {
        alert("请您输入一个 10到100 的数字");
        return;
    }
    if (aqi.length > 60) {
        alert("最多能输入60个数字！");
    }
    aqi.push(input);
    numblock();

}

function onLeftOut() {
    if (aqi.length !== 0) {
        alert("你确定要从左侧删除" + aqi[0] + "数字吗？");
        aqi.shift();
        numblock();
    }
}

function onRightOut() {
    if (aqi.length !== 0) {
        alert("你确定要从右侧删除" + aqi[aqi.length - 1] + "数字吗？");
        aqi.pop();
        numblock();
    }
}

function numblock() {
    var item = "";
    var num = document.getElementsByClassName("num");
    for (var n in aqi) {
        item += "<div class = 'num' style = 'background: pink; width :20px; " + "height :" + aqi[n] + "px;" +
            "display: inline-block; margin-top: 15px; margin-left: 2px; margin-right: 2px;'>" +
            "</div>";

    }
    document.getElementById("numInput").innerHTML = item;
}

function onNum(numDiv) {
    var index = [].indexOf.call(numDiv.parentElement.children, numDiv); //继承indexof方法！
    aqi.splice(index, 1);
    numblock();
}


function buttonSort() {
    var state = [];
    var count1 = 0;
    sort(aqi);
    //定义一个全局变量timer定时器
    timer = setInterval(render, 100);

    function sort() {
        for (var i = 0; i < aqi.length - 1; i++) {
            for (var j = 0; j < aqi.length - i - 1; j++) {
                if (parseInt(aqi[j]) > parseInt(aqi[j + 1])) {
                    var temp = aqi[j + 1];
                    aqi[j + 1] = aqi[j];
                    aqi[j] = temp;
                    count1++;
                    state.push(aqi.slice(0));
                }
            }
        }
    }
    var count2 = 0;
    //将每一趟中的每一次比较都渲染到页面中
    function render() {
        var num = document.getElementsByClassName("num");
        var s = state.shift() || [];
        //循环遍历li元素,给每一个li的高度分别设置为第i次比较后每一项的值
        for (var i = 0; i < num.length; i++) {
            num[i].style.height = s[i] + "px";
        }
        //渲染计数器,每次渲染就加一
        count2++;
        if (count2 == count1) {
            clearInterval(timer);
        }
    }

}

function randNum() {
    var item = "";
    for (var i = 0; i <= 10; i++) {
        aqi[i] = Math.random() * 100;
        item += "<div class = 'num' style = 'background: pink; width :20px; " + "height :" + aqi[i] + "px;" +
            "display: inline-block; margin-top: 15px; margin-left: 2px; margin-right: 2px;'>" +
            "</div>";
    }
    document.getElementById("numInput").innerHTML = item;
}



function addEvents() {
    document.getElementById("leftIn").addEventListener("click", onLeftIn);
    document.getElementById("rightIn").addEventListener("click", onRightIn);
    document.getElementById("leftOut").addEventListener("click", onLeftOut);
    document.getElementById("rightOut").addEventListener("click", onRightOut);
    document.getElementById("sort").addEventListener("click", buttonSort);
    document.getElementById("random").addEventListener("click", randNum);
    document.getElementById("numInput").addEventListener("ondblclick", function(event) {
        if (event.target && event.target.className === "num") {
            onNum(event.target);
        }
    })
}



function init() {
    addEvents();

}
window.onload = init;