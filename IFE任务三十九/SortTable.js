var CreateTable = (function () {
    //创建构造函数
    function Table(TableDiv, TableTitle, TableData) {
        this.TableDiv = document.querySelector(TableDiv);
        this.TableTitle = TableTitle;
        this.TableData = TableData;
        this.array = [];
        this.init();

    }
    //原型方法
    Table.prototype = {
        init: function () {
            this.sort("sum", false);
            this.Create(this.array);
            this.addEvent();
            this.fixed();
        },
        sort: function (sortName, sortord) {
            this.array = [];
            var that = this;
            //需要排序的数据
            var arraySort = [];
            var dataName = Object.keys(TableData);
            for (var i = 0; i < dataName.length; i++) {
                arraySort.push([dataName[i], TableData[dataName[i]][sortName]]);
            }
            if (sortord) {
                arraySort.sort(function (a, b) {
                    return a[1] - b[1];
                });
            } else {
                arraySort.sort(function (a, b) {
                    return b[1] - a[1];
                });
            }
            arraySort.forEach(function (x) {
                that.array.push(x[0]);
            });
            this.Create(this.array);
        },
        Create: function (dataName) {
            var dataTitle = [];
            //建立表头
            var td = '<table><thead ><tr class = "tableHead">';
            for (var i = 0; len = this.TableTitle.length, i < len; i++) {
                if (this.TableTitle[i].sort === true) {
                    td += '<th>' + this.TableTitle[i].label +
                        '<button class = up name =' + this.TableTitle[i].name + '></button>' +
                        '<button class = down name = ' + this.TableTitle[i].name + '></button>' + '</th>';
                    dataTitle.push(TableTitle[i].name);
                } else {
                    td += '<th>' + this.TableTitle[i].label + '</th>';
                }
            }
            //建立表格
            td += '</tr></thead>';
            for (var i = 0; i < dataName.length; i++) {
                td += '<tr>' + '<td>' + dataName[i] + '</td>';
                for (var j = 0; j < dataTitle.length; j++) {
                    td += '<td>' + TableData[dataName[i]][dataTitle[j]] + '</td>';
                }
                td += '</tr>';
            }
            td += "</table>";
            this.TableDiv.innerHTML = td;
            // this.addEvent();
        },
        //监听事件
        addEvent: function () {
            var that = this;
            this.TableDiv.addEventListener("click", function (e) {
                if (e.target.nodeName !== "BUTTON") {
                    return;
                } else if (e.target.className === "up") {
                    that.sort(e.target.name, true);
                } else {
                    that.sort(e.target.name, false);
                }
            });
        },
        //冻结表头
        fixed: function () {
            var thead = document.getElementsByClassName("tableHead")[0];
            var tbody = document.getElementsByTagName("tbody")[0];
            

            var theadHeight = tbody.scrollHeight + tbody.offsetTop;
            window.onscroll = function () {
                var htmlHeight = document.documentElement.scrollTop;
                if (htmlHeight > theadHeight ) {
                    thead.className = "tableHeadStatic";

                } else {
                    thead.className = "tableHead";
                }
            }

        }
    }
    //返回类
    return Table;
}());