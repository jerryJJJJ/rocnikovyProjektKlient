var app;
(function (app) {
    (function (service) {
        var Auth = (function () {
            function Auth() {
                //TODO prihlasovaci logika
            }
            return Auth;
        })();
        service.Auth = Auth;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Auth');
//# sourceMappingURL=auth.js.map
