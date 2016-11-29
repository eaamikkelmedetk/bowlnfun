/**
 * Created by Mikkel on 26-11-2016.
 */

var AdminView = (function () {
    var isItemsBound = false;
    /**
     * LAYOUT START
     */

    var highlightMenuitems = function () {
        $('ul.menu-items li').removeClass('menu-active');
        $(this).addClass('menu-active');

        var centerName = $('.menu-active').children('.menu-items-text').text();

        AdminController.getCenter(centerName, function(center) {

            var usernames = [center.read, center.write];
            changeUsername(usernames[0], usernames[1]);
            setMachines(center._id);
        });
    };

    var bindEvents = function () {
        $('ul.menu-items li').on('click', highlightMenuitems);
    }();


});

$(document).ready(function () {
    AdminView();
});