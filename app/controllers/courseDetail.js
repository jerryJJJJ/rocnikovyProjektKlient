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
                this.newStudent = {};
                if ($routeParams.id) {
                    this.isNew = false;
                    this.api.getCourse($routeParams.id).then(function (response) {
                        _this.course = response.data;
                        _this.setUpNewLesson();
                    }, function (reason) {
                        alert('Nepodarilo se nacist kurz: ' + reason);
                    });

                    this.api.getLessons($routeParams.id).then(function (response) {
                        _this.lessons = new app.lib.IndexedArray('teorie_id', response.data.teorie);
                    }, function (reason) {
                        alert('Nepodarilo se nacist hodiny teorie: ' + reason);
                    });

                    this.api.getStudents($routeParams.id).then(function (response) {
                        _this.students = new app.lib.IndexedArray('student_id', response.data.studenti);
                    }, function (reason) {
                        alert('Nepodarilo se nacist studenty: ' + reason);
                    });

                    this.api.getTeachers($routeParams.autoskolaId).then(function (response) {
                        _this.teachers = new app.lib.IndexedArray('ucitel_id', response.data.ucitele);
                    }, function (reason) {
                        alert('Nepodarilo se nacist ucitele: ' + reason);
                    });
                } else {
                    this.isNew = true;
                    var nowDate = new Date();
                    var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                    var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                    this.course = {
                        "datum_od": nowDate.getFullYear() + "-" + month + "-" + day,
                        "datum_do": nowDate.getFullYear() + "-" + ((month + 3 > 12) ? 12 : month + 3) + "-" + day
                    };
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
                var hours = (nowDate.getHours() < 10 ? '0' : '') + nowDate.getHours();
                var minutes = (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes();
                var hoursTo = (((nowDate.getHours() + 2) % 24 < 10) ? '0' : '') + (nowDate.getHours() + 2) % 24;

                this.newLesson = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "cas_od": hours + ":" + minutes,
                    "cas_do": hoursTo + ":" + minutes,
                    "kurz_id": this.course.id
                };
            };

            CourseDetail.prototype.saveCourse = function (course) {
                var _this = this;
                if (this.isNew) {
                    this.api.createCourse(course).then(function (response) {
                        _this.$location.path('/autoskola/' + _this.drivingSchool.autoskola_id + '/kurzy/' + response.data.kurz_id);
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
                var _this = this;
                this.api.createStudent(student).then(function (response) {
                    _this.students.push(response.data);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteCourse = function (course) {
                var _this = this;
                this.api.deleteCourse(course).then(function () {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.autoskola_id + "/kurzy");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteLesson = function (lesson) {
                var _this = this;
                this.api.deleteLesson(lesson).then(function () {
                    _this.lessons.remove(lesson);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteStudent = function (student) {
                var _this = this;
                this.api.deleteStudent(student).then(function () {
                    _this.students.remove(student);
                }, function (reason) {
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
