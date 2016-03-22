function main() {

	getDatepicker();

	function getDatepicker(){
		var today = new Date();
		var datepicker = new Datepicker({
			parent_id: "datepicker",
			minDate: new Date(today),
			maxDate: new Date(today.getFullYear()+1, today.getMonth(), today.getDate())
		});
		datepicker.render();
	}
}