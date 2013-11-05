'use strict';
var app;
(function (app) {
    (function (controller) {
        var DrivingSchool = (function () {
            function DrivingSchool($http, $routeParams) {
                var _this = this;
                this.$http = $http;
                var autoskolaId = $routeParams.id;
                this.listType = $routeParams.listType ? $routeParams.listType : 'vozidla';

                $http.get("/autoskoly/" + autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                    _this.vehicles = new app.lib.IndexedArray(_this.drivingSchool.vozidla);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                //NOTE hazeli se ti spatna data (ze spatny metody API) protoze chybelo v Blueprintu carek.. chyba z nepozornosti
                //NOTE ale kdyz nevis tak se to spatne hleda :)
                //NOTE domluvili jsme se, ze budeme mit striktne rozdelene resources.. tedy adresu z /autoskoly/{id}/kurzy
                //NOTE jsem zmenil na /kurzy?autoskola_id={id}
                $http.get("/kurzy?autoskola_id=" + autoskolaId).then(function (response) {
                    //NOTE puvodne bylo   "this.courses = response.data;"
                    //NOTE kurzy jsou ale v odpovedi v property "kurzy" tak jak je to navrzeno v API
                    _this.courses = response.data.kurzy;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                this.$http.delete("/vozidla/" + vehicle.id).then(function (response) {
                    alert(response.status);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            return DrivingSchool;
        })();
        controller.DrivingSchool = DrivingSchool;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('DrivingSchool');
//# sourceMappingURL=drivingSchool.js.map
