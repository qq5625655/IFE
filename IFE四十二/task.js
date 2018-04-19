'use strict'
var dateUi = (function () {
    function CreateDate(container, mulit, min, max) {
        this.dom = document.querySelector(container);
        this.mulit = mulit;
        this.min = min;
        this.max = max;
        this.date = new Date();
        this.init();
    }
    //原型方法
    CreateDate.prototype = {
        //创建日历
        init: function () {
            this.addEvent();
        },
        //渲染当前月的表格
        render: function (year, month, day) {
            //inout渲染
            var dateContainer = document.querySelector(".dateContainer");
            dateContainer.innerHTML = '<label for ="dateInput">请用户选择日期</label>' +
                '<input id = "dateInput" type = "text">';
            //日历渲染
            var dateArr = [{
                    name: "sun",
                    text: "日"
                },
                {
                    name: "scope",
                    text: "一"
                },
                {
                    name: "scope",
                    text: "二"
                },
                {
                    name: "scope",
                    text: "三"
                },
                {
                    name: "scope",
                    text: "四"
                },
                {
                    name: "scope",
                    text: "五"
                },
                {
                    name: "sun",
                    text: "六"
                }
            ];
            //创建日历年、月
            this.dom.innerHTML = '<p><a id="prev" herf = "" rel = "prev">&lt;</a>' +
                year + '年' + (month + 1) + '月' +
                '<a id="next" herf = "" rel = "next">&gt;</a></p>';

            //创建日历星期
            var text = '';
            for (var i = 0; i < dateArr.length; i++) {
                text += '<span class = ' + dateArr[i].name + '>' +
                    dateArr[i].text + '</span>';
            }
            //当前月数当容器

            //获取当前月份的最后一天，用当前月份+1 获得后一月，然后再用后一月天数-1即可。
            var lastDay = new Date(year, month + 1, 1 - 1).getDate();

            //获取当前月的第一天为周几
            var fdIsWeek = new Date(year, month, 1).getDay();

            //获取当前上一月的最后一天
            var prevMonthDay = new Date(year, month, 1 - 1).getDate();

            //获取下一月的第一天
            var firstDay = new Date(year, month + 1, 1).getDate();

            fdIsWeek = fdIsWeek === 0 ? 6 : (fdIsWeek - 1);
            //创建当前月的第一天为周几，上一月的末尾
            for (var i = 0; i <= fdIsWeek; i++) {
                text += '<span class = "prevNull">' + (prevMonthDay - fdIsWeek + i) + '</span>';
            }
            //渲染当前月
            for (var i = 1; i <= lastDay; i++) {
                text += '<span class = "nowDay">' + i + '</span>';
            }
            //渲染
            this.dom.innerHTML += text;
            //清空，便于DOM渲染
            text = '';
            //创建下一月的表格
            var spans = document.getElementsByTagName("span");
            for (var i = 1; i < 15; i++) {
                if ((spans.length + i) <= 49) {
                    text += '<span class = "nextNull">' + i + '</span>';
                }
            }
            //创建button按钮
            text += '<div class="btDiv"><button type="button" class = "confirm">确认</button>' +
                '<button type= "button" class = "cancer">取消</button></div>';
            this.dom.innerHTML += text;
        },
        addEvent: function () {
            var year = this.date.getFullYear();
            var month = this.date.getMonth();
            var day = this.date.getDate();

            this.render(year, month, day);

            var next = document.getElementById("next");
            var dateInput = document.querySelector("#dateInput");
            var btDiv = document.querySelector(".btDiv");
            var that = this;
            var domArr = [];
            //Input 监听事件
            this.dom.className = "dateHide";
            dateInput.addEventListener("focus", function () {
                if (that.dom.className === "dateHide") {
                    that.dom.className = "date";
                } else {
                    that.dom.className = "date";
                }
            });
            //日期监听事件
            this.dom.addEventListener("click", function (e) {
                if (e.target.className === "prevNull" || e.target.id === "prev") {
                    that.dom.innerHTML = '';
                    month = month - 1;
                    if (month < 0) {
                        year = year - 1;
                        month = 11;
                    }
                    that.render(year, month, day);
                } else if (e.target.className === "nextNull" || e.target.id === "next") {
                    that.dom.innerHTML = '';
                    month = month + 1;
                    if (month > 11) {
                        year = year + 1;
                        month = 0;
                    }
                    that.render(year, month, day);
                } else {
                    if (e.target.nodeName === "SPAN") {
                        that.getSeleteDate(e.target, domArr);
                    }
                }
            });
            //按钮监听时间
            btDiv.addEventListener("click", function (e) {
                var text = '';
                if (e.target.className === "confirm") {
                    if (domArr.length > 1) {
                        text = year + "年" + month + "月" + domArr[0].innerText + "日";
                        text += "到" + year + "年" + month + "月" + domArr[1].innerText + "日";
                    } else {
                        text = year + "年" + month + "月" + domArr[0].innerText + "日";
                    }
                    alert("您选择的是" + text);
                    dateInput.value = text;
                } else {
                    that.dom.className = "dateHide";
                }
            })
        },
        //获得数据位置
        getSeleteDate: function (e, domArr) {
            var min, max;
            //判断是否为时间段还是为单个日期
            if (this.mulit) {
                //判断时间段的流程
                if (domArr.length < 1) {
                    e.className = "selected";
                    domArr.push(e);
                } else {
                    if (domArr[1]) {
                        min = parseInt(domArr[1].innerText);
                    } else {
                        min = parseInt(domArr[0].innerText);
                    }
                    max = parseInt(e.innerText);
                    var dayNum = Math.abs(min - max);
                    if (dayNum < this.min || dayNum > this.max) {
                        alert("时间不在范围内!");
                    } else {
                        e.className = "selected";
                        domArr.push(e);
                    }
                }
                if (domArr.length > 2) {
                    domArr[0].className = "nowDay";
                    domArr.shift();
                }
            } else {
                //判断单个时间的流程
                if (domArr.length === 1) {
                    domArr[0].className = "nowDay";
                    domArr.pop();
                }
                e.className = "selected";
                domArr.push(e);
            }
            this.renderSelected(domArr);
            // return domArr;
        },
        //渲染点击的DOM。
        renderSelected: function (domArr) {
            var minDate = 0;
            var maxDate = 0;
            //总结call的方法用法;
            var spans = document.getElementsByTagName("span");
            //清空之前的渲染
            for (var i = 0; i < spans.length; i++) {
                if (spans[i].className === "selectedDay") {
                    spans[i].className = "nowDay";
                }
            }
            minDate = [].indexOf.call(spans, domArr[0]);
            maxDate = [].indexOf.call(spans, domArr[1]);

            //判断dom节点谁大谁小，并且交换。
            if (minDate > maxDate && maxDate !== -1) {
                var t = minDate;
                minDate = maxDate;
                maxDate = t;
                domArr = [];
                domArr.push(spans[minDate]);
                domArr.push(spans[maxDate]);
            }
            //不渲染选择dom节点自身
            minDate = minDate + 1;
            //渲染所选中dom节点之间的元素;
            for (var i = minDate; i < maxDate; i++) {
                spans[i].className = "selectedDay";
            }
        },
        value: function () {
            var date = dateInput.value;
            return date;
        }
    }
    return CreateDate;

})();
var date = new dateUi(".date", true, 3, 10);