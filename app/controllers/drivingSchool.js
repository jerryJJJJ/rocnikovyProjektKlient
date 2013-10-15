'use strict';
var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, auth) {
                var _this = this;
                this.$http = $http;
                this.auth = auth;
                $http.get("/autoskola/1").then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
