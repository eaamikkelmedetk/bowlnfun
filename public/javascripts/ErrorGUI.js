$(document).ready(function () {
    var ErrorGUI = (function () {

        var machineId = 1;

        //jQuery variables
        var $machine;
        var $error_type;
        var $pins;


        var cacheDom = function () {
            $machine = $('.machine');
            $error_type = $('.error-type');
            $pins = $('.pin');
        }();

        var init = function () {

        }();


        var bindEvents = function () {
            $machine.on({
                click: function () {
                    var element = $(this);
                    $machine.removeClass("machine-selected");
                    if (!(element.hasClass("machine-selected"))) {
                        element.addClass("machine-selected");
                    } else {
                        element.removeClass("machine-selected");
                    }
                    bindErrorHandler();
                }
            });

            $pins.on({'click': function() {
                $(this).addClass("pin-selected");
            }});

        }();

        var bindErrorHandler = function() {
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

                        console.log(element.text());
                        if(startTimer !== undefined) {
                            clearTimeout(startTimer);
                        }
                        startTimer = setTimeout(postError, 5000, element.text());
                    }
                });
            }
        };

        var postError = function(errortype) {
            ErrorService.addError(function() {
                resetGui();
            }, 1, errortype);

            $error_type.off('click');
        };

        var resetGui = function() {
            $machine.removeClass("machine-selected");
            $error_type.removeClass("error-type-selected");
        }

    });

    ErrorGUI();
});
