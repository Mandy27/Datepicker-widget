function Datepicker(x) {
    var self = this;

    this.parent_id = x.parent_id;

    this._monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    this._dayList = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this._currDate = new Date();
    this._year = this._currDate.getFullYear();		// Default: current
    this._month = this._currDate.getMonth();		// Default: current
}

Datepicker.prototype.render = function() {
	var self = this;

	var parent = $("#"+self.parent_id);
	var $div1 = $("<div class='datePicker'></div>");
	parent.append($div1);
    var $div2 = $("<div ></div>")
        	.addClass('input-group');
    $div1.append($div2);

    // Create Calendar
    var $div3 = $("<div class='calendar'></div>");
    var $div4 = $("<div class='header month'>"+self._monthList[self._currMonth]+" 2015</div>");
    var $leftbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></button>");
    var $rightbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></button>");
    $div3.append($leftbtn);
    $div3.append($div4);
   	$div3.append($rightbtn);

   	//Header row
   	var $calTable = $("<table width='100%'></table>");
   	var $tr = $("<tr></tr>");
   	for(var i = 0; i < self._dayList.length; i++){
   		$tr.append($("<th>"+self._dayList[i]+"</th>"));
   	}
   	$calTable.append($tr);

   	// Body table
   	var firstday = new Date(this._currYear, this._currMonth, 1);
   	var endday = new Date(this._currYear, this._currMonth + 1, 1);
	var monthLength = Math.ceil((endday - firstday) / (1000 * 60 * 60 * 24));
	var day = 1;
	for(var i = 0; i < 6; i++){
		if(day > monthLength) break;
		var $tr = $("<tr></tr>")
		for(var j = 0; j < 7; j++){
			var $td = $("<td></td>");
			if(day <= monthLength && ( j>= firstday.getDay() || i != 0)){
				$td.text(day);
				day++;
			}
			$tr.append($td);
		}
		$calTable.append($tr);
	}

	$div3.append($calTable);

   	$div1.append($div3);

    var $input = $("<input></input>")
    		.attr("type","text")
    		.addClass("form-control")
    		.attr("placeholder", "mm/dd/yyyy");
    $div2.append($input);

    var $span1 = $("<span></span>")
    		.addClass("input-group-btn");
    $div2.append($span1);

    var $btn = $("<button></button>")
    		.addClass("btn btn-default")
    		.attr("type","button")
    		.on("click",function(){$(".datePicker .calendar").toggleClass("showCalendar");});
    $span1.append($btn);

    var $span2 = $("<span></span>")
    		.addClass("caret");
   	$btn.append($span2);

};