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
    var width = $("#"+self.parent_id)[0].clientWidth;
	var $div1 = $("<div class='datePicker'></div>");
	parent.append($div1);
    var $div2 = $("<div ></div>")
        	.addClass('input-group');
    $div1.append($div2);

    // Create Calendar
    var $div3 = $("<div class='calendar' width="+width+" ></div>");
    var $div4 = $("<div class='calendar-header'></div>");
    var $div5 = $("<div class='header month'>"+self._monthList[self._month]+" "+self._year+"</div>");
    var $leftbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></button>")
    				.on("click", function(){
    					self._month--;
    					if(self._month < 0) self._month = 11;
    					updateCalendarHeader();
    					constructCalendarTable($calBody);
    				});
    var $rightbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></button>")
    				.on("click", function(){
    					self._month++;
    					if(self._month == 12) self._month = 0;
    					updateCalendarHeader();
    					constructCalendarTable($calBody,width);
    				});
    var $calBody = $("<div id='calendar-body'></div>");
    $div4.append($leftbtn);
    $div4.append($div5);
   	$div4.append($rightbtn);
    $div3.append($div4);
	$div3.append($calBody);
	constructCalendarTable($calBody,width);

   	$div1.append($div3);

    var $input = $("<input id='datePicker-input'></input>")
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

   	function updateCalendarHeader(){
   		$(".calendar .month").text(self._monthList[self._month] +" "+ self._year);
   	}

   	function constructCalendarTable(parent,width){
   		$("#calendar-body").children().remove();
   		//Header row
	   	var $calTable = $("<table width='100%'></table>");
	   	var $tr = $("<tr></tr>");
	   	for(var i = 0; i < self._dayList.length; i++){
	   		$tr.append($("<th width="+(width/7)+">"+self._dayList[i]+"</th>"));
	   	}
	   	$calTable.append($tr);

	   	// Body table
	   	var firstday = new Date(self._year, self._month, 1);
	   	var endday = new Date(self._year, self._month + 1, 1);
		var monthLength = Math.ceil((endday - firstday) / (1000 * 60 * 60 * 24));
		var day = 1;
		for(var i = 0; i < 6; i++){
			if(day > monthLength) break;
			var $tr = $("<tr></tr>")
			for(var j = 0; j < 7; j++){
				var $td = $("<td width="+(width/7)+"></td>");
				if(day <= monthLength && ( j>= firstday.getDay() || i != 0)){
                    if(day == self._currDate.getDate() && self._month == self._currDate.getMonth() && self._year == self._currDate.getFullYear()){
                        $td.css("background","#f6f6c2").css("cursor", "pointer")
                            .click(function(){setDateToInput(self._year, self._month,$(this).text())}).text(day);
                    }
                    else{
    					$td.hover(function(){
                            $(this).css("background","#ccc").css("cursor", "pointer").css("border-radius","2px");
                        }, function(){
                            $(this).css("background","#FFF").css("cursor", "auto");
                        }).click(function(){setDateToInput(self._year, self._month,$(this).text())}).text(day);
                    }             
					day++;
				}
				$tr.append($td);
			}
			$calTable.append($tr);
		}
		parent.append($calTable);
   	}

    function setDateToInput(year, month, date){
        var formatDate = parseInt(date).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
        var formatMonth = (month+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        $("#datePicker-input").val(formatMonth+"/"+formatDate+"/"+year);
    }
};