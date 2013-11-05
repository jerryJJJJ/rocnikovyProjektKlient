var app;
(function (app) {
    (function (controller) {
        var CourseDetail = (function () {
            function CourseDetail($http, $routeParams, api, auth) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.auth = auth;
                $http.get("/kurzy/" + $routeParams.id).then(function (response) {
                    _this.course = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist kurz: ' + reason);
                });
            }
            return CourseDetail;
        })();
        controller.CourseDetail = CourseDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('CourseDetail');
//# sourceMappingURL=courseDetail.js.map
