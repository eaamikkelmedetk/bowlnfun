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
            url: root + route,
            data: data,
            success: sCallback
            }
        );
    };

    var postRequest = function (route, data, sCallback) {
        $.ajax({
                type: "POST",
                dataType: 'json',
                url: root + route,
                data: data,
                success: sCallback
            }
        );
    };

    return {
        "renderTemplate": renderTemplate,
        "getrequest": getRequest
    }

})();
