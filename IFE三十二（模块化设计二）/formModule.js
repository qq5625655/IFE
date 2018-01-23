function Form(data) {
    this.data = data;
    this.ipt = document.getElementById(data.id);
    this.tip = this.ipt.nextElementSibling;
    this.validator = data.validator;
    this.init();
};
Form.prototype = {
    init: function() {
        on(this.ipt, "focus", this.default_tip.bind(this));
        on(this.ipt, "blur", this.data.validator.bind(this));
        on(this.ipt, "change", this.data.validator.bind(this));
    },
    default_tip: function() {
        this.tip.innerHTML = this.data.defaultText;
        this.tip.className = "default";
        this.ipt.className = "default";
    },
    trueTip: function() {
        this.tip.innerHTML = this.data.successText;
        this.tip.className = "true";
        this.ipt.className = "true";
    },
    errorTip: function(i) {
        this.tip.innerHTML = this.data.failText[i];
        this.tip.className = "error";
        this.ipt.className = "error";
    }

}