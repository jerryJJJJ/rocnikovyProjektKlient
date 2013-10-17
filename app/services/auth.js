var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            //TODO prihlasovaci logika
            function Auth($rootScope, $cookies) {
                this.$rootScope = $rootScope;
                this.$cookies = $cookies;
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
