/**
 * Created by Morten on 16/11/2016.
 */

/**
 *
 * @param {requestCallback} callBack - Callback function for the request
 * @param {objectId} machineId - database id of the machine on which the error occurred
 * @param {string} errorType - The type of error (e.g. 'stak', 'crash', etc.)
 * @param {Array} pins - Array of truthy and falsy values representing which pins was involved in the error
 */

var ErrorService = (function() {

    function publicAddError(callBack, errorReport) {
        var root = window.location.origin;
        var route = '/terminal/api/errors';
        if (errorReport.pins === undefined)
            errorReport.pins = [];
        $.ajax(
            {
                type: "POST",
                url: root + route,
                data: {
                    "machineId": errorReport.machineId,
                    "type": errorReport.type,
                    "pins": JSON.stringify(errorReport.pins)
                },
                success: callBack,
                dataType: 'json'
            }
        )
    };

    return {
        addError: publicAddError
    };

})();
