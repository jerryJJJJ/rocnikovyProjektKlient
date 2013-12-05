var app;
(function (app) {
    (function (service) {
        var Api = (function () {
            //private url : string = "http://localhost:49684/api";
            function Api($http, $rootScope, $q) {
                this.$http = $http;
                this.$q = $q;
                this.url = "http://ronkovprojektapi.apiary.io";
                $rootScope.serverUrl = this.url;
            }
            Api.prototype.treatVozidlo = function (vozidlo) {
                this.trimDate(vozidlo, 'posledni_stk');
            };

            Api.prototype.treatUcitel = function (ucitel) {
                this.trimDate(ucitel, 'platnost_opravneni');
                this.trimDate(ucitel, 'posledni_prohlidka');
            };

            Api.prototype.treatJizda = function (jizda) {
                jizda['datum'] = jizda['cas_od'].slice(0, 10);
                this.trimHours(jizda, 'cas_od');
                this.trimHours(jizda, 'cas_do');
            };

            Api.prototype.treatDokument = function (dokument) {
                this.trimDate(dokument, 'datum_vlozeni');
            };

            Api.prototype.treatTeorie = function (teorie) {
                teorie['datum'] = teorie['cas_od'].slice(0, 10);
                this.trimHours(teorie, 'cas_od');
                this.trimHours(teorie, 'cas_do');
            };

            Api.prototype.treatTeorieSave = function (teorie) {
                teorie.cas_od = teorie.datum + " " + (teorie.cas_od.length == 4 ? '0' : '') + teorie.cas_od;
                teorie.cas_do = teorie.datum + " " + (teorie.cas_do.length == 4 ? '0' : '') + teorie.cas_do;
            };

            Api.prototype.treatRideSave = function (ride) {
                ride.cas_od = ride.datum + " " + (ride.cas_od.length == 4 ? '0' : '') + ride.cas_od;
                ride.cas_do = ride.datum + " " + (ride.cas_do.length == 4 ? '0' : '') + ride.cas_do;
            };

            Api.prototype.treatKurz = function (kurz) {
                this.trimDate(kurz, 'datum_od');
                this.trimDate(kurz, 'datum_do');
            };

            Api.prototype.trimDate = function (entity, prop) {
                if (typeof entity[prop] == "string") {
                    entity[prop] = entity[prop].slice(0, 10);
                }
            };

            Api.prototype.trimHours = function (entity, prop) {
                if (typeof entity[prop] == "string") {
                    entity[prop] = entity[prop].slice(11, 16);
                }
            };

            Api.prototype.login = function (userName, password) {
                var deferred = this.$q.defer();
                deferred.resolve({
                    name: userName,
                    role: userName
                });
                return deferred.promise;
            };

            Api.prototype.getDrivingSchool = function (drivingSchoolId) {
                return this.$http.get(this.url + "/autoskoly/" + drivingSchoolId);
            };

            Api.prototype.getDrivingSchools = function () {
                return this.$http.get(this.url + "/autoskoly");
            };

            Api.prototype.getTeachers = function (drivingSchoolId) {
                var _this = this;
                return this.$http.get(this.url + "/ucitele?autoskola_id=" + drivingSchoolId).then(function (response) {
                    response.data.ucitele.forEach(function (ucitel) {
                        return _this.treatUcitel(ucitel);
                    });
                    return response;
                });
            };

            Api.prototype.getTeacher = function (teacherId) {
                var _this = this;
                return this.$http.get(this.url + "/ucitele/" + teacherId).then(function (response) {
                    _this.treatUcitel(response.data);
                    return response;
                });
            };

            Api.prototype.getVehicles = function (drivingSchoolId) {
                var _this = this;
                return this.$http.get(this.url + "/vozidla?autoskola_id=" + drivingSchoolId).then(function (response) {
                    response.data.vozidla.forEach(function (vozidlo) {
                        return _this.treatVozidlo(vozidlo);
                    });
                    return response;
                });
            };

            Api.prototype.getWageSheets = function (drivingSchoolId) {
                return this.$http.get(this.url + "/vyplatnice?autoskola_id=" + drivingSchoolId);
            };

            Api.prototype.getVehicle = function (vehicleId) {
                var _this = this;
                return this.$http.get(this.url + "/vozidla/" + vehicleId).then(function (response) {
                    _this.treatVozidlo(response.data);
                    return response;
                });
            };

            Api.prototype.getCourse = function (courseId) {
                var _this = this;
                return this.$http.get(this.url + "/kurzy/" + courseId).then(function (response) {
                    _this.treatKurz(response.data);
                    return response;
                });
            };

            Api.prototype.getAttendance = function (lessonId) {
                return this.$http.get(this.url + "/dochazka/" + lessonId);
            };

            Api.prototype.updateAttendance = function (lessonId, attendance) {
                return this.$http.put(this.url + "/dochazka/" + lessonId, attendance);
            };

            Api.prototype.getCourses = function (drivingSchoolId) {
                var _this = this;
                return this.$http.get(this.url + "/kurzy?autoskola_id=" + drivingSchoolId).then(function (response) {
                    response.data.kurzy.forEach(function (kurz) {
                        return _this.treatKurz(kurz);
                    });
                    return response;
                });
            };

            Api.prototype.getVehicleRides = function (vehicleId) {
                var _this = this;
                return this.$http.get(this.url + "/jizdy?vozidlo_id=" + vehicleId).then(function (response) {
                    response.data.jizdy.forEach(function (jidza) {
                        return _this.treatJizda(jidza);
                    });
                    return response;
                });
            };

            Api.prototype.getStudentRides = function (studentId) {
                var _this = this;
                return this.$http.get(this.url + "/jizdy?student_id=" + studentId).then(function (response) {
                    response.data.jizdy.forEach(function (jidza) {
                        return _this.treatJizda(jidza);
                    });
                    return response;
                });
            };

            Api.prototype.getTeacherRides = function (teacherId) {
                var _this = this;
                return this.$http.get(this.url + "/jizdy?teacher_id=" + teacherId).then(function (response) {
                    response.data.jizdy.forEach(function (jidza) {
                        return _this.treatJizda(jidza);
                    });
                    return response;
                });
            };

            Api.prototype.getTeacherLessons = function (teacherId) {
                var _this = this;
                return this.$http.get(this.url + "/teorie?ucitel_id=" + teacherId).then(function (response) {
                    response.data.teorie.forEach(function (teorie) {
                        return _this.treatTeorie(teorie);
                    });
                    return response;
                });
            };

            Api.prototype.getVehicleDocuments = function (vehicleId) {
                var _this = this;
                return this.$http.get(this.url + "/dokumentyvozidla?vozidlo_id=" + vehicleId).then(function (response) {
                    response.data.dokumenty.forEach(function (dokument) {
                        return _this.treatDokument(dokument);
                    });
                    return response;
                });
            };

            Api.prototype.getTeacherDocuments = function (teacherId) {
                var _this = this;
                return this.$http.get(this.url + "/dokumentyucitele?ucitel_id=" + teacherId).then(function (response) {
                    response.data.dokumenty.forEach(function (dokument) {
                        return _this.treatDokument(dokument);
                    });
                    return response;
                });
            };

            Api.prototype.getLessons = function (courseId) {
                var _this = this;
                return this.$http.get(this.url + "/teorie?kurz_id=" + courseId).then(function (response) {
                    response.data.teorie.forEach(function (teorie) {
                        return _this.treatTeorie(teorie);
                    });
                    return response;
                });
            };

            Api.prototype.getStudents = function (autoskolaId) {
                return this.$http.get(this.url + "/studenti?autoskola_id=" + autoskolaId);
            };

            Api.prototype.getStudent = function (studentId) {
                return this.$http.get(this.url + "/studenti/" + studentId);
            };

            Api.prototype.createVehicle = function (vehicle) {
                return this.$http.post(this.url + "/vozidla", vehicle);
            };

            Api.prototype.createTeacher = function (teacher) {
                return this.$http.post(this.url + "/ucitele", teacher);
            };

            Api.prototype.createRide = function (ride) {
                var _this = this;
                this.treatRideSave(ride);
                return this.$http.post(this.url + "/jizdy", ride).then(function (response) {
                    _this.treatJizda(response.data);
                    return response;
                });
            };

            Api.prototype.createLesson = function (lesson) {
                var _this = this;
                this.treatTeorieSave(lesson);
                return this.$http.post(this.url + "/teorie", lesson).then(function (response) {
                    _this.treatTeorie(response.data);
                    return response;
                });
            };

            Api.prototype.createStudent = function (student) {
                return this.$http.post(this.url + "/studenti", student);
            };

            Api.prototype.createCourse = function (course) {
                var _this = this;
                return this.$http.post(this.url + "/kurzy", course).then(function (response) {
                    _this.treatKurz(response.data);
                    return response;
                });
            };

            Api.prototype.createDrivingSchool = function (drivingSchool) {
                return this.$http.post(this.url + "/autoskoly", drivingSchool);
            };

            Api.prototype.createUser = function (user) {
                return this.$http.post(this.url + "/uzivatele", user);
            };

            Api.prototype.updateVehicle = function (vehicle) {
                var _this = this;
                return this.$http.put(this.url + "/vozidla/" + vehicle.vozidlo_id, vehicle).then(function (response) {
                    _this.treatVozidlo(response.data);
                    return response;
                });
            };

            Api.prototype.updateTeacher = function (teacher) {
                var _this = this;
                return this.$http.put(this.url + "/ucitele/" + teacher.ucitel_id, teacher).then(function (response) {
                    _this.treatUcitel(response.data);
                    return response;
                });
            };

            Api.prototype.updateCourse = function (course) {
                var _this = this;
                return this.$http.put(this.url + "/kurzy/" + course.kurz_id, course).then(function (response) {
                    _this.treatKurz(response.data);
                    return response;
                });
            };

            Api.prototype.updateStudent = function (student) {
                return this.$http.put(this.url + "/studenti/" + student.student_id, student);
            };

            Api.prototype.deleteVehicle = function (vehicle) {
                return this.$http.delete(this.url + "/vozidla/" + vehicle.vozidlo_id);
            };

            Api.prototype.deleteTeacher = function (teacher) {
                return this.$http.delete(this.url + "/ucitele/" + teacher.ucitel_id);
            };

            Api.prototype.deleteRide = function (ride) {
                return this.$http.delete(this.url + "/jizdy/" + ride.jizda_id);
            };

            Api.prototype.deleteVehicleDocument = function (document) {
                return this.$http.delete(this.url + "/dokumentyvozidla/" + document.dokument_id);
            };

            Api.prototype.deleteTeacherDocument = function (document) {
                return this.$http.delete(this.url + "/dokumentyucitele/" + document.dokument_id);
            };

            Api.prototype.deleteCourse = function (course) {
                return this.$http.delete(this.url + "/kurzy/" + course.kurz_id);
            };

            Api.prototype.deleteLesson = function (lesson) {
                return this.$http.delete(this.url + "/teorie/" + lesson.teorie_id);
            };

            Api.prototype.deleteStudent = function (student) {
                return this.$http.delete(this.url + "/studenti/" + student.student_id);
            };

            Api.prototype.deleteUser = function (user) {
                return this.$http.delete(this.url + "/uzivatele/", user.uzivatel_id);
            };
            return Api;
        })();
        service.Api = Api;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Api');
//# sourceMappingURL=api.js.map
