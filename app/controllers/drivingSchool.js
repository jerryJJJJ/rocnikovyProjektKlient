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
                    _this.vehicles = new app.lib.IndexedArray(_this.drivingSchool.vozidla);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                $http.get("/autoskoly/" + autoskolaId + "/kurzy").then(function (response) {
                    _this.courses = response.data;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                this.$http.delete("/vozidla/" + vehicle.id).then(function (response) {
                    alert(response.status);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
