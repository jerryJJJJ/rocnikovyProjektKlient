'use strict';
var app;
(function (app) {
    (function (controller) {
        var Main = (function () {
            function Main($scope, auth, $location) {
                this.$scope = $scope;
                this.auth = auth;
                this.$location = $location;
            }
            Main.prototype.login = function () {
                var _this = this;
                this.auth.login(this.username, this.password).then(function (user) {
                    if (user.role == "jednatel")
                        _this.$location.path('/autoskola/' + user.autoskola_id);
else
                        _this.$location.path('/autoskoly');
                });
            };
            return Main;
        })();
        controller.Main = Main;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('Main');
//# sourceMappingURL=main.js.map
