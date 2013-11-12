var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            //TODO prihlasovaci logika
            function Auth($rootScope, $cookieStore) {
                this.$rootScope = $rootScope;
                this.$cookieStore = $cookieStore;
                this.user = {
                    name: "user1",
                    role: "jednatel"
                };
                $rootScope.auth = this;
            }
            Auth.prototype.login = function (role) {
                this.user = {
                    name: "user1",
                    role: role
                };
            };

            Auth.prototype.logout = function () {
                this.user = null;
            };
            return Auth;
        })();
        service.Auth = Auth;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Auth');
//# sourceMappingURL=auth.js.map
