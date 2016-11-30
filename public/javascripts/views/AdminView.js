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

    };

    var changeCenterPassword = function(e) {
        e.preventDefault();
        var getSelectedCenterUser = $('#txtOCenterUser').val();
        var newCenterUsername = $('#txtCenterUser').val();
        var newCenterPassword = $('#txtCenterPwd').val();
        var centerId = $('#selectedCenterId').val();

        AdminController.findUser(getSelectedCenterUser, function (user) {
            AdminController.changePassword({
                id: user._id,
                centerid: centerId,
                name: newCenterUsername,
                password: newCenterPassword
            }, function (response) {
                location.reload();
                console.log(response);
            })
        });
    };

    var changeTerminalPassword = function(e) {
        e.preventDefault();
        var getSelectedCenterUser = $('#txtOTerminalUser').val();
        var newTerminalUsername = $('#txtTerminalUser').val();
        var newTerminalPassword = $('#txtTerminalPwd').val();
        var centerId = $('#selectedCenterId').val();

        AdminController.findUser(getSelectedCenterUser, function(user) {
            AdminController.changePassword({
                id: user._id,
                centerid: centerId,
                name: newTerminalUsername,
                password: newTerminalPassword
            }, function(response) {
                console.log(response);
            })
        });
    };

    var addCenterSubmit = function() {
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
        };

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


    var addMachine = function(e) {
        var centerId = $('#selectedCenterId').val();
        var machineNumber = $('#txtMachineNumber').val();
        var state = "normal";

        AdminController.addMachine({"machineNumber": machineNumber, "state": state, "centerId": centerId}, function(result) {
            $('#modalTilføjMaskine').modal("hide");
            location.reload();
        })
    };

    var removeMachine = function() {
        var machineId = $(this).siblings(".machineId").val();
        AdminController.deleteMachine({"id": machineId, "state": "deleted"}, function() {
            alert("Maskinen er blevet slettet!");
            location.reload();
        })
    };

    var bindEvents = function () {
        $('ul.menu-items li').on('click', highlightMenuitems);
        $('.changeCenterUser').on('click', changeCenterPassword);
        $('.changeTerminalUser').on('click', changeTerminalPassword);
        $('#btnAddMachine').on('click', addMachine);
        $('.deleteContainer').on('click', removeMachine);
        $('#addCenterBtn').on('click', function(){
            $('#addCenterModal').modal();
        });
        $('#addCenterSubmitBtn').on('click', addCenterSubmit);
        // $('#disableCenterBtn').on('click', disableCenter);
    }();

});

$(document).ready(function () {
    AdminView();
});
