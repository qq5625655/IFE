function insertText() {
    var insert = document.getElementById("insert");
    var textarea = document.getElementById("textarea");
    var div = document.getElementById("div");
    arrData = [];

    var str = textarea.value.trim();
    var str = str.split(/\s+|\,/g);

    arrData = arrData.concat(str);
    render();

}

function render(str) {
    document.getElementById("div").innerHTML = arrData.map(function(d) {
        if (str != null && str.length > 0) {
            d = d.replace(new RegExp(str, "g"), "<span class='select'>" + str + "</span>");
        }
        return '<div>' + d + '</div>';
    }).join('');
}

function query() {
    var str = document.getElementById("input").value.trim();
    render(str);
}

function addEvent() {

    document.getElementById("insert").addEventListener("click", insertText);
    document.getElementById("queryButton").addEventListener("click", query);
}

function init() {
    addEvent();
}
window.onload = init;