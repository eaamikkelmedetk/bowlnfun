$(document).ready(function () {
    var terminalView = (function () {

        var pinsDefault = function() {return [false,false,false,false,false,false,false,false,false,false];};
        var errorReport;

        //jQuery variables
        var $machine;
        var $error_type;
        var $pins;

        /**
         * Responsible for caching choosen DOM-elements
         */
        var cacheDom = function () {
            $machine = $('.machine');
            $error_type = $('.error-type');
            $pins = $('.pin');
        }();

        /**
         * Responsible for binding a handler to machine click events
         */
        var machineClick = function () {
            var element = $(this);
            $machine.removeClass("machine-selected");

            element.addClass("machine-selected");
            errorReport.machineId = element.children(".machine-id").val();

            bindPinClick();
            errorReport.timer = startTimer();

        };

        /**
         * Responsible for binding a click event to Error buttons
         */
        var errorTypeClick = function() {
            var element = $(this);
            $error_type.removeClass("error-type-selected");

            if (element.hasClass("use-pins"))
                errorReport.usePins = true;
            else errorReport.usePins = false;
            element.addClass("error-type-selected");
            errorReport.type = element.text();

            bindPinClick();
            errorReport.timer = startTimer();
        };

        var pinClick = function () {
            var element = $(this);

            if (element.hasClass("pin-selected")) {
                element.removeClass("pin-selected").addClass("pin-selectable");
                errorReport.pins[parseInt(element.text())-1] = false;
            }
            else {
                element.removeClass("pin-selectable").addClass("pin-selected");
                errorReport.pins[parseInt(element.text())-1] = true;
            }

            errorReport.timer = startTimer();
        }

        var bindPinClick = function () {
            if(errorReport.usePins) {
                $('.pin:not(.pin-selected)').addClass("pin-selectable");
                $pins.off('click').on('click', pinClick);
            }
            else {
                errorReport.pins = pinsDefault();
                console.log(errorReport.pins);
                $pins.removeClass("pin-selected pin-selectable");
                $pins.off('click');
            }
        }

        var postErrorReport = function() {
            if(errorReport.type && errorReport.machineId) {
                terminalController.addError(resetGui, errorReport);
                showModal();
            }
            else resetGui();
        };

        /**
         * Responsible for clearing the DOM after an error-report
         */
        var resetGui = function() {
            errorReport = {
                'pins': pinsDefault()
            };
            $machine.removeClass("machine-selected").on({'click': machineClick});
            $error_type.removeClass("error-type-selected").on({'click': errorTypeClick});
            $pins.removeClass("pin-selected pin-selectable").off('click');

        };

        var startTimer = function () {
            if(errorReport.timer != undefined) {
                clearTimeout(errorReport.timer);
            }
            return setTimeout(postErrorReport, 3000);
        };

        var showModal = function () {
            $('#errorReportSuccess').modal('show');
            setTimeout(function() {
                $('#errorReportSuccess').modal('hide');
            }, 2500)
        };

        resetGui();
    });

    ErrorGUI();
});


