var preBtn = document.getElementById("pre"),
    inBtn = document.getElementById("in"),
    postBtn = document.getElementById("post"),
    breadthBtn = document.getElementById("Breadth"),
    treeRoot = document.getElementsByClassName("one")[0],
    divList = [],
    timer = null,
    i = 0,
    search = document.getElementById("search"),
    divList2 = [];

window.onload = function() {
        preBtn.onclick = function() {
            reset()
            preOrder(treeRoot);
            changeColor();
        }
        inBtn.onclick = function() {
            reset()
            inOrder(treeRoot);
            changeColor();
        }
        postBtn.onclick = function() {
            reset()
            postOrder(treeRoot);
            changeColor();
        }
        breadthBtn.onclick = function() {
            reset();
            breadth(treeRoot);
            changeColor();
        }
    }
    //前序遍历
function preOrder(node) {
    if (!(node == null)) {
        if (node.nodeName === "BUTTON") {
            return;
        }
        divList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.nextElementSibling);
    }
}

//中序遍历
function inOrder(node) {
    var p = null;
    if (node) {
        inOrder(node.firstElementChild);
        divList.push(node);
        if (node)
            if (node.firstElementChild) {
                temp = node.firstElementChild.nextElementSibling;
                while (temp) {
                    p = temp;
                    inOrder(temp);
                    temp = p.nextElementSibling;
                }
            }
    }
}

//后序遍历
function postOrder(node) {
    var p = null;
    if (node) {
        postOrder(node.firstElementChild);
        if (node.firstElementChild) {
            temp = node.firstElementChild.nextElementSibling;
            while (temp) {
                p = temp;
                postOrder(temp);
                temp = p.nextElementSibling;
            }
        }
        divList.push(node);
    }
}
//广度遍历
function breadth(node) {

    if (!(node == null)) {
        if (node.nodeName === "BUTTON") {
            return;
        }
        divList.push(node);
        breadth(node.nextElementSibling);
        node = divList[i++];
        breadth(node.firstElementChild);
    }
}

function searchInput() {
    if (search !== "") {
        searchShow();
    } else {
        changeColor();
    }
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

//颜色变化函数
function changeColor() {
    var i = 0;
    divList[i].style.backgroundColor = 'blue';

    timer = setInterval(function(argument) {
        if (trim(divList[i].firstChild.nodeValue) === search.value) { //无法使用trim函数，自己写去空格函数
            divList[i - 1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = "red";
        } else {
            i++;
            if (i < divList.length) {
                divList[i - 1].style.backgroundColor = '#fff';
                divList[i].style.backgroundColor = 'blue';
            } else {
                clearInterval(timer);
                divList[divList.length - 1].style.backgroundColor = '#fff';
            }
        }
    }, 500)
}

//初始化样式
function reset() {
    divList = [];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}