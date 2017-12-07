//浏览器兼容事件
function addEvent(elem, type, func) { //主流浏览器
    if (elem.addEventListener) {
        elem.addEventListener(type, func); //IE8
    } else if (elem.attachEvent) {
        elem.attachEvent("on" + type, func);
    } else {
        elem["on" + type] = func; //上面都不兼容
    }
}

function $(id) {
    return document.getElementById(id);
}


var check = (function() {
    var nameArr = ["名字不能为空", "名字格式不对", "名字格式正确"];
    var passwordArr = ["密码不能为空", "密码格式不正确", "密码正确"];
    var passwordAginArr = ["两次输入密码不一致", "密码正确"];
    var emailArr = ["邮箱不能为空", "邮箱格式不正确", "邮箱格式正确"];
    var phoneArr = ["手机不能为空", "手机格式不正确", "手机格式正确"];
    var passwordRight = false;
    return {
        checkname: function(arr) {
            var str = arr.trim();
            if (str === "") {
                return {
                    text: nameArr[0],
                    boolean: false
                };
            }
            var str = str.replace(new RegExp('[^\x00-\xff]', 'g'), 'aa').length;
            if (str >= 4 && str <= 16) {
                return {
                    text: nameArr[2],
                    boolean: true

                };
            } else {
                return {
                    text: nameArr[1],
                    boolean: false
                }
            }
        },
        checkpassword: function(arr) {
            var str = arr.trim();
            if (str === "") {
                return {
                    text: passwordArr[0],
                    boolean: false
                }
            }
            var reg = new RegExp(/^[a-zA-Z0-9]{6,13}$/);
            if (str.match(reg)) {
                passwordRight = true;
                return {
                    text: passwordArr[2],
                    boolean: true
                }
            } else {
                return {
                    text: passwordArr[1],
                    boolean: false
                }
            }
        },
        chekpasswordAgain: function(arr) {
            if (passwordRight) {
                if (arr === password.value) {
                    return {
                        text: passwordAginArr[1],
                        boolean: true
                    }
                } else {
                    return {
                        text: passwordAginArr[0],
                        boolean: false
                    }
                }
            } else {
                return {
                    text: passwordAginArr[0],
                    boolean: false
                }
            }
        },
        checkEmail: function(arr) {
            if (arr === "") {
                return {
                    text: emailArr[0],
                    boolean: false
                }
            }
            var reg = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/);
            if (arr.match(reg)) {
                return {
                    text: emailArr[2],
                    boolean: true
                }
            } else {
                return {
                    text: emailArr[1],
                    boolean: false
                }
            }
        },
        checkPhone: function(arr) {
            if (arr === "") {
                return {
                    text: phoneArr[0],
                    boolean: false
                }
            }
            var reg = new RegExp(/^\d{11}$/);
            if (arr.match(reg)) {
                return {
                    text: phoneArr[2],
                    boolean: true
                }
            } else {
                return {
                    text: phoneArr[1],
                    boolean: false
                }
            }
        }
    }
})();

function FormList(name, type, func, rules, success) {
    this.label = name;
    this.type = type;
    this.func = func;
    this.rules = rules;
    this.success = success;
}

var nameInput = new FormList("name", "text", check.checkname, "请输入4~18个字符，只允许输入中文、英文、字母和数字，中文占2个字符。", "名称可用");
var passwordInput = new FormList("password", "password", check.checkpassword, "请输入6~16位密码", "密码格式正确");
var passworAgainInput = new FormList("passwordAgain", "password", check.chekpasswordAgain, "请重复输入密码", "两次输入密码一致！");
var emailInput = new FormList("email", "text", check.checkEmail, "请输入您的邮箱地址", "邮箱格式正确！");
var phoneInput = new FormList("phone", "text", check.checkPhone, "请输入您的手机号码", "您输入的手机格式不正确");
var labelObj = {
    "name": "名称",
    "password": "密码",
    "passwordAgain": "确认密码",
    "email": "邮箱",
    "phone": "手机号码"
}

function toStr(obj) {
    return '<label for = "">' + '<strong>' + labelObj[obj.label] + '</strong>' + '<input name = ""  type = ' + obj.type + ' id = ' + obj.label + ' placeholder = 请输入' + labelObj[obj.label] + '>' + '<span id =' + obj.label + 'Warn>' + '</span></label>';
}

