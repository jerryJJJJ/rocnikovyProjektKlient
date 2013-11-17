var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            //TODO prihlasovaci logika
            function Auth($rootScope, $cookieStore, api) {
                this.$rootScope = $rootScope;
                this.$cookieStore = $cookieStore;
                this.api = api;
                this.user = {
                    name: "user1",
                    role: "jednatel"
                };
                $rootScope.auth = this;
            }
            Auth.prototype.login = function (userName, password) {
                var _this = this;
                return this.api.login(userName, password).then(function (user) {
                    _this.user = user;
                    return user;
                });
            };

            Auth.prototype.logout = function () {
                location.replace("/#/");
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
