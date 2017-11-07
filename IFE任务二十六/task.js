var craft = document.getElementById("craft-1");
var Space_Ships = []; //星空飞船
var Space_Num = 4;
var Ship_Energy = 100;
var button = document.getElementById("button");
var speed = 10;


window.onload = function() {
        // var angel = 0;
        // if (angel < 360) {
        //     setInterval(function() {
        //         angel = angel + 1.5;
        //         craft.style.transform = "rotate(" + angel + "deg)";

        //     }, 100);
        // }
        // button.addEventListener("click", Commander.launch());




    }
    //输出日志
var loger = {
    log: function(text) {
        if (this.ele == undefined) {
            this.ele = document.getElementById("logs");

        }
        this.ele.value += text + "\n";

        this.ele.scrollTop = this.ele.scrollHeight;

    }

}

//丢包率
var Mediator = {
        errorRate: 0.3,
        broadcast: function(cmd) {
            if (Math.random() <= this.errorRate) {
                loger.log("Mediator:传送命令发生错误，丢包！");
                return;
            }
            setTimeout(function() {
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
            }, 1000);

        }

    }
    // 命令
var Command = function(shipId, cmd) {
        this.shipId = shipId;
        this.cmd = cmd;
    }
    //宇宙飞船
var SpaceShip = function(id, speed) {
    this.id = id;
    this.state = 'static';
    this.Ship_Energy = 100;
    this.speed = speed;
}

//飞船起飞
SpaceShip.prototype.launch = function() {
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
                orbite1.appendChild(this.ele);
                Space_Ships.push(this);
                break;
            case 1:
                var orbite2 = document.getElementById("craft-2");
                orbite2.appendChild(this.ele);
                Space_Ships.push(this);
                break;
            case 2:
                var orbite3 = document.getElementById("craft-3");
                orbite3.appendChild(this.ele);
                Space_Ships.push(this);
                break;
            case 3:
                var orbite4 = document.getElementById("craft-4");
                orbite4.appendChild(this.ele);
                Space_Ships.push(this);
                break;
        }

    }
    //飞船命令监听
SpaceShip.prototype.onCmdReceive = function(cmd) {
        if (this.id === cmd.shipId && this[cmd.cmd]) {
            this[cmd.cmd](); //执行当前原型的方法！
        }
    }
    //飞船属性改变
SpaceShip.prototype.fly = function() {
        this.state = "fly";
    }
    //飞船起飞
SpaceShip.prototype.onDraw = function() {
    if (this.state === "fly") {

        this.ele.parentNode.style.transform = "rotate(" + this.deg + "deg)";
        this.deg += 3;
        this.num = parseInt(this.enegryText.innerText);
        this.num -= 1;
        this.enegryText.innerText = this.num + "%";
        this.enegry.style.height = this.num + "%";


    }
    if (this.num < 50 && this.num > 0) {
        this.enegry.style.background = "#c83b38";
    } else if (this.num > 50) {
        this.enegry.style.background = "#2fa06c";
    } else if (this.num === 0) {
        this.state = "static";
    }
    if (this.state === "static" && this.num < 100) {
        this.num += 1;
        this.enegryText.innerText = this.num + "%";
        this.enegry.style.height = this.num + "%";
    }
    // if (this.state === false) {
    //     this.state = "static";
    // }

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
    },
    //发射飞船
    launch: function() {
        var spaceId = this.getId();
        if (this.nodeName === "INPUT") {
            // this = Commander;
        }
        if (spaceId === null) {
            loger.log("指挥官，没有可用的飞船编号，无法起飞。");
        } else {
            ship = new SpaceShip(spaceId, speed);
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
        Mediator.broadcast(cmd);
    },
    stop: function(spaceId) {
        var cmd = new Command(spaceId, "stop");
        loger.log("指挥官：发送命令，叫编号为：" + spaceId + "号的飞船停止！");
        Mediator.broadcast(cmd);
    },
    dispose: function(spaceId) {
        var cmd = new Command(spaceId, "dispose");
        this.space[spaceId] = undefined;
        loger.log("指挥官：发送命令，叫编号为：" + spaceId + "号的飞船销毁！");
        Mediator.broadcast(cmd);
        var ele = document.getElementById('control-' + spaceId);
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