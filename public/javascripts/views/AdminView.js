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

    var addCenterSubmit = function () {

        var $centerName = $('#centername');
        var $terminalusrname = $('#terminalusrname');
        var $terminalpsw = $('#terminalpsw');
        var $centerusrname = $('#centerusrname');
        var $centerpsw = $('#centerpsw');

        var newCenter = {
            name: $centerName.val(),
            readName: $centerusrname.val(),
            readPass: $centerpsw.val(),
            writeName: $terminalusrname.val(),
            writePass: $terminalpsw.val()
        }

        AdminController.addCenter(newCenter, function () {
            $('#addCenterModal').modal('hide');
            $centerName.val("");
            $centerusrname.val("");
            $centerpsw.val("");
            $terminalusrname.val("");
            $terminalpsw.val("");
        }, function (err) {
            console.log(err.responseText);
            $('.modal-footer').show();
            $('#failureMessage').val(err.responseText.message);
        });
    };

    // TODO: Way to get the name of selected 'center'.
    // TODO: what about Callbacks?
    // var disableCenter = function() {
    //     var centerName = $('.menu-active').children('.menu-items-text').text();
    //
    //     AdminController.disableCenter(centerName);
    // };

    var bindEvents = function () {
        $('ul.menu-items li').on('click', highlightMenuitems);
        $('#addCenterBtn').on('click', function(){
            $('#addCenterModal').modal();
        })
        $('#addCenterSubmitBtn').on('click', addCenterSubmit);
        // $('#disableCenterBtn').on('click', disableCenter);
    }();


});

$(document).ready(function () {
    AdminView();
});