'use strict';
var app;
(function (app) {
    (function (controller) {
        var Main = (function () {
            function Main($scope, $rootScope, auth, $location, $http) {
                this.$scope = $scope;
                this.auth = auth;
                this.$location = $location;
                /*$http({
                method: "PATCH",
                url: $rootScope.serverUrl + "/test/10",
                
                // These accept multiple types, so let's define them as any
                data: {
                "aaa": "bbb"
                }
                });*/
            }
            Main.prototype.login = function () {
                var _this = this;
                this.auth.login(this.username, this.password).then(function (user) {
                    if (user.role.match("jednatel"))
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
