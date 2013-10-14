'use strict';
var app;
(function (app) {
    (function (controller) {
        var Main = (function () {
            function Main($scope) {
                this.$scope = $scope;
            }
            return Main;
        })();
        controller.Main = Main;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('Main', ['$scope']);
//# sourceMappingURL=main.js.map
