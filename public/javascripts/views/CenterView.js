$(document).ready(function() {
    var centerView = (function() {

        var dates = {};

        //jQuery variables
        var $fromDate = $('#fromDate');
        var $toDate = $('#toDate');
        var $loader = $('.loading');

        var init = function() {
           initializeDatepickers();
        };

        var initializeDatepickers = function() {

            //Set datepicker language to Danish
            $fromDate.datepicker({
                language: "da",
                format: 'dd/mm/yyyy',
                autoclose: true
            });

            $toDate.datepicker({
                language: "da",
                format: 'dd/mm/yyyy',
                autoclose: true
            });

            //initialize toDatePicker with Date.now
            var fromDateString = moment();
            var toDateString = moment();


            $fromDate.datepicker(
                "setDate", new Date(fromDateString)
            );

            $toDate.datepicker(
                "setDate", new Date(toDateString)
            );

            $fromDate.datepicker("update");
            $toDate.datepicker("update");

            dates.fromISODate = convertTOISO($fromDate.datepicker("getDate"));
            dates.toISODate = convertTOISO($toDate.datepicker("getDate"));

            centerController.getErrorsFromTo(dates);

            $('.fromDateBtn').on('click', function() {
                $fromDate.datepicker('show');
            })

            $('.toDateBtn').on('click', function() {
                $toDate.datepicker('show');
            })

        };

        init();


        var bindEvents = function() {
            $fromDate.datepicker()
                .on("changeDate", changeFromDate);
            $toDate.datepicker()
                .on("changeDate", changeToDate);
        }();

        function changeFromDate(e) {
            dates.fromISODate = convertTOISO($fromDate.datepicker("getDate"));
            centerController.getErrorsFromTo(dates);
        };

        function changeToDate(e) {
            dates.toISODate = convertTOISO($toDate.datepicker("getDate"));
            centerController.getErrorsFromTo(dates);
        };

        function convertTOISO(date) {
            date = moment(date).toISOString();
            return date;
        }

    }());
});