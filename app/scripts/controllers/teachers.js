'use strict';
var app;
(function (app) {
    (function (controller) {
        var Teachers = (function () {
            function Teachers($scope, $http) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                $http.get("/ucitele").then(function (response) {
                    _this.teachers = response.data.ucitele;
                });
            }
            return Teachers;
        })();
        controller.Teachers = Teachers;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('Teachers', ['$scope', '$http']);
//# sourceMappingURL=teachers.js.map
