function Datepicker(x) {
    var self = this;

    this.parent_id = x.parent_id;
    this.minDate = new Date(x.minDate.getFullYear(), x.minDate.getMonth(),1);
    this.maxDate = new Date(x.maxDate.getFullYear(), x.maxDate.getMonth(),1);

    this._monthList = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    this._dayList = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this._date = new Date(this.minDate);
    this._date.setDate(1);
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
    var $div5 = $("<div class='header month'>"+self._monthList[self._date.getMonth()]+" "+self._date.getFullYear()+"</div>");
    var $leftbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span></button>")
    				.on("click", function(){
                        if(new Date(self._date.getFullYear(), self._date.getMonth()-1, 1) < self.minDate){
                            self._date = new Date(self.maxDate.getFullYear(), self.maxDate.getMonth(),1);
                        }else{
                            self._date.setMonth(self._date.getMonth()-1);
                        }
    					updateCalendarHeader();
    					constructCalendarTable($calBody,width);
    				});
    var $rightbtn = $("<button type='button' class='btn btn-default header'><span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span></button>")
    				.on("click", function(){
                        if(new Date(self._date.getFullYear(), self._date.getMonth()+1, 1) > self.maxDate){
                            self._date = new Date(self.minDate.getFullYear(), self.minDate.getMonth(),1);
                        }else{
                            self._date.setMonth(self._date.getMonth()+1);
                        }
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
    		.on("click",function(){$("#"+self.parent_id+" .datePicker .calendar").toggleClass("showCalendar"); });
    $span1.append($btn);

    var $span2 = $("<span aria-hidden='true'></span>")
    		.addClass("glyphicon glyphicon-calendar");
   	$btn.append($span2);

    $(document).keyup(function(e) {
        if(e.keyCode == 27 && $("#"+self.parent_id+" .calendar").hasClass("showCalendar") ){
            $("#"+self.parent_id+" .datePicker .calendar").toggleClass("showCalendar");
            $("#"+self.parent_id+" .datePicker #datePicker-input").focus();
        }
    });

   	function updateCalendarHeader(){
   		$("#"+self.parent_id+" .calendar .month").text(self._monthList[self._date.getMonth()] +" "+ self._date.getFullYear());
   	}

   	function constructCalendarTable(parent,width){
   		$("#"+self.parent_id+" #calendar-body").children().remove();
        var year = self._date.getFullYear();
        var month = self._date.getMonth();
   		//Header row
	   	var $calTable = $("<table width='100%'></table>");
	   	var $tr = $("<tr></tr>");
	   	for(var i = 0; i < self._dayList.length; i++){
	   		$tr.append($("<th width="+(width/7)+">"+self._dayList[i]+"</th>"));
	   	}
	   	$calTable.append($tr);

	   	// Body table
	   	var endday = new Date(year, month+ 1, 1);
		var monthLength = Math.ceil((endday - self._date) / (1000 * 60 * 60 * 24));
		var day = 1;
		for(var i = 0; i < 6; i++){
			if(day > monthLength) break;
			var $tr = $("<tr></tr>")
			for(var j = 0; j < 7; j++){
				var $td = $("<td width="+(width/7)+"></td>");
				if(day <= monthLength && ( j>= self._date.getDay() || i != 0)){
                    var today = new Date();
                    if(day == today.getDate() && month == today.getMonth() && year == today.getFullYear()){
                        $td.css("background","#eaeaea").css("cursor", "pointer")
                            .click(function(){setDateToInput(year, month,$(this).text())}).text(day);
                    }
                    else{
    					$td.hover(function(){
                            $(this).css("background","#e17669").css("cursor", "pointer").css("border-radius","2px");
                        }, function(){
                            $(this).css("background","#FFF").css("cursor", "auto");
                        }).css("border","1px solid #ccc").click(function(){setDateToInput(year, month,$(this).text())}).text(day);
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
        $("#"+self.parent_id+" #datePicker-input").val(formatMonth+"/"+formatDate+"/"+year);
        $("#"+self.parent_id+" .datePicker .calendar").toggleClass("showCalendar");
    }
};