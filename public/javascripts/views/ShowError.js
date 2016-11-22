$(document).ready(function() {
    var fromDate = $('#fromDate');
    var toDate = $('#toDate');

    fromDate.datepicker();
    toDate.datepicker();

    
    console.log(fromDate.datepicker("getDate"));
});