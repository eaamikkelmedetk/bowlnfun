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
        console.log(root + route);
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

    var addMachine = function(data, sCallback) {
        return postRequest('/admin/api/machine/', data, sCallback);
    };

    var deleteMachine = function(data, sCallback) {
        return putRequest('/admin/api/machines/', data, sCallback);
    };

    var addCenter = function (data, sCallback, fCallback) {
        return postRequest('/admin/api/centers', data, sCallback, fCallback);
    };

    var disableCenter = function (name, sCallback, fCallback) {
        $.ajax({
            type: "PUT",
            dataType: 'json',
            url: root + route,
            data: {
                name: name,
                active: false
            },
            success: sCallback,
            error: fCallback
        });
    };

    return {
        "findUser": findUser,
        "changePassword": changePassword,
        "addMachine": addMachine,
        "deleteMachine": deleteMachine,
        "addCenter": addCenter,
        "disableCenter": disableCenter
    };


})();
