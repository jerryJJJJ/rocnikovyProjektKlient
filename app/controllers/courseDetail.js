var app;
(function (app) {
    (function (controller) {
        var CourseDetail = (function () {
            function CourseDetail($http, $routeParams, api, auth, $location) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.auth = auth;
                this.$location = $location;
                if ($routeParams.id) {
                    this.isNew = false;
                    this.api.getCourse($routeParams.id).then(function (response) {
                        _this.course = response.data;
                    }, function (reason) {
                        alert('Nepodarilo se nacist kurz: ' + reason);
                    }).then(function () {
                        _this.setUpNewLesson();
                    });

                    this.api.getLessons($routeParams.id).then(function (response) {
                        _this.lessons = response.data.teorie;
                    }, function (reason) {
                        alert('Nepodarilo se nacist kurz: ' + reason);
                    });

                    this.api.getStudents($routeParams.id).then(function (response) {
                        _this.students = response.data.studenti;
                    }, function (reason) {
                        alert('Nepodarilo se nacist kurz: ' + reason);
                    });

                    this.api.getTeachers($routeParams.autoskolaId).then(function (response) {
                        _this.teachers = response.data.ucitele;
                    }, function (reason) {
                        alert('Nepodarilo se nacist kurz: ' + reason);
                    });
                } else {
                    this.isNew = true;
                    var nowDate = new Date();
                    var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                    var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                    this.course = {
                        "datum-od": nowDate.getFullYear() + "-" + month + "-" + day,
                        "datum-do": nowDate.getFullYear() + "-" + ((month + 3 > 12) ? 12 : month + 3) + "-" + day
                    };

                    this.setUpNewLesson();
                }

                this.api.getDrivingSchool($routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });
            }
            CourseDetail.prototype.setUpNewLesson = function () {
                var nowDate = new Date();
                var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                this.newLesson = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "kurz-id": this.course.id
                };
            };

            CourseDetail.prototype.saveCourse = function (course) {
                var _this = this;
                if (this.isNew) {
                    this.api.createCourse(course).then(function (response) {
                        _this.course = response.data;
                        _this.isNew = false;
                    }, function (reason) {
                        alert('Chyba: ' + reason);
                    });
                } else {
                    this.api.updateCourse(course).then(function (response) {
                        _this.course = response.data;
                    }, function (reason) {
                        alert("Chyba: " + reason);
                    });
                }
            };

            CourseDetail.prototype.createLesson = function (lesson) {
                var _this = this;
                this.api.createLesson(lesson).then(function (response) {
                    _this.lessons.push(response.data);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.createStudent = function (student) {
                this.api.createStudent(student).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteCourse = function (course) {
                var _this = this;
                this.api.deleteCourse(course).then(function () {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.id + "/kurzy");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteDocument = function (document) {
                this.api.deleteDocument(document).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteLesson = function (lesson) {
                this.api.deleteLesson(lesson).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteStudent = function (student) {
                this.api.deleteStudent(student).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            return CourseDetail;
        })();
        controller.CourseDetail = CourseDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('CourseDetail');
//# sourceMappingURL=courseDetail.js.map
