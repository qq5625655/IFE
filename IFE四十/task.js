var dateUi = (function () {
    function CreateDate(dom) {
        this.dom = document.querySelector(dom);
        this.date = new Date();
        this.init();
    }
    CreateDate.prototype = {
        //创建日历
        init: function () {
            var year = this.date.getFullYear();
            var month = this.date.getMonth();
            var day = this.date.getDate();
            this.render(year, month, day);
            this.addEvent(year, month, day);
        },
        //渲染当前月的表格
        render: function (year, month, day) {
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
                text += '<span class = "prevNull">' + (prevMonthDay - i) + '</span>';
            }
            //渲染当前月
            for (var i = 1; i <= lastDay; i++) {
                if (i === day) {
                    text += '<span class = "selected">' + i + '</span>';
                } else {
                    text += '<span class = "nowDay">' + i + '</span>';
                }
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
            this.dom.innerHTML += text;
        },
        //点击事件
        addEvent: function (year, month, day) {
            var prev = document.getElementById("prev");
            var next = document.getElementById("next");
            var that = this;
            this.dom.addEventListener("click", prevMonth);

            function prevMonth(e) {
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
                }
            }         
        }
    }
    return CreateDate;
}());
new dateUi(".date");