window.onload = function() {
    //所选择的标签
    var btn = $("tableBtn");
    var tabli = $("tableli");
    var nameChose = $("nameList");
    var passwordChose = $("passwordList");
    var emailChose = $("emailList");
    var phoneChose = $("phoneList");
    var style1 = $("style1");

    var strObj = {
        0: [nameInput],
        1: [passwordInput, passworAgainInput],
        2: [emailInput],
        3: [phoneInput]
    }
    addEvent(btn, "click", btnClick);

    function btnClick() {
        var str = "";
        var arr = [];
        formArr = [nameChose, passwordChose, emailChose, phoneChose];
        for (var i = 0, len = formArr.length; i < len; i++) {
            if (formArr[i].checked) {
                arr.push(strObj[i]);
            }
        }
        for (var j = 0, len = arr.length; j < len; j++) {
            for (var k = 0; k < arr[j].length; k++) {
                str += toStr(arr[j][k]);
            }
        }
        str += '<input type = "button" value = "提交" id = "submit">';


        if (style2.checked) {
            // str = str.replace(/<input/g, "<input style = 'width:800px;'");
            str = str.replace(/<span/g, "<span style = 'display:inline-block;'");
        }
        tabli.innerHTML = str;

        (function() {
            var name = $("name"); //input的ID
            var password = $("password");
            var passwordAgain = $("passwordAgain");
            var email = $("email");
            var phone = $("phone");
            var submit = $("submit");

            var nameW = $("nameWarn"); //span 的ID
            var passwordW = $("passwordWarn");
            var passwordAgainW = $("passwordAgainWarn");
            var emailW = $("emailWarn");
            var phoneW = $("phoneWarn");


            function focusIn(input, text) {
                text.style.color = "#aaa";
                input.style.boderColor = "#ccc";
            }

            function blurIn(input, text, boolean) {
                if (boolean === true) {
                    input.style.borderColor = "#5fb844";
                    text.style.color = "5fb844";
                } else {
                    input.style.borderColor = "#de0011";
                    text.style.color = "#de0011";
                }

            }
            name && addEvent(name, "focus", function() {
                nameW.innerHTML = nameInput.rules;
                focusIn(name, nameW);
            });
            name && addEvent(name, "blur", function() {
                nameW.innerHTML = check.checkname(name.value).text;
                blurIn(name, nameW, check.checkname(name.value).boolean);

            });
            password && addEvent(password, "focus", function() {
                passwordW.innerHTML = passwordInput.rules;
                focusIn(password, passwordW);
            });
            password && addEvent(password, "blur", function() {
                passwordW.innerHTML = check.checkpassword(password.value).text;
                blurIn(password, passwordW, check.checkname(password.value).boolean);
            });
            passwordAgain && addEvent(passwordAgain, "focus", function() {
                passwordAgainW.innerHTML = passworAgainInput.rules;
                focusIn(passwordAgain, passwordAgainW);
            })
            passwordAgain && addEvent(passwordAgain, "blur", function() {
                passwordAgainW.innerHTML = check.chekpasswordAgain(passwordAgain.value).text;
                blurIn(passwordAgain, passwordAgainW, check.chekpasswordAgain(passwordAgain.value).boolean);
            })
            email && addEvent(email, "focus", function() {
                emailW.innerHTML = emailInput.rules;
                focus(email, emailW);
            });
            email && addEvent(email, "blur", function() {
                emailW.innerHTML = check.checkEmail(email.value).text;
                blurIn(email, emailW, check.checkEmail(email.value).boolean);

            });
            phone && addEvent(phone, "focus", function() {
                phoneW.innerHTML = phoneInput.rules;
                focus(phone, phoneW);
            });
            phone && addEvent(phone, "blur", function() {
                phoneW.innerHTML = check.checkPhone(phone.value).text;
                blurIn(phone, phoneW, check.checkPhone(phone.value).boolean);
            })

            addEvent(submit, "click", function() {
                if ((!name || name.style.borderColor === "rgb(95, 184, 68)") && (!password || password.style.borderColor === "rgb(95, 184, 68)") && (!passwordAgain || passwordAgain.style.borderColor === "rgb(95, 184, 68)") && (!email || email.style.borderColor === "rgb(95, 184, 68)") && (!phone || phone.style.borderColor === "rgb(95, 184, 68)")) {
                    alert("提交成功!");
                } else {
                    alert("提交失败!");
                }

            })
        })();
    }


}







//创建表单2