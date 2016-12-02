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
        moment.locale("da");
        var date = moment(inputDate).format("L LT");

        return date;
    });

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

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


    Handlebars.registerHelper('grouped_each', function(every, context, options) {
        var out = "", subcontext = [], i;
        if (context && context.length > 0) {
            for (i = 0; i < context.length; i++) {
                if (i > 0 && i % every === 0) {
                    out += options.fn(subcontext);
                    subcontext = [];
                }
                subcontext.push(context[i]);
            }
            out += options.fn(subcontext);
        }
        return out;
    });

});