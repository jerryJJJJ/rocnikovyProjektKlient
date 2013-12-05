var app;
(function (app) {
    (function (controller) {
        var CourseAttendance = (function () {
            function CourseAttendance($routeParams, api, $location, drivingSchool, $scope, course, students, teachers, lesson, attendance) {
                this.$routeParams = $routeParams;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.$scope = $scope;
                this.course = course;
                this.students = students;
                this.teachers = teachers;
                this.lesson = lesson;
                this.attendance = attendance;
            }
            CourseAttendance.attendanceToObject = function (attendance) {
                var obj = {};
                attendance.forEach(function (id) {
                    return obj[id] = true;
                });
                return obj;
            };

            CourseAttendance.objectToAttendance = function (object) {
                var attendance = [];
                for (var prop in object) {
                    if (object.hasOwnProperty(prop) && object[prop]) {
                        attendance.push(parseInt(prop));
                    }
                }
                return attendance;
            };

            CourseAttendance.prototype.saveAttendance = function () {
                this.api.updateAttendance(this.lesson.teorie_id, CourseAttendance.objectToAttendance(this.attendance)).error(function (reason) {
                    alert('Chyba: ' + reason);
                });
                this.$scope.attendanceForm.$setPristine();
            };

            CourseAttendance.prototype.deleteLesson = function (lesson) {
                var _this = this;
                this.api.deleteLesson(lesson).then(function () {
                    _this.$location.path('/autoskola/' + _this.drivingSchool.autoskola_id + '/kurzy/' + _this.course.kurz_id);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            CourseAttendance.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.autoskolaId).then(function (response) {
                        return response.data;
                    });
                },
                'course': function (api, $route) {
                    return api.getCourse($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'students': function (api, $route) {
                    return api.getStudents($route.current.params.autoskolaId).then(function (response) {
                        return new app.lib.IndexedArray('student_id', response.data['studenti'].filter(function (student) {
                            return student.kurz_id == $route.current.params.kurzId;
                            //naseho kurzu
                        }));
                    });
                },
                'teachers': function (api, $route) {
                    return api.getTeachers($route.current.params.autoskolaId).then(function (response) {
                        return new app.lib.IndexedArray('ucitel_id', response.data['ucitele']);
                    });
                },
                'lesson': function (api, $route) {
                    return api.getLessons($route.current.params.kurzId).then(function (response) {
                        var indexed = new app.lib.IndexedArray('teorie_id', response.data['teorie']);
                        return indexed.find($route.current.params.id);
                    });
                },
                'attendance': function (api, $route) {
                    return api.getAttendance($route.current.params.id).then(function (response) {
                        return CourseAttendance.attendanceToObject(response.data);
                    });
                }
            };
            return CourseAttendance;
        })();
        controller.CourseAttendance = CourseAttendance;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('CourseAttendance');
//# sourceMappingURL=courseAttendace.js.map
