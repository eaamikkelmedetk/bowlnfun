var AdminController = (function () {

    var root = window.location.origin;

    var renderTemplate = function(data, template, target) {
        var compiledTemplate = Handlebars.getTemplate(template);
        var html = compiledTemplate(data);
        $(target).html(html);
    };

    var getRequest = function (route, data, sCallback) {
        $.ajax({
                type: "GET",
                dataType: 'json',
                url: root + route + data,
                success: sCallback
            }
        );
    };

    var postRequest = function (route, data, sCallback, fCallback) {
        $.ajax({
                type: "POST",
                dataType: 'json',
                url: root + route,
                data: data,
                success: sCallback,
                error: fCallback
            }
        );
    };

    var putRequest = function (route, data, sCallback) {
        $.ajax({
                type: "PUT",
                dataType: 'json',
                url: root + route,
                data: data,
                success: sCallback
            }
        );
    };

    var deleteRequest = function (route, data, sCallback) {
        $.ajax({
                type: "DELETE",
                dataType: 'json',
                url: root + route,
                data: data,
                success: sCallback
            }
        );
    };

    var findUser = function(data, sCallBack) {
        return getRequest('/admin/api/users/', data, sCallBack);
    };

    var changePassword = function(data, sCallBack) {
        return putRequest('/admin/api/users/', data, sCallBack);
    };

    var addMachine = function(data, sCallback, fCallback) {
        return postRequest('/admin/api/machine/', data, sCallback, fCallback);
    };

    var deleteMachine = function(data, sCallback) {
        return putRequest('/admin/api/machines/', data, sCallback);
    };

    var addCenter = function (data, sCallback, fCallback) {
        return postRequest('/admin/api/centers', data, sCallback, fCallback);
    };

    var changeCenterStatus = function (data, sCallback) {
        return putRequest('/admin/api/centers', data, sCallback);
    };

    return {
        "findUser": findUser,
        "changePassword": changePassword,
        "addMachine": addMachine,
        "addCenter": addCenter,
        "deleteMachine": deleteMachine,
        "changeCenterStatus": changeCenterStatus,
        "addCenter" : addCenter
    };


})();
