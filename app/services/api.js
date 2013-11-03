var app;
(function (app) {
    (function (service) {
        var Api = (function () {
            function Api($http) {
                this.$http = $http;
            }
            Api.prototype.createVehicle = function (vehicle) {
                return this.$http.post("/vozidla", vehicle);
            };

            Api.prototype.createRide = function (ride) {
                return this.$http.post("/jizdy", ride);
            };

            Api.prototype.updateVehicle = function (vehicle) {
                return this.$http.put("/vozidla/" + vehicle.id, vehicle);
            };

            Api.prototype.deleteVehicle = function (vehicle) {
                return this.$http.delete("/vozidla/" + vehicle.id);
            };

            Api.prototype.deleteRide = function (ride) {
                return this.$http.delete("/jizdy/" + ride.id);
            };

            Api.prototype.deleteDocument = function (vehicle, document) {
                return this.$http.delete("/dokumenty/" + document.id);
            };
            return Api;
        })();
        service.Api = Api;
    })(app.service || (app.service = {}));
    var service = app.service;
})(app || (app = {}));

app.registerService('Api');
//# sourceMappingURL=api.js.map
