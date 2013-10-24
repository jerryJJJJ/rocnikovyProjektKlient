'use strict';
var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams) {
                var _this = this;
                this.$http = $http;
                var autoskolaId = $routeParams.id;
                this.http = $http;

                $http.get("/autoskoly/" + autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                    _this.vehicles = _this.drivingSchool.vehicle;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.getVehicle = function (idVehicle) {
                for (var i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].id == idVehicle)
                        return this.vehicles[i];
                }
                return null;
            };

            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                this.http.delete("/vozidla/" + vehicle.id).then(function (response) {
                    alert(response.status);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            DrivingSchool.prototype.createVehicle = function () {
            };
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
