function Datepicker(x) {
    var self = this;

    this.parent_id = x.parent_id;
    this.width = x.width;
    this.height = x.height;
}

Datepicker.prototype.render = function() {
	var self = this;
	var parent = $("#"+self.parent_id);
    var $div = $("<div></div>")
        	.addClass('input-group');
    parent.append($div);

    var $input = $("<input></input>")
    		.attr("type","text")
    		.addClass("form-control")
    		.attr("placeholder", "mm/dd/yyyy");
    $div.append($input);

    var $span1 = $("<span></span>")
    		.addClass("input-group-btn");
    $div.append($span1);

    var $btn = $("<button></button>")
    		.addClass("btn btn-default")
    		.attr("type","button");
    $span1.append($btn);

    var $span2 = $("<span></span>")
    		.addClass("caret");
   	$btn.append($span2);
};