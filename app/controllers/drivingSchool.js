'use strict';
var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams) {
                var _this = this;
                this.$http = $http;
                var autoskolaId = $routeParams.id;

                $http.get("/autoskoly/" + autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.deleteVehicle = function (vin) {
                alert(vin);
            };
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
