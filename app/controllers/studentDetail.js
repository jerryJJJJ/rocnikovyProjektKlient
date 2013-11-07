var app;
(function (app) {
    (function (controller) {
        var StudentDetail = (function () {
            function StudentDetail($http, $routeParams, api, auth, $location) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.auth = auth;
                this.$location = $location;
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

                this.api.getStudentLessons($routeParams.id).then(function (response) {
                    _this.lessons = response.data.teorie;
                }, function (reason) {
                    alert('Nepodarilo se nacist lekce: ' + reason);
                });
            }
            StudentDetail.prototype.saveStudent = function (student) {
                this.api.updateStudent(student).then(function () {
                    alert("vytvoreno");
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
