var AdminController = (function () {

    var root = window.location.origin;

    var renderTemplate = function(data, template, target) {
        var compiledTemplate = Handlebars.getTemplate(template);
        var html = compiledTemplate(data);
        $(target).html(html);
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
        })
    };

    return {
        "addCenter": addCenter,
        "disableCenter": disableCenter
    }

})();
