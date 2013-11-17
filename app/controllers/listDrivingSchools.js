var app;
(function (app) {
    /// <reference path="../components/types/angularjs/angular.d.ts"/>
    /// <reference path="../../../../download/klient/services/api.ts"/>
    /// <reference path="../lib/indexedArray.ts"/>
    /// <reference path="../app.ts"/>
    (function (controller) {
        var ListDrivingSchools = (function () {
            function ListDrivingSchools($http, $routeParams, api, listSchools, $location, auth) {
                this.$http = $http;
                this.api = api;
                this.listSchools = listSchools;
                this.$location = $location;
                this.auth = auth;
            }
            ListDrivingSchools.prototype.createDrivingSchool = function () {
                this.$location.path("/autoskola/nove");
            };
            ListDrivingSchools.resolve = {
                'listSchools': function (api) {
                    return api.getDrivingSchools().then(function (response) {
                        return new app.lib.IndexedArray('autoskola_id', response.data['autoskoly']);
                    });
                }
            };
            return ListDrivingSchools;
        })();
        controller.ListDrivingSchools = ListDrivingSchools;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('ListDrivingSchools');
//# sourceMappingURL=listDrivingSchools.js.map
