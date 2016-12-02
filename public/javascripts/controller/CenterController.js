var centerController = (function () {
    var root = window.location.origin;
    var route = '/center/api/errors';

    var $loader = $('.loading');
    var delay = 1000;
    var message_timer = false;


    function publicGetErrorsFromTo(dates) {
        $.ajax(
            {
                type: "GET",
                url: root + route,
                data: {
                    fDate: dates.fromISODate,
                    tDate: dates.toISODate
                },
                beforeSend: longRequest,
                success: callback,
                dataType: 'json'
            }
        )
    }

    function longRequest() {
        message_timer = setTimeout(function () {
            $loader.show();
            message_timer = false;
        }, delay);
    }

    function renderTemplate(data) {
        var compiledTemplate = Handlebars.getTemplate('CenterErrorView');
        var html = compiledTemplate(data);
        $('#errorContainer').html(html);
    }

    function callback(errors) {
        if (message_timer) {
            clearTimeout(message_timer);
        }
        message_timer = false;
        $loader.hide();
        renderTemplate({error: errors});
    }


    return {
        getErrorsFromTo: publicGetErrorsFromTo

    };

})();