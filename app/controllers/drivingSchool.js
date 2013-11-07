'use strict';
var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams, api) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                var autoskolaId = $routeParams.id;
                this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';

                this.api.getDrivingSchool(autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                this.api.getCourses(autoskolaId).then(function (response) {
                    _this.courses = response.data.kurzy;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                this.api.getTeachers(autoskolaId).then(function (response) {
                    _this.teachers = response.data.ucitele;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                this.api.getVehicles(autoskolaId).then(function (response) {
                    _this.vehicles = response.data.vozidla;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                var _this = this;
                this.api.deleteVehicle(vehicle).then(function (response) {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.id + "/vozidla");
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
