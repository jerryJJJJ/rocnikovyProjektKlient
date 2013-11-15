var app;
(function (app) {
    (function (controller) {
        var VehicleDetail = (function () {
            function VehicleDetail($http, $routeParams, api, $location, drivingSchool, vehicle, students, teachers, rides, documents, courses) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.$location = $location;
                this.drivingSchool = drivingSchool;
                this.vehicle = vehicle;
                this.students = students;
                this.teachers = teachers;
                this.rides = rides;
                this.documents = documents;
                this.courses = courses;
                if ($routeParams.id) {
                    this.isNew = false;

                    //this.activeStudents = new app.lib.IndexedArray;
                    students.forEach(function (student) {
                        var state = courses.find(student['kurz_id'])['stav'];
                        if (state == 'probihajici' || state == 'jde_ke_zkousce') {
                            _this.activeStudents.add(student);
                        }
                    });
                } else {
                    this.isNew = true;
                    this.vehicle = {
                        "pocatecni-stav-km": 0,
                        "prumerna-spotreba": 0,
                        "pocet-km": 0
                    };
                }

                var nowDate = new Date();
                var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                this.newRide = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "do": (((nowDate.getHours() + 2 > 23) ? 23 : nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
                };
            }
            VehicleDetail.prototype.saveVehicle = function (vehicle) {
                var _this = this;
                if (this.isNew) {
                    this.api.createVehicle(vehicle).then(function (response) {
                        _this.vehicle = response.data;
                        _this.isNew = false;
                    }, function (reason) {
                        alert('Chyba: ' + reason);
                    });
                } else {
                    this.api.updateVehicle(vehicle).then(function (response) {
                        _this.vehicle = response.data;
                    }, function (reason) {
                        alert("Chyba: " + reason);
                    });
                }
            };

            VehicleDetail.prototype.createRide = function (ride) {
                var _this = this;
                this.api.createRide(ride).then(function (response) {
                    _this.rides.push(response.data);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteVehicle = function (vehicle) {
                var _this = this;
                this.api.deleteVehicle(vehicle).then(function () {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.autoskola_id + "/vozidla");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteRide = function (ride) {
                var _this = this;
                this.api.deleteRide(ride).then(function () {
                    _this.rides.remove(ride);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteDocument = function (document) {
                var _this = this;
                this.api.deleteVehicleDocument(document).then(function () {
                    _this.documents.remove(document);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.uploadResults = function (content, completed) {
                var _this = this;
                if (completed && content.length > 0) {
                    this.api.getVehicleDocuments($routeParams.id).then(function (response) {
                        _this.documents = new app.lib.IndexedArray('stk_id', response.data.dokumenty);
                    }, function (reason) {
                        alert('Nepodarilo se nacist dokumenty: ' + reason);
                    });
                } else {
                    // 1. ignore content and adjust your model to show/hide UI snippets; or
                    // 2. show content as an _operation progress_ information
                }
            };
            VehicleDetail.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'vehicle': function (api, $route) {
                    return api.getVehicle($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                },
                'students': function (api, $route) {
                    return api.getStudents($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('student_id', response.data['studenti']);
                    });
                },
                'courses': function (api, $route) {
                    return api.getCourses($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('kurz_id', response.data['kurzy']);
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
                },
                'documents': function (api, $route) {
                    return api.getVehicleDocuments($route.current.params.id).then(function (response) {
                        return new app.lib.IndexedArray('stk_id', response.data['dokumenty']);
                    });
                }
            };
            return VehicleDetail;
        })();
        controller.VehicleDetail = VehicleDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('VehicleDetail');
//# sourceMappingURL=vehicleDetail.js.map
