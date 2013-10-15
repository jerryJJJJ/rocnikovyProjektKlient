'use strict';
var app;
(function (app) {
    (function (controller) {
        var Teachers = (function () {
            function Teachers($http, auth) {
                var _this = this;
                this.$http = $http;
                this.auth = auth;
                $http.get("/ucitele").then(function (response) {
                    _this.teachers = response.data.ucitele;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            return Teachers;
        })();
        controller.Teachers = Teachers;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('Teachers');
//# sourceMappingURL=teachers.js.map
