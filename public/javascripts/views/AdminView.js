/**
 * Created by Mikkel on 26-11-2016.
 */

var AdminView = (function() {
        var resizeMenu = function() {
        if ($(document).width() >= 975) {
            $(".menu").css({"min-height": $(document).height(), "margin-left": "0px", "margin-right": "0px"});
        } else {
            $(".menu").css({"min-height": "0px", "margin-left": "15px", "margin-right": "15px"});
        }
    };

    var highlightMenuitems = function() {
        $('ul.menu-items li').removeClass('menu-active');
        $(this).addClass('menu-active');
    };

    var bindEvents = function() {
        $('ul.menu-items li').on('click', highlightMenuitems);
            $(window).on("resize", resizeMenu);
        resizeMenu();
    }();

});

$(document).ready(function() {
    AdminView();
});