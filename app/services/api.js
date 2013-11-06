var app;
(function (app) {
    (function (service) {
        var Api = (function () {
            function Api($http) {
                this.$http = $http;
                this.url = "http://ronkovprojektapi.apiary.io";
            }
            Api.prototype.createVehicle = function (vehicle) {
                return this.$http.post(this.url + "/vozidla", vehicle);
            };

            Api.prototype.createRide = function (ride) {
                return this.$http.post(this.url + "/jizdy", ride);
            };

            Api.prototype.createLesson = function (lesson) {
                return this.$http.post(this.url + "/teorie", lesson);
            };

            Api.prototype.createStudent = function (student) {
                return this.$http.post(this.url + "/studenti", student);
            };

            Api.prototype.createCourse = function (course) {
                return this.$http.post(this.url + "/kurzy", course);
            };

            Api.prototype.updateVehicle = function (vehicle) {
                return this.$http.put(this.url + "/vozidla/" + vehicle.id, vehicle);
            };

            Api.prototype.updateCourse = function (course) {
                return this.$http.put(this.url + "/kurzy/" + course.id, course);
            };

            Api.prototype.deleteVehicle = function (vehicle) {
                return this.$http.delete(this.url + "/vozidla/" + vehicle.id);
            };

            Api.prototype.deleteRide = function (ride) {
                return this.$http.delete(this.url + "/jizdy/" + ride.id);
            };

            Api.prototype.deleteDocument = function (document) {
                return this.$http.delete(this.url + "/dokumenty/" + document.id);
            };

            Api.prototype.deleteCourse = function (course) {
                return this.$http.delete(this.url + "/kurzy/" + course.id);
            };

            Api.prototype.deleteLesson = function (lesson) {
                return this.$http.delete(this.url + "/teorie/" + lesson.id);
            };

            Api.prototype.deleteStudent = function (student) {
                return this.$http.delete(this.url + "/studenti/" + student.id);
            };
            return Api;
        })();
        service.Api = Api;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Api');
//# sourceMappingURL=api.js.map
