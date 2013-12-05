var app;
(function (app) {
    (function (controller) {
        var Settings = (function () {
            function Settings(api, drivingSchool, $location) {
                this.api = api;
                this.drivingSchool = drivingSchool;
                this.$location = $location;
            }
            Settings.prototype.uploadResults = function () {
                this.$location.path("/autoskola/" + this.drivingSchool.autoskola_id);
            };
            Settings.resolve = {
                'drivingSchool': function (api, $route) {
                    return api.getDrivingSchool($route.current.params.id).then(function (response) {
                        return response.data;
                    });
                }
            };
            return Settings;
        })();
        controller.Settings = Settings;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('Settings');
//# sourceMappingURL=settings.js.map
