/**
 * Created by Morten on 23/11/2016.
 */

/**
 *
 * @param {requestCallback} callBack - Callback function for the request
 * @param {string} name - The username
 * @param {string} password - The password for the specified username
 */

var LoginService = (function() {

    var deleteCookie = function() {
        document.cookie = 'bowlnfunErrorApp =; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    return {
        deleteCookie: deleteCookie
    };
})();