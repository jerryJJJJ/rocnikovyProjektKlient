var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams, auth, api, $location, drivingSchool, teachers, courses, vehicles, wageSheets) {
                this.$http = $http;
                this.auth = auth;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.teachers = teachers;
                this.courses = courses;
                this.vehicles = vehicles;
                this.wageSheets = wageSheets;
                this.lastMonthDate = new Date((new Date()).getFullYear(), (new Date()).getMonth() - 1, 1);
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

            DrivingSchool.prototype.deleteTeacher = function (teacher) {
                var _this = this;
                this.api.deleteTeacher(teacher).then(function () {
                    _this.teachers.remove(teacher);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
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
                },
                'wageSheets': function (api, $route) {
                    return api.getWageSheets($route.current.params.id).then(function (response) {
                        return response.data['vyplatnice'];
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
