var app;
(function (app) {
    (function (controller) {
        var CourseDetail = (function () {
            function CourseDetail($http, $routeParams, api, auth) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.auth = auth;
                if ($routeParams.id != "nove") {
                    this.isNew = false;
                    $http.get("/kurzy/" + $routeParams.id).then(function (response) {
                        _this.course = response.data;
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
                }

                $http.get("/autoskoly/" + $routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });

                var nowDate = new Date();
                var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                this.newLesson = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
                };
            }
            CourseDetail.prototype.saveCourse = function (course) {
                var _this = this;
                (this.isNew) ? this.api.createCourse(course).then(function (response) {
                    _this.course = response.data;
                    _this.isNew = false;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                }) : this.api.updateCourse(course).then(function (response) {
                    _this.course = response.data;
                }, function (reason) {
                    alert("Chyba: " + reason);
                });
            };

            CourseDetail.prototype.createLesson = function (lesson) {
                this.api.createLesson(lesson).then(function () {
                    alert("vytvoreno");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.createStudent = function (student) {
                this.api.createStudent(student).then(function () {
                    alert("vytvoreno");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            CourseDetail.prototype.deleteCourse = function (course) {
                var _this = this;
                this.api.deleteCourse(course).then(function () {
                    window.location.assign("/#/autoskola/" + _this.drivingSchool.id + "/kurzy");
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
