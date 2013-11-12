var app;
(function (app) {
    (function (controller) {
        var StudentDetail = (function () {
            function StudentDetail($scope, $http, $routeParams, api, auth, $location) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.api = api;
                this.auth = auth;
                this.$location = $location;
                this.courseId = this.$routeParams.kurzId;
                this.vehicleId = this.$routeParams.vozidloId;
                this.api.getDrivingSchool($routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });

                this.api.getStudent($routeParams.id).then(function (response) {
                    _this.student = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist studenta: ' + reason);
                });

                this.api.getStudentRides($routeParams.id).then(function (response) {
                    _this.rides = response.data.jizdy;
                }, function (reason) {
                    alert('Nepodarilo se nacist jizdy: ' + reason);
                });

                this.api.getTeachers($routeParams.autoskolaId).then(function (response) {
                    _this.teachers = new app.lib.IndexedArray('ucitel_id', response.data.ucitele);
                }, function (reason) {
                    alert('Nepodarilo se nacist jizdy: ' + reason);
                });

                this.api.getStudentLessons($routeParams.id).then(function (response) {
                    _this.lessons = response.data.teorie;
                }, function (reason) {
                    alert('Nepodarilo se nacist lekce: ' + reason);
                });
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
            return StudentDetail;
        })();
        controller.StudentDetail = StudentDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('StudentDetail');
//# sourceMappingURL=studentDetail.js.map
