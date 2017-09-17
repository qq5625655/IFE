var createTag = (function() {
    // 创建类
    function _tag(input, output, button) {
        // 私有变量
        var number;
        // 特权方法
        // this.getNumber = function() {
        //     return number;
        // };
        // this.setNumber = function(newNumber) {
        //     number = newNumber;
        // };
        // 公有属性
        this.input = document.getElementById(input);
        this.output = document.getElementsByClassName(output)[0];
        this.button = document.getElementById(button);
        // 公有方法
        this.getData = function() {
            switch (input) {
                case 'tag':
                    var value = this.input.value.match(/(^[^,\， ]*)/)[0];
                    break;
                case 'hobby':
                default:
                    var value = this.input.value.trim().split(/,|，|、|\s|\n|\r|\t/);
            }
            return value;
        };
        this.render = function(value) {
            if (value === '' || value === ',' || value === '，') {
                return;
            }
            var wrap = document.createElement('div');
            wrap.textContent = value;
            this.output.appendChild(wrap);
            number++;
        };
        // 构造器
        // this.setNumber(0);
        // 初始化
        this.button ? this.init('buttonEvent') : this.init('keyEvent');
    }

    /** 
     * 构造原型方法
     */

    _tag.prototype = {

        /**
         * 检测输入数据是否有重复
         * @param {String} - data 输入的数据
         * @return {Boolean} - 数据是否重复
         */

        repeatData: function(data) {
            for (var i = 0; i < this.output.children.length; i++) {
                if (this.output.children[i].textContent.localeCompare(data) === 0) {
                    this.input.value = '';
                    this.setNumber(this.output.children.length);
                    return true;
                }
            }
        },

        /**
         * 删除特定的数据
         * @param {HTMLDOMElement} - ele 被删除的元素
         */

        delData: function(ele) {
            this.output.removeChild(ele);
            this.setNumber(this.output.children.length);
        },

        /**
         * 初始化
         * @param {String} - type 判断是用否需要按钮选择不同的初始化方式
         */

        init: function(type) {
            var self = this;
            this.output.addEventListener('mouseover', function(event) {
                event.target.textContent = '删除：' + event.target.textContent;
            });
            this.output.addEventListener('mouseout', function(event) {
                event.target.textContent = event.target.textContent.replace(/删除：/, '');
            });
            this.output.addEventListener('click', function(event) {
                self.delData(event.target);
            });
            switch (type) {
                case 'keyEvent':
                    document.addEventListener('keyup', function(event) {
                        if (/(,| |\，)$/.test(self.input.value) || event.keyCode === 13) {
                            console.log(self.getData())
                            self.repeatData(self.getData().trim()) || self.render(self.getData().trim());
                            self.input.value = '';
                            if (self.getNumber() > 10) {
                                self.delData(self.output.firstChild);
                            }
                        }
                    });
                    break;
                case 'buttonEvent':
                    self.button.addEventListener('click', function() {
                        for (var i = 0; i < self.getData().length; i++) {
                            self.repeatData(self.getData()[i]) || self.render(self.getData()[i]);
                            if (self.getNumber() > 10) {
                                self.delData(self.output.firstChild);
                            }
                        }
                        self.input.value = '';
                    });
                    break;
            }
        }
    };
    // 返回类
    return _tag;
})();

/**
 * 实例化tag和hobby
 */
var tag = new createTag('tag', 'tagContainer');
var hobby = new createTag('hobby', 'hobbyContainer', 'confirm');


// arrData = [];

// function tagShow() {
//     // var str = str.split(/\s+|\,/g);
//     inputString();
//     render(); //渲染dom
// }

// function inputString() {
//     var input = document.getElementById("input");
//     var textarea = document.getElementById("textarea");
//     var tag = document.getElementById();

//     var str = input.value.trim();

//     var str = isRepetition(str);

//     if (str === "") {
//         input.value = "";
//         return false;
//     }
//     if (arrData.length === 10) {
//         arrData.shift(str);

//         arrData.push(str);
//         render();
//     } else {
//         arrData.push(str);
//     }
//     input.value = "";
// }

// function isRepetition(str) { //去重复
//     for (var i in arrData) {
//         if (arrData[i].indexOf(str) >= 0) {
//             str = "";
//         }
//     }
//     return str;
// }


// function render() {


//     document.getElementById("tag").innerHTML = arrData.map(function(d) {
//         return '<div class = in>' + d + '</div>';
//     }).join("");

//     mouse(); //鼠标悬浮事件！
// }


// // function render(str) {
// //     document.getElementById("tag").innerHTML = arrData.map(function(d) {
// //         if (str != null && str.length > 0) {
// //             d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
// //         }
// //         return '<div>' + d + '</div>';
// //     }).join('');
// // }

// function deleteDom(rm) { //删除dom事件！
//     var index = [].indexOf.call(rm.parentElement.children, rm);
//     arrData.splice(index, 1);
//     render();
// }

// function inputOnkey() {
//     document.getElementById("input").onkeydown = function noNumbers(e) {
//         var e = event || window.event || e.which;
//         if (e && e.keyCode === 13 || e.keyCode === 32) {
//             tagShow();
//         }
//     }
// }

// function mouse() { //悬浮事件
//     var arr = document.getElementsByClassName("in");
//     var text = "";

//     for (var i = 0; i < arr.length; i++) {
//         arr[i].onmouseover = function() {
//             text = this.innerHTML
//             this.innerHTML = "删除:" + this.innerHTML;
//         };
//         arr[i].onmouseout = function() {
//             this.innerHTML = text;
//         };
//     }
// }

// function clickDom(event) {
//     if (event.target && event.target.className === "in") {
//         deleteDom(event.target);
//     }
// }

// function init() {
//     inputOnkey();

//     document.getElementById("tag").addEventListener("click", clickDom);
//     document.getElementById("button").addEventListener("click", tagShow);
//     document.getElementById("tarea").addEventListener("click", clickDom);

// }

// window.onload = init;