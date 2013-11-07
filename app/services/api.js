var app;
(function (app) {
    (function (service) {
        var Api = (function () {
            function Api($http) {
                this.$http = $http;
                this.url = "http://ronkovprojektapi.apiary.io";
            }
            Api.prototype.getDrivingSchool = function (drivingSchoolId) {
                return this.$http.get(this.url + "/autoskoly/" + drivingSchoolId);
            };

            Api.prototype.getTeachers = function (drivingSchoolId) {
                return this.$http.get(this.url + "/ucitele?autoskola_id=" + drivingSchoolId);
            };

            Api.prototype.getVehicles = function (drivingSchoolId) {
                return this.$http.get(this.url + "/vozidla?autoskola_id=" + drivingSchoolId);
            };

            Api.prototype.getVehicle = function (vehicleId) {
                return this.$http.get(this.url + "/vozidla/" + vehicleId);
            };

            Api.prototype.getCourse = function (courseId) {
                return this.$http.get(this.url + "/kurzy/" + courseId);
            };

            Api.prototype.getCourses = function (drivingSchoolId) {
                return this.$http.get(this.url + "/kurzy?autoskola_id=" + drivingSchoolId);
            };

            Api.prototype.getRides = function (vehicleId) {
                return this.$http.get(this.url + "/jizdy?vozidlo_id=" + vehicleId);
            };

            Api.prototype.getStudentRides = function (studentId) {
                return this.$http.get(this.url + "/jizdy?student_id=" + studentId);
            };

            Api.prototype.getStudentLessons = function (studentId) {
                return this.$http.get(this.url + "/teorie?student_id=" + studentId);
            };

            Api.prototype.getVehicleDocuments = function (vehicleId) {
                return this.$http.get(this.url + "/dumenty-vozidla?vozidlo_id=" + vehicleId);
            };

            Api.prototype.getLessons = function (courseId) {
                return this.$http.get(this.url + "/teorie?kurz_id=" + courseId);
            };

            Api.prototype.getStudents = function (courseId) {
                return this.$http.get(this.url + "/studenti?kurz_id=" + courseId);
            };

            Api.prototype.getStudent = function (studentId) {
                return this.$http.get(this.url + "/studenti/" + studentId);
            };

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
