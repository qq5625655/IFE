var preBtn = document.getElementById("pre"),
    inBtn = document.getElementById("in"),
    postBtn = document.getElementById("post"),
    treeRoot = document.getElementById("flex-item"),
    divList = [],
    timer = null;
window.onload = function() {
    preBtn.onclick = function() {
        preOrder(treeRoot);
        changeColor();
    }
    inBtn.onclick = function() {
        inOrder(treeRoot);
        changeColor();
    }
    postBtn.onclick = function() {
        postOrder(treeRoot);
        changeColor();
    }
}

//前序遍历
function preOrder(node) {
    if (!(node == null)) {
        divList.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}

//中序遍历
function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.firstElementChild);
        divList.push(node);
        inOrder(node.lastElementChild);
    }
}

//后序遍历
function postOrder(node) {
    if (!(node == null)) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        divList.push(node);
    }
}
//颜色变化函数
function changeColor() {
    var i = 0;
    divList[i].style.backgroundColor = 'blue'
    timer = setInterval(function(argument) {
        i++;
        if (i < divList.length) {
            divList[i - 1].style.backgroundColor = '#fff';
            divList[i].style.backgroundColor = 'blue';
        } else {
            clearInterval(timer);
            divList[divList.length - 1].style.backgroundColor = '#fff';
        }
    }, 500)
}



// window.onload = (function() {
//     var parent = document.getElementById("flex-item");
//     document.getElementById("pre").addEventListener("click", function() {
//         preOrder();
//     });
//     document.getElementById("in").addEventListener("click", function() {
//         inOrder();
//     });
//     var childNode = null;
//     var nextNode = null;
//     var num = 0;

//     function preOrder() { //前序

//         if (childNode !== null) {
//             childNode.style.backgroundColor = "white";
//         }
//         if (parent === null) { //判断是否结束
//             clearInterval(t);
//             childNode = null;
//             parent = document.getElementById("flex-item");
//             return;
//         }
//         if (parent.hasChildNodes()) {
//             parent.parentNode.style.backgroundColor = "white";
//             parent.style.backgroundColor = "red";
//             parent = parent.firstElementChild;
//             var t = setTimeout(preOrder, 500);
//         } else {

//             if (parent.nextElementSibling) {
//                 parent.parentNode.style.backgroundColor = "white";
//                 parent.style.backgroundColor = "red";
//                 parent = parent.nextElementSibling;
//                 var t = setTimeout(preOrder, 500);

//             } else {
//                 var pre = parent.previousElementSibling;
//                 pre.style.backgroundColor = "white";
//                 parent.style.backgroundColor = "red";
//                 childNode = parent;
//                 if (parent.parentNode.nextElementSibling) {
//                     parent = parent.parentNode.nextElementSibling;
//                     var t = setTimeout(preOrder, 500);
//                 } else {
//                     parent = parent.parentNode.parentNode.nextElementSibling;
//                     var t = setTimeout(preOrder, 500);
//                 }
//             }
//         }
//     };


//     function inOrder() { //中序

//         if (nextNode !== null) {
//             childNode.parentElement.parentElement.style.backgroundColor = "white";
//             nextNode = null;
//         }

//         if (parent.hasChildNodes()) {
//             parent = parent.firstElementChild;
//             inOrder();
//         } else {
//             parent.style.backgroundColor = "red";
//             childNode = parent.parentElement;
//             var t = setTimeout(inParent, 500);
//         }

//         function inParent() {
//             if (num === 2) {
//                 childNode === null;
//                 parent = document.getElementById("flex-item");
//                 return;
//             }
//             parent.style.backgroundColor = "white";

//             if (parent.nextElementSibling) {
//                 parent = parent.nextElementSibling;

//                 childNode.style.backgroundColor = "red";
//                 var t = setTimeout(inParent, 500);
//             } else if (childNode.nextElementSibling) {
//                 childNode.style.backgroundColor = "white";
//                 parent.style.backgroundColor = "red";
//                 childNode = parent;
//                 var t = setTimeout(inParent, 500);
//             } else if (childNode.parentElement.parentElement) {
//                 childNode.style.backgroundColor = "white";
//                 if (parent.parentElement.nextElementSibling === null) {
//                     parent.style.backgroundColor = "red";
//                     parent = parent.parentElement;
//                     num++;
//                     var t = setTimeout(inNext, 500);
//                 } else {
//                     childNode.parentElement.parentElement.style.backgroundColor = "red";
//                     parent = childNode.parentElement.nextElementSibling;
//                     nextNode = childNode.parentElement.parentElement;
//                     var t = setTimeout(inOrder, 500);
//                 }
//             }
//         }

//         function inNext() {
//             parent.lastElementChild.style.backgroundColor = "white";
//             var t = setTimeout(inParent, 500);
//         }

//     };

//     function postOrder(node) { //后序
//     };
// })();