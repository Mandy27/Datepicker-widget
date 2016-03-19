function main() {

	getDatepicker();

	function getDatepicker(){
		var datepicker = new Datepicker({
			parent_id: "datepicker"
		});
		datepicker.render();
	}
}