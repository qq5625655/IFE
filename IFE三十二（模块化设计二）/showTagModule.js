/*
Created by zxs on 18/01/22
*/

//定义ShowTag构造器
function ShowTag(ipt, box) {
    this.arr = []; //存放数组
    this.box = box; //显示容器
    this.ipt = ipt; //输入框
    this.length = 100; //显示tag的数目
}
ShowTag.prototype = {

    //输入
    add: function () {
        str = this.ipt.value.split(/[ ,，、\n\t]/);
        for (var i = 0; i < str.length; i++) {
            var item = str[i];
            if (item === "") {

            } else {
                this.arr.push(item);
            }
        }
        this.trim();
    },
    //去重
    trim: function () {
        var i = 0;
        var j = 0;
        for (; i < this.arr.length; i++) {
            for (j = i + 1; j < this.length; j++) {
                if (this.arr[i] === this.arr[j]) {
                    this.arr.splice(j, 1);
                    j--;
                }
            }
        }
        while (this.arr.length > this.length) {
            this.arr.shift();
        }
        this.show();
    },
    //显示
    show: function () {
        var text = "";
        for (var index = 0; index < this.arr.length; index++) {
            text += '<div data-num="' + index + '"class = "item"><span>点击删除</span>' + this.arr[index] + '</div>'
        }
        this.box.innerHTML = text;
    },
    //点击删除元素
    deleteEvent: function(e) {
        var item = e.target.className === "item" ? e.target : e.target.parentNode.className === "item" ? e.target.parentNode : null; 
        if (item === null) {
            return 0;
        }
        this.arr.splice(item.getAttribute("data-num"), 1);
        this.show();
    },
    //事件绑定
    init: function () {
        on(this.ipt, "keyup", this.keyUp.bind(this));
        on(this.box, "click", this.deleteEvent.bind(this));
    },
    //输入事件
    keyUp: function (e) {
        if (e.keyCode === 188 || e.keyCode === 32 || e.keyCode === 13) {
            this.add();
            this.ipt.value = "";
        }
    }

}