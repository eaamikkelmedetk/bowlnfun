$(document).ready(function () {
    var ErrorGUI = (function () {

        var machineId = 1;

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

        var init = function () {

        }();

        /**
         * Responsible for binding a handler to machine click events
         */
        var bindMachineClick = function () {
            $machine.on({
                click: function () {
                    var element = $(this);
                    $machine.removeClass("machine-selected");
                    if (!(element.hasClass("machine-selected"))) {
                        element.addClass("machine-selected");
                    } else {
                        element.removeClass("machine-selected");
                    }
                    bindErrorTypeClick();
                }
            });

            $pins.on({'click': function() {
                $(this).addClass("pin-selected");
            }});

        }();

        /**
         * Responsible for binding a click event to Error buttons
         */
        var bindErrorTypeClick = function() {
            var startTimer;
            if(($machine.hasClass("machine-selected"))) {
                $error_type.on({
                    click: function() {
                        var element = $(this)
                        $error_type.removeClass("error-type-selected");
                        if(!(element.hasClass("error-type-selected"))) {
                            element.addClass("error-type-selected");
                        } else {
                            element.removeClass("error-type-selected");
                        }

                        if(startTimer !== undefined) {
                            clearTimeout(startTimer);
                        }
                        startTimer = setTimeout(postErrorReport, 5000, element.text());
                    }
                });
            }
        };


        var postErrorReport = function(errortype) {
            ErrorService.addError(function() {
                resetGui();
            }, 1, errortype);

            $error_type.off('click');
        };

        /**
         * Responsible for clearing the DOM after an error-report
         */
        var resetGui = function() {
            $machine.removeClass("machine-selected");
            $error_type.removeClass("error-type-selected");
        }

    });

    ErrorGUI();

    function showModal() {
        $('#errorReportSuccess').modal('show');
        setTimeout(function() {
            $('#errorReportSuccess').modal('hide');
        }, 2500)
    }

    showModal();
});
