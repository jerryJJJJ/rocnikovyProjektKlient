'use strict';
var app;
(function (app) {
    (function (controller) {
        var ListDrivingSchools = (function () {
            function ListDrivingSchools($http, api) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.api.getDrivingSchools().then(function (response) {
                    _this.listSchools = response.data.autoskoly;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            return ListDrivingSchools;
        })();
        controller.ListDrivingSchools = ListDrivingSchools;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('ListDrivingSchools');
//# sourceMappingURL=listDrivingSchools.js.map
