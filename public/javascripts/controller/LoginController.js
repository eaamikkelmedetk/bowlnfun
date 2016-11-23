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

    function publicLogin(username, password) {
        var root = window.location.origin;
        var route = '/authenticate';
        $.ajax(
            {
                type: "POST",
                url: root + route,
                data: {
                    "name": username,
                    "password": password
                },
                dataType: 'json'
            }
        )
        return {
            login: publicLogin
        }
    };
})();