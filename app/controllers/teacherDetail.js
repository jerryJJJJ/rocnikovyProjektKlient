var app;
(function (app) {
    (function (controller) {
        var TeacherDetail = (function () {
            function TeacherDetail($routeParams, $scope, api, $location, drivingSchool, teacher, students, rides, documents, lessons) {
                this.$routeParams = $routeParams;
                this.$scope = $scope;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.teacher = teacher;
                this.students = students;
                this.rides = rides;
                this.documents = documents;
                this.lessons = lessons;
                this.tab = "lessons";
                if ($routeParams.id) {
                    this.isNew = false;
                } else {
                    this.isNew = true;
                    this.teacher = {
                        pocet_deti: 0,
                        hodinova_mzda: 0,
                        autoskola_id: $routeParams.autoskolaId,
                        opravneni_jizdy_a: false,
                        opravneni_jizdy_b: false,
                        opravneni_jizdy_c: false,
                        opravneni_jizdy_d: false,
                        opravneni_jizdy_t: false
                    };
                }
            }
            TeacherDetail.prototype.saveTeacher = function (ucitel) {
                var _this = this;
                if (this.isNew) {
                    this.api.createTeacher(ucitel).then(function (response) {
                        _this.teacher = response.data;
                        _this.isNew = false;
                        _this.$location.path("/autoskola/" + _this.$routeParams.autoskolaId + "/ucitele/" + response.data.ucitel_id);
                    }, function (reason) {
                        alert('Chyba: ' + reason);
                    });
                } else {
                    this.api.updateTeacher(ucitel).then(function (response) {
                        _this.teacher = response.data;
                        _this.$scope.teacherForm.$setPristine();
                    }, function (reason) {
                        alert("Chyba: " + reason);
                    });
                }
            };

            TeacherDetail.prototype.deleteTeacher = function (teacher) {
                var _this = this;
                this.api.deleteTeacher(teacher).then(function () {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.autoskola_id + "/ucitele");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            TeacherDetail.prototype.deleteDocument = function (document) {
                var _this = this;
                this.api.deleteTeacherDocument(document).then(function () {
                    _this.documents.remove(document);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            TeacherDetail.prototype.uploadResults = function (content, completed) {
                var _this = this;
                this.api.getTeacherDocuments(this.$routeParams.id).then(function (response) {
                    _this.documents = new app.lib.IndexedArray('dokument_id', response.data.dokumenty);
                }, function (reason) {
                    alert('Nepodarilo se nacist dokumenty: ' + reason);
                });
            };
            TeacherDetail.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.autoskolaId).then(function (response) {
                        return response.data;
                    });
                },
                'teacher': function (api, $route) {
                    if ($route.current.params.id) {
                        return api.getTeacher($route.current.params.id).then(function (response) {
                            return response.data;
                        });
                    } else {
                        return {};
                    }
                },
                'lessons': function (api, $route) {
                    return api.getTeacherLessons($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('teorie_id', response.data['teorie']);
                    });
                },
                'rides': function (api, $route) {
                    if ($route.current.params.id) {
                        return api.getTeacherRides($route.current.params.id).then(function (response) {
                            return new app.lib.IndexedArray('jizda_id', response.data['jizdy']);
                        });
                    } else
                        return new app.lib.IndexedArray('jizda_id');
                },
                'documents': function (api, $route) {
                    if ($route.current.params.id) {
                        return api.getTeacherDocuments($route.current.params.id).then(function (response) {
                            return new app.lib.IndexedArray('dokument_id', response.data['dokumenty']);
                        });
                    } else
                        return new app.lib.IndexedArray('dokument_id');
                },
                'students': function (api, $route) {
                    return api.getStudents($route.current.params.autoskolaId).then(function (response) {
                        return new app.lib.IndexedArray('student_id', response.data['studenti']);
                    });
                }
            };
            return TeacherDetail;
        })();
        controller.TeacherDetail = TeacherDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('TeacherDetail');
//# sourceMappingURL=teacherDetail.js.map
