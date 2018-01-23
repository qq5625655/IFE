//数据产生
function DataProduct(box) {
    this.box = box;
    this.id = 0;
}
DataProduct.prototype = {
    init: function () {
        this.addEvent();
    },
    addEvent: function () {
        //事件代理，根据类型选中相应表单
        on($('#formCreate'), 'change', this.showTable.bind(this));
        on(this.box.styleBox.box, "change", this.setStyle.bind(this));
    },
    showTable: function (e) {
        if (e.target.getAttribute('type') === 'radio') {
            e.target.parentNode.className = e.target.id;
            if (!/necessary/.test(e.target.id)) { //是否匹配
                this.box.labelBox.box.value = e.target.nextElementSibling.textContent;
            }
        }
    },
    getText: function (dataBox) {
        return dataBox.box[dataBox.value];
    },
    getData: function () {
        var data = {
            label: "", //标签类型
            type: "", //表单类型
            necessary: true, //是否必需
            inputType: "", //input类型
            minLength: 0, //text的最小长度
            maxLength: 0, //text的最大长度
            defaultText: "", //获取焦点的默认提示文本
            successText: "", //输入文本正确时，获得提示
            failText: [], //验证错误时提示
            item: [], //radio的选项
            id: 0, //表单的id
            validator: function () {} //表单的验证函数

        };
        //配置表单必需数据
        data = this.getBaseData(data);
        //根据type选择对应数据
        switch (data.type) {
            case "textarea":
                data = this.getTextRelativeData(data);
                break;
            case "input":
                switch (data.inputType) {
                    case "text":
                    case "password":
                        data = this.getTextRelativeData(data);
                        break;
                    case "number":
                    case "email":
                    case "phone":
                        data = this.getInputRelativeData(data);
                        break;
                }
                break;
            case "radio":
            case "checked":
            case "select":
            data = this.getSpecialInputRelativeData(data);

        }
        return data;
    },
    //格式变化
    setStyle: function() {
        var text = this.getText(this.box.styleBox);
        this.box.resultBox.className = text === "样式一" ? "style1" : "style2";
    },
    //添加表单
    addForm: function (data) {
        switch (data.type) {
            case "input":
                this.addInputForm(data);
                break;
            case "radio":
                this.addRadioForm(data);
                break;
            case "checked":
                this.addCheckBoxForm(data);
                break;
            case "select":
                this.addSelectForm(data);
                break;
        }
    },
    //配置基本数据
    getBaseData: function (data) {
        data.label = this.getText(this.box.labelBox);
        data.type = this.getText(this.box.typeBox);
        data.inputType = this.getText(this.box.inputTypeBox);
        data.necessary = this.getText(this.box.necessaryBox) === "necessary";
        data.id = "form" + this.id++;
        return data;
    },
    //配置text，password和textarea的信息
    getTextRelativeData: function (data) {
        data.minLength = this.getText(this.box.minLengthBox);
        data.maxLength = this.getText(this.box.maxLengthBox);
        data.failText = [
            data.label + "不能为空",
            data.label + "不能小于" + data.minLength + '个字符',
            data.label + "不能大于" + data.maxLength + '个字符'
        ];
        data.successText = data.label + "格式正确";
        data.defaultText = (data.necessary ? "必填" : "选填") + ',长度为' + data.minLength + '-' + data.maxLength;
        data.validator = validator.lengthControl;
        return data;
    },
    //配置input中的number，email， phone的信息;
    getInputRelativeData: function (data) {
        data.inputType = this.getText(this.box.inputTypeBox);
        data.failText = [
            data.label + "不能为空",
            data.label + "格式不正确"
        ];
        //格式正确
        data.successText = data.label + '格式正确';
        data.defaultText = (data.necessary ? "必填" : "选填") + ',请输入您的' + data.label;
        data.validator = validator[data.inputType];
        return data;
    },
    //配置radio select checkbox的信息
    getSpecialInputRelativeData: function (data) {
        var items = this.box.itemBox[2];
        data.item = [];
        for (var i = 0; i < items.length; i++) {
            data.item.push(items[i].childNodes[1].data);
        }
        if (data.item.length === 0) {
            alert("你还没有添加" + data.label + "的选项");
            data = null;
        } else if (data.item.length === 1) {
            alert("你只添加了一个选项，无法创建" + data.label);
            data = null;
        } else {
            data.defaultText = (data.necessary ? "必填" : "选填") + ",请选择您的" + data.label;
            data.failText = [data.label + "未选择"];
            data.successText = data.label + '已选择';
            data.validator = validator[data.type];
            return data;
        }
    },
    //添加input表单
    addInputForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = '<label>' + data.label + '</label><input type ="' + data.inputType + '"id = "' + data.id + '"><span></span>';
        this.box.resultBox.insertBefore(box, this.box.sumitForm);
    },
    //添加textarea表单
    addTextAreaForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = '<label>' + data.label + '</label><textarea id = "' + data.id + '"></textarea>';
        this.box.resultBox.insertBefore(box, this.box.sumitForm);
    },
    //添加radio单选框
    addRadioForm: function (data) {
        var box = document.createElement("div"),
            text = "";
        box.className = "radioBox";
        text += '<div id="' + data.id + '"><label class="formNameLabel">' + data.label + '</label>';
        for (var i = 0; i < data.item.length; i++) {
            var id = data.id + '' + i;
            text += '<input type = "radio" id="' + id + '" name ="' + data.id + '"><label for="' + id + '">' + data.item[i] + '</label>';
        }
        text += '</div><span></span>';
        box.innerHTML = text;
        this.box.resultBox.insertBefore(box, this.box.sumitForm);
    },
    //添加check复选框
    addCheckBoxForm: function (data) {
        var box = document.createElement('div'),
            text = '';
        box.className = 'radioBox';
        text += '<div id="' + data.id + '"><label class="formNameLabel" >' + data.label + '</label>';
        for (var i = 0; i < data.item.length; i++) {
            var id = data.id + '' + i;
            text += '<input type="checkbox" id="' + id + '" name="' + data.id + '"><label for="' + id + '">' + data.item[i] + '</label>';
        }
        text += '</div><span></span>';
        box.innerHTML = text;
        this.box.resultBox.insertBefore(box, this.box.sumitForm);
    },
    //添加选择框
    addSelectForm: function (data) {
        var box = document.createElement('div'),
            text = '';
        text += '<label>' + data.lable + '</label><select id="' + data.id + '">';
        for (var i = 0; i < data.item.length; i++) {
            text += '<option>' + data.item[i] + '</option>'
        }
        text += '</select><span></span>';
        box.innerHTML = text;
        this.box.resultBox.insertBefore(box, this.box.sumitForm);
    }

};