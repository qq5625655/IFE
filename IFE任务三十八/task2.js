(function () {
    // "user strict";
    window.createTable = function (id, tableTitle, tableData) {
        var table = {
            tableNode: document.querySelector(id),
            tableTitle: tableTitle,
            tableData: tableData,
            tableOrder: [],

            //==============控制流程=============
            init: function () {
                this.sort(this.tableData, "sum", false);
                this.create(this.tableNode, this.tableTitle, this.tableData, this.tableOrder);
                this.addEvent(this.tableNode, this.tableOrder);
            },

            //==============排序方法=============

            //依次排序顺序为所需要的数据，排序方式，排序顺序
            sort: function (tableData, sortBy, up) {
                var that = this;
                var unArrSort = [];
                var arrDataName = Object.keys(tableData);

                for (let i = 0; i < arrDataName.length; i++) {
                    //获取数据，依次为当前数据的名称，当前需要排序的方式
                    unArrSort.push([arrDataName[i], tableData[arrDataName[i]][sortBy]]);
                }
                if (up) {
                    unArrSort.sort(function (a, b) {
                        return a[1] - b[1];
                    });
                } else {
                    unArrSort.sort(function (a, b) {
                        return b[1] - a[1];
                    });
                };
                unArrSort.forEach(function (x) {
                    that.tableOrder.push(x[0]);
                });
            },
            //创建表单
            //表单传入对象依次为DOM节点、表单标题、表单数据、表单排序后的数据
            create: function (tableNode, tableTitle, tableData, tableOrder) {
                this.tableOrder = [];
                var item = "<table class = 'table'><tr>";
                var classOrder = [];
                for (var i = 0; i < tableTitle.length; i++) {
                    if (tableTitle[i].sort === true) {
                        item += "<th>" + tableTitle[i].label +
                            '<button type = button class = sortUp name = "' + tableTitle[i].name + '" button>' +
                            '<button type = button class = sortDown name = "' + tableTitle[i].name + '" button>';
                    } else {
                        item += "<th>" + tableTitle[i].label + "</th>";
                    }
                    classOrder.push(tableTitle[i].name);
                }
                item += "</tr>"

                //创建表单值
                for (var i = 0; i < tableOrder.length; i++) {
                    for (var j = 0; j < classOrder.length; j++) {
                        item += "<td>" + tableData[tableOrder[i]][classOrder[j]] + "</td>";
                    }
                    item += "</tr>";
                }
                item += "</tr>"
                tableNode.innerHTML = item;
            },
            addEvent: function (tableNode, tableOrder) {
                var that = this;
                tableNode.addEventListener("click", function (e) {
                    if (e.target.nodeName !== "BUTTON") {
                        return;
                    }
                    if (e.target.className === "sortUp") {
                        that.sort(tableData, e.target.name, true);
                    } else {
                        that.sort(tableData, e.target.name, false);
                    }
                    that.create(that.tableNode, that.tableTitle, that.tableData, that.tableOrder);
                })
            }
        };
        table.init();
    };

})();