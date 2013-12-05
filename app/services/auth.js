var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            //TODO prihlasovaci logika
            function Auth($rootScope, $cookieStore, api, $q) {
                this.$rootScope = $rootScope;
                this.$cookieStore = $cookieStore;
                this.api = api;
                this.$q = $q;
                $rootScope.auth = this;
            }
            Auth.prototype.tryCookieLogin = function () {
                var login = this.$cookieStore.get('login');
                if (!login) {
                    login = { userName: 'jednatel', password: 'password' };
                }
                return this.login(login.userName, login.password);
            };

            Auth.prototype.login = function (userName, password) {
                var _this = this;
                return this.api.login(userName, password).then(function (user) {
                    _this.$cookieStore.put('login', {
                        'userName': userName,
                        'password': password
                    });
                    console.log("Login Success!", _this.$cookieStore.get('login'));
                    _this.user = user;
                    return user;
                });
            };

            Auth.prototype.logout = function () {
                this.$cookieStore.remove('login');
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
