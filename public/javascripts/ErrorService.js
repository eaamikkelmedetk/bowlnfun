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

    function publicAddError(callBack, machineId, errorType, pins) {
        var root = window.location.origin;
        var route = '/api/errors';
        if (pins === undefined)
            pins = [];
        $.ajax(
            {
                type: "POST",
                url: root + route,
                data: {
                    "machineId": machineId,
                    "type": errorType,
                    "pins": JSON.stringify(pins)
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
