var app;
(function (app) {
    /// <reference path="../components/types/angularjs/angular.d.ts"/>
    /// <reference path="../services/api.ts"/>
    /// <reference path="../lib/indexedArray.ts"/>
    /// <reference path="../app.ts"/>
    (function (controller) {
        var CreateDrivingSchool = (function () {
            function CreateDrivingSchool($http, $routeParams, api, $location) {
                this.$http = $http;
                this.$routeParams = $routeParams;
                this.api = api;
                this.$location = $location;
                this.user = {
                    "uzivatelske_jmeno": "",
                    "heslo": "",
                    "role": ""
                };

                this.drivingSchool = {
                    "nazev": "",
                    "adresa_mesto": "",
                    "adresa_ulice": "",
                    "adresa_cp": "",
                    "adresa_psc": "",
                    "uzivatel_id": 0
                };
            }
            CreateDrivingSchool.prototype.saveDrivingSchool = function (drivingSchool, user) {
                var _this = this;
                this.api.createUser(user).then(function (response) {
                    _this.drivingSchool['uzivatel_id'] = response.data['uzivatel_id'];
                    _this.api.createDrivingSchool(drivingSchool).then(function () {
                        _this.$location.path("/autoskoly");
                    }, function (reason) {
                        alert('chyba: ' + reason);
                    });
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            return CreateDrivingSchool;
        })();
        controller.CreateDrivingSchool = CreateDrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('CreateDrivingSchool');
//# sourceMappingURL=createDrivingSchool.js.map
