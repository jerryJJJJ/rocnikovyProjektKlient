var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            //TODO prihlasovaci logika
            function Auth($rootScope, $cookieStore) {
                this.$rootScope = $rootScope;
                this.$cookieStore = $cookieStore;
                $rootScope.auth = this;
            }
            return Auth;
        })();
        service.Auth = Auth;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Auth');
//# sourceMappingURL=auth.js.map
