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

                //TODO reqest do Api service
                $http.get("/autoskoly/" + autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                    _this.vehicles = new app.lib.IndexedArray(_this.drivingSchool.vozidla);
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });

                //TODO *** stejne jako se tu nacitaji kurzy, nacital bych i ostatni zvlast a ne v ramci autoskoly (s parametrem autoskola_id)
                //     bude to odpovidat RESTOvemu api a programmerovi serveru se to bude lepe programovat..
                //TODO *** do restoveho api bych urcite nedaval "pocet-vozidel" atd... at mame API ciste, pokud chces tyto informace vypisovat
                //     tak jelikoz data nacitame vsechna, staci pri vypisovani napsat napr. drivingSchoolCtrl.vehicles.length (vehicles
                //     je klasicke pole)
                //TODO reqest patri do Api service
                $http.get("/kurzy?autoskola_id=" + autoskolaId).then(function (response) {
                    _this.courses = response.data.kurzy;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            DrivingSchool.prototype.deleteVehicle = function (vehicle) {
                //TODO reqest patri do Api service
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
