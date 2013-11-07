var app;
(function (app) {
    (function (controller) {
        var VehicleDetail = (function () {
            function VehicleDetail($http, $routeParams, api, auth, $location) {
                var _this = this;
                this.$http = $http;
                this.api = api;
                this.auth = auth;
                this.$location = $location;
                this.api.getDrivingSchool($routeParams.autoskolaId).then(function (response) {
                    _this.drivingSchool = response.data;
                }, function (reason) {
                    alert('Nepodarilo se nacist autoskolu: ' + reason);
                });

                if ($routeParams.id) {
                    this.isNew = false;
                    this.api.getVehicle($routeParams.id).then(function (response) {
                        _this.vehicle = response.data;
                    }, function (reason) {
                        alert('Nepodarilo se nacist vozidlo: ' + reason);
                    });

                    this.api.getRides($routeParams.id).then(function (response) {
                        _this.rides = response.data.jizdy;
                    }, function (reason) {
                        alert('Nepodarilo se nacist jizdy: ' + reason);
                    });

                    this.api.getVehicleDocuments($routeParams.id).then(function (response) {
                        _this.documents = response.data.dokumenty;
                    }, function (reason) {
                        alert('Nepodarilo se nacist dokumenty: ' + reason);
                    });
                } else {
                    this.isNew = true;
                    this.vehicle = {
                        "pocatecni-stav-km": 0,
                        "prumerna-spotreba": 0,
                        "pocet-km": 0
                    };
                }
                var nowDate = new Date();
                var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
                var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();

                this.newRide = {
                    "datum": nowDate.getFullYear() + "-" + month + "-" + day,
                    "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
                    "cas-do": (((nowDate.getHours() + 2 > 23) ? 23 : nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
                };
            }
            VehicleDetail.prototype.saveVehicle = function (vehicle) {
                var _this = this;
                if (this.isNew) {
                    this.api.createVehicle(vehicle).then(function (response) {
                        _this.vehicle = response.data;
                        _this.isNew = false;
                    }, function (reason) {
                        alert('Chyba: ' + reason);
                    });
                } else {
                    this.api.updateVehicle(vehicle).then(function (response) {
                        _this.vehicle = response.data;
                    }, function (reason) {
                        alert("Chyba: " + reason);
                    });
                }
            };

            VehicleDetail.prototype.createRide = function (ride) {
                this.api.createRide(ride).then(function () {
                    alert("vytvoreno");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteVehicle = function (vehicle) {
                var _this = this;
                this.api.deleteVehicle(vehicle).then(function () {
                    _this.$location.path("/autoskola/" + _this.drivingSchool.id + "/vozidla");
                }, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteRide = function (ride) {
                this.api.deleteRide(ride).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };

            VehicleDetail.prototype.deleteDocument = function (document) {
                this.api.deleteDocument(document).then(angular.noop, function (reason) {
                    alert('Chyba: ' + reason);
                });
            };
            return VehicleDetail;
        })();
        controller.VehicleDetail = VehicleDetail;
    })(app.controller || (app.controller = {}));
    var controller = app.controller;
})(app || (app = {}));

app.registerController('VehicleDetail');
//# sourceMappingURL=vehicleDetail.js.map
