var aqi = [];

// 对输入的值进行判断
function onLeftIn() {
    var input = document.getElementById("input").value;
    if (!input.match(/^\d+$/)) {
        alert("请您输入一个数字");
        return;
    }
    aqi.unshift(input);
    numblock();
}

function onRightIn() {
    var input = document.getElementById("input").value;
    if (!input.match(/^\d+$/)) {
        alert("请您输入一个数字");
        return;
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
        alert("你确定要从右侧删除" + arrNum[arrNum.length - 1] + "数字吗？");
        aqi.pop();
        numblock();
    }
}

function numblock() {
    var item = "";
    for (var n in aqi) {
        item += "<div class = 'num' style = 'background: pink; color: white; text-align: center;" +
            "line-height: 30px; font-size: 30px; display: inline-block; margin-top: 15px; margin-left: 10px; margin-right: 10px;'>" +
            aqi[n] + "</div>";

    }
    document.getElementById("numInput").innerHTML = item;
}

function onNum(numDiv) {
    var index = [].indexOf.call(numDiv.parentElement.children, numDiv); //继承indexof方法！
    arrNum.splice(index, 1);
    renderNums();
}

function addEvents() {
    document.getElementById("leftIn").addEventListener("click", onLeftIn);
    document.getElementById("rightIn").addEventListener("click", onRightIn);
    document.getElementById("leftOut").addEventListener("click", onLeftOut);
    document.getElementById("rightOut").addEventListener("click", onRightOut);
    document.getElementById("numInput").addEventListener("ondblclick", function(e) {
        if (e.target && e.target.className === "num") {
            onNum(e.target);
        }
    })
}

function init() {
    addEvents();

}
window.onload = init;