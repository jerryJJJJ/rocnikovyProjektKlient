'use strict';
var app;
(function (app) {
    (function (controller) {
        var VehicleDetail = (function () {
            function VehicleDetail($http, $routeParams) {
                var _this = this;
                this.$http = $http;
                $http.get("/autoskoly/" + $routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });

                if ($routeParams.id) {
                    //mame presne idecko -> jedna se o editaci existujiciho, takze ho nacteme
                    $http.get("/vozidla/" + $routeParams.id).then(function (response) {
                        _this.vehicle = response.data;
                    }, function (reason) {
                        alert('Nepodarilo se nacist vozidlo: ' + reason);
                    });
                } else {
                    //jedna se o nove auto - nastavime defaultni hodnoty
                    this.vehicle = {
                        "pocatecni-stav-km": 0
                    };
                }
            }
            VehicleDetail.prototype.save = function () {
                //nyni se musi poslat pres metodu PUT na api v pripade ze se vozidlo upravuje zaroven s ideckem
                //nebo POST v pripade ze se vozidlo vytvari
                //tady je jedna tabulka kde to je krasne videt jak se ma REST API navrhovat http://cs.wikipedia.org/wiki/Representational_State_Transfer
            };

            VehicleDetail.prototype.checkNumber = function () {
                alert("check");
            };
            return VehicleDetail;
        })();
        controller.VehicleDetail = VehicleDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('VehicleDetail');
//# sourceMappingURL=vehicleDetail.js.map
