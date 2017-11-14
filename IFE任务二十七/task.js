var craft = document.getElementById("craft-1");
var Space_Ships = []; //星空飞船
var Space_Num = 4;
var inputs = document.getElementsByTagName("input");

var powerType = [];
var enegryType = [];





//输出日志
var loger = {
    log: function(text) {
        if (this.ele == undefined) {
            this.ele = document.getElementById("list");
        }

        var div = document.createElement("div");
        var text2 = document.createTextNode(text);
        if (text.indexOf("丢包！") !== -1) {
            div.style.color = "red";
        } else if (text.indexOf("成功") !== -1) {
            div.style.color = "green";
        }
        div.appendChild(text2);
        this.ele.appendChild(div);

        this.ele.scrollTop = this.ele.scrollHeight;

    }

}

//丢包率
var Mediator = {
    errorRate: 0.1,
    broadcast: function(cmd) {
        if (Math.random() <= this.errorRate) {

            loger.log("Mediator:传送命令发生错误，丢包！");
            Mediator.broadcast(cmd);
            return;
        }
        setTimeout(function() {
            disassembly.binaryId(cmd);
            disassembly.binaryCmd(cmd);
            loger.log("Mediator:发送成功，让编号为" + cmd.shipId + "飞船" + cmd.cmd);
            //广播命令
            var tempShips = [];

            for (var i = 0; i < Space_Ships.length; i++) {
                tempShips.push(Space_Ships[i]);
            }
            //因为销毁飞船会删除 SPACE_SHIPS 中的元素, 遍历的时候要用另外一个列表
            for (var i = 0; i < tempShips.length; i++) {
                tempShips[i].onCmdReceive(cmd);

            }
        }, 300);
        return;
    }
}

//飞船命令、编号二进制表示
var adapter = {
        binaryId: function(cmd) {
            switch (cmd.shipId) {
                case 0:
                    cmd.shipId = "0000";
                    adapter.binaryCmd(cmd);
                    break;
                case 1:
                    cmd.shipId = "0001";
                    adapter.binaryCmd(cmd);
                    break;
                case 2:
                    cmd.shipId = "0010";
                    adapter.binaryCmd(cmd);
                    break;
                case 3:
                    cmd.shipId = "0011";
                    adapter.binaryCmd(cmd);
                    break;
            }
        },
        binaryCmd: function(cmd) {
            switch (cmd.cmd) {
                case "fly":
                    cmd.cmd = "0001";
                    break;
                case "stop":
                    cmd.cmd = "0010";
                    break;
                case "dispose":
                    cmd.cmd = "1100";
                    break;
            }
        }

    }
    //飞船编号、命令反汇编表示
var disassembly = {
    binaryId: function(cmd) {
        cmd.shipId = parseInt(cmd.shipId, 2);
    },
    binaryCmd: function(cmd) {
        switch (cmd.cmd) {
            case "0001":
                cmd.cmd = "fly";
                break;
            case "0010":
                cmd.cmd = "stop";
                break;
            case "1100":
                cmd.cmd = "dispose";
                break;
        }
    }
}

//判断飞船是否存在！
var exist = {
        shipTF: function(ship, that) {
            if (ship.children.length >= 1) {
                return;
            }
            ship.appendChild(that.ele);
            Space_Ships.push(that);
        }
    }
    // 命令
var Command = function(shipId, cmd) {
        this.shipId = shipId;
        this.cmd = cmd;
    }
    //宇宙飞船
    //编号，速度，能量消耗，能量增加
var SpaceShip = function(id, speed, consumeEnergy, addEnergy) {
    this.id = id;
    this.state = 'static';
    this.Ship_Energy = 100;
    this.speed = speed;
    this.number = 0;
    this.consumeEnergy = consumeEnergy;
    this.addEnergy = addEnergy;
}

//飞船创建
SpaceShip.prototype.launch = function() {
        that = this; //获取当前飞船的指针。

        this.ele = document.createElement("div");
        this.enegry = document.createElement("div");
        this.enegryText = document.createElement("span");
        var oneHundred = document.createTextNode("100%");

        this.ele.setAttribute("class", "craft-inner");
        this.enegry.setAttribute("class", "enegry");
        this.enegryText.setAttribute("class", "enegry-text");



        this.ele.appendChild(this.enegry);
        this.enegryText.appendChild(oneHundred);
        this.ele.appendChild(this.enegryText);

        this.deg = 0;
        this.ele.style.transform = "rotate(" + this.deg + "deg)";

        switch (this.id) {
            case 0:
                var orbite1 = document.getElementById("craft-1");
                exist.shipTF(orbite1, that);
                break;
            case 1:
                var orbite2 = document.getElementById("craft-2");
                exist.shipTF(orbite2, that);
                break;
            case 2:
                var orbite3 = document.getElementById("craft-3");
                exist.shipTF(orbite3, that);
                break;
            case 3:
                var orbite4 = document.getElementById("craft-4");
                exist.shipTF(orbite4, that);
                break;
        }

    }
    //飞船命令监听
SpaceShip.prototype.onCmdReceive = function(cmd) {
        if (this.id === cmd.shipId && this[cmd.cmd]) {
            this[cmd.cmd](ship); //执行当前原型的方法！
        }
    }
    //飞船属性改变
SpaceShip.prototype.fly = function(ship) {
        this.state = "fly";

    }
    //飞船起飞
