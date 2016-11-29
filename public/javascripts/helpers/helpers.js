$(document).ready(function () {

    Handlebars.registerHelper("print", function (pins) {
        var hasPins = false;
        var printPins = [];
        var toPrint;
        for (var i = 0; i < pins.length; i++) {
            if (pins[i] != false) {
                printPins.push("&nbsp;" + (i + 1));
                hasPins = true;
            }
        }

        if (hasPins) {
            toPrint = "<p class='red'>" + printPins + "</p>";
        } else {
            toPrint = "Ingen kegler registreret";
        }

        return new Handlebars.SafeString(toPrint);
    });

    Handlebars.registerHelper('getDate', function () {
        var dato = moment().format("DD-MM-YYYY");
        return dato;
    });

    Handlebars.registerHelper("format", function (inputDate) {
        var date = new Date(inputDate);
        2
        var formattedDate = "Dato: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " - kl. " + date.getHours() + ":" + addZero(date.getUTCMinutes());

        return formattedDate;
    });

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    Handlebars.registerHelper('menuhelper', function (context, options) {
        var html = "";

        for (var i = 0; i < context.length; i++) {
            if (i == 0) {
                html = options.fn(context[i]);
            } else {
                html += options.inverse(context[i]);
            }
        }
        return html;
    });


    Handlebars.getTemplate = function(name) {
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            $.ajax({
                url : '/javascripts/templates/' + name + '.hbs',
                success : function(data) {
                    if (Handlebars.templates === undefined) {
                        Handlebars.templates = {};
                    }
                    Handlebars.templates[name] = Handlebars.compile(data);
                },
                async : false
            });
        }
        return Handlebars.templates[name];
    };



});