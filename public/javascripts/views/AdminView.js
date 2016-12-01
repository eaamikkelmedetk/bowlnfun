/**
 * Created by Mikkel on 26-11-2016.
 */

var AdminView = (function () {
    var weburl = "http://localhost:3000/admin";
    /**
     * LAYOUT START
     */

    var highlightMenuitems = function () {
        $('ul.menu-items li').removeClass('menu-active');
        $(this).addClass('menu-active');
    };

    var resetMenuHeight = function() {
        var documentHeight = $(document).height();
        $(".menu").height(documentHeight);
    }

    var menuItemIsSet = function() {
        var pathname = window.location.pathname.split("/");

        if(pathname[2] === undefined) {
            $('ul.menu-items li:nth-child(1)').addClass('menu-active')
        } else {
            var centerSelected = pathname[2];

            var menuItemsElements = $('ul.menu-items > li').map(function(){
                return $(this);
            }).get();

            var menuItemsText = $('ul.menu-items > li > a').map(function(){
                return $.trim($(this).text());
            }).get();

            var found = false;
            var i = 0;

            while(!found && i < menuItemsText.length) {
                if(centerSelected === menuItemsText[i]) {
                    found = true;
                    menuItemsElements[i].addClass("menu-active");
                } else {
                    i++;
                }
            }
        }
    };

    var changeCenterPassword = function(e) {
        if(!($(e.target).hasClass('disabled'))) {
            e.preventDefault();
            e.stopPropagation();
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
                    $.growl({ title: "Center", message: "Centerbrugeren er blevet opdateret" });
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                })
            });
        }
    };

    var changeTerminalPassword = function(e) {
        if(!($(e.target).hasClass('disabled'))) {
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
                    $.growl({ title: "Terminal", message: "Terminalbrugeren er blevet opdatereret" });
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                })
            });
        }
    };

    var addCenterSubmit = function(e) {
        e.preventDefault();
        var $centerName = $('#centername');
        var $terminalusrname = $('#terminalusrname');
        var $terminalpsw = $('#terminalpsw');
        var $centerusrname = $('#centerusrname');
        var $centerpsw = $('#centerpsw');

        var newCenter = {
            name: $centerName.val().toLowerCase(),
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
            window.location.reload();
        }, function (err) {
            $.growl({title: "Center", message: "Oprettelsen af centeret er mislykkedes. Brugernavn skal være unikt" });
            $("#addCenterModal").modal('hide');
        });
    };

    var changeCenterStatus = function (e) {
        var name = $(e.target.parentNode.parentNode).prev().text();
        var checked = e.target.checked;

        var data = {
            "name": name,
            "active": checked
        };

        AdminController.changeCenterStatus(data);
    };


    var addMachine = function(e) {
        var centerId = $('#selectedCenterId').val();
        var machineNumber = $('#txtMachineNumber').val();
        var state = "normal";

        AdminController.addMachine({"machineNumber": machineNumber, "state": state, "centerId": centerId}, function(result) {
            $('#modalTilføjMaskine').modal("hide");
            $.growl({ title: "Maskine", message: "Maskinen er blevet oprettet" });
            setTimeout(function() {
                location.reload();
            }, 1500);
        })
    };

    var removeMachine = function(e) {
        e.stopPropagation();
        var machineId = $(this).siblings(".machineId").val();
        AdminController.deleteMachine({"id": machineId, "state": "deleted"}, function() {
            $.growl({ title: "Maskine", message: "Maskinen er blevet slettet" });
            setTimeout(function() {
                location.reload();
            }, 1500);
        })
    };

    var bindEvents = function () {
        $('ul.menu-items li').on('click', highlightMenuitems);
        $('.changeCenterUser').on('click', changeCenterPassword);
        $('.changeTerminalUser').on('click', changeTerminalPassword);
        $('#btnAddMachine').on('click', addMachine);
        $('.deleteContainer').on('click', removeMachine);
        $('#addCenterSubmitBtn').on('click', addCenterSubmit);
        $('.menu-heading').on("click", function() {
            window.location.href = "http://" + window.location.host + "/admin";
        });
        $('.active-center-checkbox').on("click", changeCenterStatus);
        $('.btnLuk').on('click', function() {
            location.reload();
        });
    };

    return {
        "bindEvents": bindEvents,
        "menuItemIsSet": menuItemIsSet,
        "resetMenuHeight": resetMenuHeight
    };

});

$(document).ready(function () {
    AdminView().bindEvents();
    AdminView().menuItemIsSet();
    AdminView().resetMenuHeight();
});
