var app;
(function (app) {
    /// <reference path="../components/types/angularjs/angular.d.ts"/>
    /// <reference path="../services/api.ts"/>
    /// <reference path="../lib/indexedArray.ts"/>
    /// <reference path="../app.ts"/>
    (function (controller) {
        var ListDrivingSchools = (function () {
            function ListDrivingSchools($http, $routeParams, api, listSchools) {
                this.$http = $http;
                this.api = api;
                this.listSchools = listSchools;
            }
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
