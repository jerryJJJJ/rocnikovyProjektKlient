var app;
(function (app) {
    (function (controller) {
        var StudentDetail = (function () {
            function StudentDetail($http, $routeParams, api, $location, drivingSchool, student, teachers, rides, lessons) {
                this.$http = $http;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.student = student;
                this.teachers = teachers;
                this.rides = rides;
                this.lessons = lessons;
                this.courseId = this.$routeParams.kurzId;
                this.vehicleId = this.$routeParams.vozidloId;
            }
            StudentDetail.prototype.saveStudent = function (student) {
                var _this = this;
                this.api.updateStudent(student).then(function (response) {
                    _this.student = response.data;
                }, function (reason) {
                    alert("Chyba: " + reason);
                });
            };

            StudentDetail.prototype.deleteStudent = function (student) {
                var _this = this;
                this.api.deleteStudent(student).then(function () {
                    var path;
                    if (_this.courseId) {
                        path = "/autoskola/" + _this.drivingSchool.autoskola_id + "/kurzy/" + _this.courseId;
                    } else {
                        path = "/autoskola/" + _this.drivingSchool.autoskola_id + "/vozidla/" + _this.vehicleId;
                    }
                    _this.$location.path(path);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            StudentDetail.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'lessons': function (api, $route) {
                    return api.getLessons($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('teorie_id', response.data['teorie']);
                    });
                },
                'student': function (api, $route) {
                    return api.getStudent($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'teachers': function (api, $route) {
                    return api.getTeachers($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
                    });
                },
                'rides': function (api, $route) {
                    return api.getRides($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('jizda_id', response.data['jizdy']);
                    });
                }
            };
            return StudentDetail;
        })();
        controller.StudentDetail = StudentDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('StudentDetail');
//# sourceMappingURL=studentDetail.js.map
