var app;
(function (app) {
    /// <reference path="../components/types/angularjs/angular.d.ts"/>
    /// <reference path="../../../../download/klient/services/api.ts"/>
    /// <reference path="../lib/indexedArray.ts"/>
    /// <reference path="../app.ts"/>
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams, auth, api, $location, drivingSchool, teachers, courses, vehicles) {
                this.$http = $http;
                this.auth = auth;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.teachers = teachers;
                this.courses = courses;
                this.vehicles = vehicles;
                var autoskolaId = $routeParams.id;
                this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';
            }
            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                var _this = this;
                this.api.deleteVehicle(vehicle).then(function () {
                    _this.vehicles.remove(vehicle);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            DrivingSchool.prototype.createVehicle = function () {
                this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id + "/vozidla/nove");
            };

            DrivingSchool.prototype.createTeacher = function () {
                this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id + "/ucitele/nove");
            };

            DrivingSchool.prototype.createCourse = function () {
                this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id + "/kurzy/nove");
            };

            DrivingSchool.prototype.deleteCourse = function (course) {
                var _this = this;
                this.api.deleteCourse(course).then(function () {
                    _this.courses.remove(course);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            DrivingSchool.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'courses': function (api, $route) {
                    return api.getCourses($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('kurz_id', response.data['kurzy']);
                    });
                },
                'vehicles': function (api, $route) {
                    return api.getVehicles($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('vozidlo_id', response.data['vozidla']);
                    });
                },
                'teachers': function (api, $route) {
                    return api.getTeachers($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
                    });
                }
            };
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