SpaceShip.prototype.onDraw = function() {

    if (this.state === "fly") {
        this.ele.parentNode.style.transform = "rotate(" + this.deg + "deg)";
        this.deg += this.speed; //飞船速度

        //对飞船能量进行计数
        if (this.number === 10) {
            if (this.Ship_Energy < this.consumeEnergy) {
                this.state = "static";
                return;
            }
            var enegry = this.consumeEnergy - this.addEnergy;
            this.Ship_Energy -= enegry;
            this.enegryText.innerHTML = this.Ship_Energy + "%";
            this.enegry.style.height = this.Ship_Energy + "%";
            this.number = 0;
        }
        this.number++; //计数
    }

    if (this.Ship_Energy < 50 && this.Ship_Energy > 0) {
        this.enegry.style.background = "#c83b38";
    } else if (this.Ship_Energy > 50) {
        this.enegry.style.background = "#2fa06c";
    } else if (this.Ship_Energy <= 0) {
        this.state = "static";
    }
    if (this.state === "static" && this.Ship_Energy < 100) {
        if (this.number === 10) {
            this.Ship_Energy += this.addEnergy;
            this.enegryText.innerText = this.Ship_Energy + "%";
            this.enegry.style.height = this.Ship_Energy + "%";
            this.number = 0;
            if (this.Ship_Energy > 100) {
                this.enegryText.innerText = 100 + "%";
            }
        }
        this.number++;
    }


}

//飞船停止
SpaceShip.prototype.stop = function() {
    this.state = "static";

}

//飞船销毁
SpaceShip.prototype.dispose = function() {
    for (var i = 0; i < Space_Ships.length; i++) {
        if (this.id === Space_Ships[i].id) {
            this.ele.parentElement.removeChild(this.ele);
            Space_Ships.splice(i, 1);
            break;
        }
    }
}

//获取飞船的航速与能量补充速度
var getElement = {
    init: function() {
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].name === "powerType") {
                powerType.push(inputs[i]);
            } else if (inputs[i].name === "energyType") {
                enegryType.push(inputs[i]);
            }
        }
    },
    speed: function() {
        for (var i = 0; i < powerType.length; i++) {
            if (powerType[i].checked === true) {
                return parseInt(powerType[i].value);
            }
        }
    },
    addEnergy: function() {
        for (var i = 0; i < enegryType.length; i++) {
            if (enegryType[i].checked === true) {
                return parseInt(enegryType[i].value);
            }
        }
    },
    consumeEnergy: function(speed) {
        switch (speed) {
            case 2:
                return 5;
            case 3:
                return 7;
            case 4:
                return 9;
            case 5:
                return 10;
            case 6:
                return 12;
            case 7:
                return 14;
        }
    }
}


//指挥官
var Commander = {
    init: function() {
        this.space = [];
        for (var i = 0; i < Space_Num; i++) {
            this.space[i] = undefined;
        }
    },
    getId: function() {
        for (var i = 0; i < this.space.length; i++) {
            if (this.space[i] == undefined) {
                return i;
            }
        }
        return null;
    },
    //发射飞船
    launch: function() {
        getElement.init();
        var spaceId = this.getId();
        if (spaceId === null) {
            loger.log("指挥官，没有可用的飞船编号，无法起飞。");
        } else {
            var speed = getElement.speed();
            var consumeEnergy = getElement.consumeEnergy(speed);
            var addEnergy = getElement.addEnergy();
            ship = new SpaceShip(spaceId, speed, consumeEnergy, addEnergy);
            ship.launch();
            this.space[spaceId] = spaceId;
            loger.log("指挥官，发射编号为" + ship.id + "飞船起飞！");
            var ele = document.getElementById("ship-buttons");

            var control = document.createElement("div"); //控制按钮
            control.innerHTML = '<div id = "control-' + ship.id + '">' +
                '<label>' + ship.id + '号飞船下达命令：</label>' +
                '<input onclick = "Commander.fly(' + ship.id + ')" type = "button" value = "开始飞行">' +
                '<input onclick = "Commander.stop(' + ship.id + ')" type = "button" value = "停止飞行">' +
                '<input onclick = "Commander.dispose(' + ship.id + ')" type = "button" value = "销毁">' +
                '</div>'
            ele.appendChild(control);

        }
    },
    fly: function(spaceId) {
        var cmd = new Command(spaceId, "fly");
        loger.log("指挥官：发送命令，叫编号为：" + spaceId + "号的飞船起飞！");
        adapter.binaryId(cmd);

        Mediator.broadcast(cmd);

    },
    stop: function(spaceId) {
        var cmd = new Command(spaceId, "stop");
        loger.log("指挥官：发送命令，叫编号为：" + spaceId + "号的飞船停止！");
        adapter.binaryId(cmd);
        Mediator.broadcast(cmd);
    },
    dispose: function(spaceId) {
        var cmd = new Command(spaceId, "dispose");
        this.space[spaceId] = undefined;
        loger.log("指挥官：发送命令，叫编号为：" + spaceId + "号的飞船销毁！");
        var ele = ele = document.getElementById('control-' + spaceId);
        adapter.binaryId(cmd);
        Mediator.broadcast(cmd);
        ele.parentElement.removeChild(ele);




    }
}
var Animation = {
    start: function() {
        setInterval(function() {
            Animation.onDraw();
        }, 100)
    },
    onDraw: function() {
        for (var i = 0; i < Space_Ships.length; i++) {
            Space_Ships[i].onDraw();
        }
    }
}
Commander.init();
Commander.launch(0);
Commander.fly(0);
Animation.start();