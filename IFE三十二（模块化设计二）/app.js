//存放需要的ID节点
var dataBox = {
    typeBox: {
        box: $('#typeBox'), //标签名（input radio checkbox select textarea）
        value: 'className' //获取方式
    },
    labelBox: {
        box: $('#labelBox'), //label名称（姓名等）
        value: 'value'
    },
    necessaryBox: {
        box: $("#basicBox"),
        value: "className"
    },
    inputTypeBox: { //input规则类型（如文本、数字、电话号码等）
        box: $('#ruleInput'),
        value: 'className'
    },
    itemBox: [ //showTag的参数
        $("#boxItemInput"), //inputNode
        $("#boxItemShow"), //展示选项的容器
        document.getElementsByClassName("item")
        //选项的Node节点，可以获取选项
    ],

    styleBox: {
        box: $("#selectBox"), //展示的方式
        value: "value"
    },
    minLengthBox: {
        box: $("#minLength"),
        value: "value"
    },
    maxLengthBox: { //长度规则
        box: $("#maxLength"),
        value: "value"
    },
    btnAdd: $("#btnAdd"), //添加按钮
    resultBox: $("#result"), //表单展示区
    sumitForm: $("#submitForm") //提交表单按钮

};
//存放各个类型的validator函数
var validator = {
    //text password textarea
    lengthControl: function () {
        minlength = this.data.minLength;
        maxlength = this.data.maxLength;
        var text = this.ipt.value;
        if (text === "") {
            if (this.data.necessary) {
                this.errorTip(0);
            } else {
                this.default_tip();
                return true;
            }
        } else {
            var str = text.replace(new RegExp('[^\x00-\xff]', 'g'), 'gg').length;
            if (str < minlength) {
                this.errorTip(1);
            } else if (str > maxlength) {
                this.errorTip(2);
            } else {
                this.trueTip();
                return true;
            }

        }
        return false;
    },
    number: function () {
        var text = this.ipt.value;
        if (text === "") {
            if (this.data.necessary) {
                this.errorTip(0);
            } else {
                this.default_tip();
                return true;
            }
        } else {
            if (/^\d*$/.test(text)) {
                this.trueTip();
            } else {
                this.errorTip(1);
            }
        }
        return false
    },
    email: function () {
        var text = this.ipt.value;
        if (text === "") {
            if (this.data.necessary) {
                this.errorTip(0);
            } else {
                this.default_tip();
                return true;
            }
        } else {
            if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9])+$/.test(text)) {
                this.trueTip();
                return true;
            } else {
                this.errorTip(1);
            }
        }
        return false;
    },
    phone: function () {
        var text = this.ipt.value;
        if (text === "") {
            if (this.data.necessary) {
                this.errorTip(0);
            } else {
                tbis.default_tip();
                return true;
            }
        } else {
            if (/^\d{11}$/.test(text)) {
                this.trueTip();
            } else {
                this.errorTip(1);
            }
        }
        return false;
    },
    radio: function() {
       var item = $("#" + this.data.id).getElementsByTagName("input");
        for (var i = 0; i < item.length; i++) {
            if (item[i].checked) {
                this.trueTip();
                return true;
            }
        }
        if (this.data.necessary) {
            this.errorTip(0);
        }else {
            this.default_tip();
            return true;
        }
        return false;
    },
    checked: function() {
        var children = this.ipt.children;
        for (var i in children) {
            if (children[i].checked) {
                this.trueTip();
                return true;
            }
        }
        if (this.data.necessary) {
            this.errorTip(0);
        } else {
            this.default_tip();
            return true;
        }
        return false;
    },
    select: function() {
        this.trueTip();
        return true;
    }

}
var dataProduct = new DataProduct(dataBox),
    showTag = new ShowTag(dataBox.itemBox[0], dataBox.itemBox[1]),
    formArr = [];

dataProduct.init();
showTag.init();
on(dataProduct.box.btnAdd, "click", function () {
    var data = dataProduct.getData();
    if (data !== null) {

        //在form中添加相应的表单
        dataProduct.addForm(data);
        formArr.push(new Form(data));
        if (data.type == 'radio' || data.type == 'checked') {
            formArr[formArr.length - 1].default_tip();
        }
    }

});
on(dataBox.sumitForm, "click", function() {
    var text = "";
    for (var i = 0; i < formArr.length; i++){
        text += !formArr[i].validator() ? formArr[i].tip.textContent + '\n' : '';
    }
    text == "" ? alert("提交成功") : alert(text);
})

function $(elem) {
    return document.querySelector(elem);
}
//浏览器兼容事件
function on(elem, type, func) {
    if (elem.addEventListener) {
        elem.addEventListener(type, func);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, func);
    } else {
        elem['on' + type] = func;
    }
}