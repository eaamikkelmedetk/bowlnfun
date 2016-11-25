$(document).ready(function () {



    $('ul.menu-items li').on('click', function() {
        $('ul.menu-items li').removeClass('menu-active');
        $(this).addClass('menu-active');
    });

    resizeMenu();

    $(window).on("resize", function () {
        resizeMenu();
    });

    function resizeMenu() {
        if ($(document).width() > 1170) {
            $(".menu").css({"min-height": $(document).height(), "margin-left": "0px", "margin-right": "0px"});
        } else {
            $(".menu").css({"min-height": "0px", "margin-left": "15px", "margin-right": "15px"});
        }


    }
});