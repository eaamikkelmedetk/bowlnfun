/**
 * Created by Mikkel on 14-11-2016.
 */
($(function() {
    var fillvhCalculator = function(element, bottomMargin) {
        var VIEWPORTHEIGHT = $(window).height();
        var ELEMENTOFFSET = element.offset().top;
        var BOTTOMMARGIN = bottomMargin;

        var fillVhHeight = (VIEWPORTHEIGHT - ELEMENTOFFSET) - BOTTOMMARGIN;
        console.log(fillVhHeight);

        $(element).css({"height": fillVhHeight + "px"});
    };

    fillvhCalculator($(".fill-vh"), 0);

    $(window).on("resize", function() {
        fillvhCalculator($(".fill-vh"), 0);
    });



}));