$(document).ready(function () {
    var ErrorGUI = (function () {

        var $machine;
        var $error_type;

        var cacheDom = function () {
            $machine = $('.machine');
            $error_type = $('.error-type');
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
                }
            });

            $error_type.on({
                click: function() {
                    var element = $(this)
                    $error_type.removeClass("error-type-selected");
                    if(!(element.hasClass("error-type-selected"))) {
                        element.addClass("error-type-selected");
                    } else {
                        element.removeClass("error-type-selected");
                    }
                }
            });


        }();

    });

    ErrorGUI();
});
