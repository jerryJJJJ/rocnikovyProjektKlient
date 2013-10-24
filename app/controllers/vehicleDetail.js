'use strict';
var app;
(function (app) {
    (function (controller) {
        var VehicleDetail = (function () {
            function VehicleDetail($http, auth) {
                var _this = this;
                this.$http = $http;
                this.auth = auth;
                this.http = $http;

                $http.get("/autoskoly").then(function (response) {
                    _this.vehicle = response.data.autoskoly;
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            }
            return VehicleDetail;
        })();
        controller.VehicleDetail = VehicleDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('VehicleDetail');
//# sourceMappingURL=vehicleDetail.js.map
