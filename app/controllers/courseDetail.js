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
                }

                $http.get("/autoskoly/" + $routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });

                alert(this.isNew);
                var nowDate = new Date();
                var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                this.newLesson = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
                };
            }
            return CourseDetail;
        })();
        controller.CourseDetail = CourseDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('CourseDetail');
//# sourceMappingURL=courseDetail.js.map
