module app.controller {

  export class VehicleDetail {

    public drivingSchool;
    public vehicle;
    public newRide;
    public isNew;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService, private api:app.service.Api, private auth) {

      $http.get("/autoskoly/"+$routeParams.autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Nepodarilo se nacist autoskolu: ' + reason);
      });

      if($routeParams.id) {
        this.isNew = false;
        $http.get("/vozidla/"+$routeParams.id).then((response:ng.IHttpPromiseCallbackArg) => {
          this.vehicle = response.data;
        }, (reason) => {
          alert('Nepodarilo se nacist vozidlo: ' + reason);
        });
      } else {
        this.isNew = true;
        this.vehicle = {
          "pocatecni-stav-km": 0
        };
      }
      var nowDate = new Date();
      var month = (nowDate.getMonth() + 1 < 10 ? '0' : '') + (nowDate.getMonth() + 1);
      var day = (nowDate.getDate() < 10 ? '0' : '') + nowDate.getDate();


      this.newRide = {
        "datum": nowDate.getFullYear() + "-" + month + "-" + day,
        "cas-od": (nowDate.getHours() + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes()),
        "cas-do": ((nowDate.getHours() + 2) + ":" + (nowDate.getMinutes() < 10 ? '0' : '') + nowDate.getMinutes())
      };
    }

    public saveVehicle(vehicle) {
      (this.isNew) ? this.api.createVehicle(vehicle).then((response) => { this.vehicle = response.data; this.isNew = false; }, (reason) => { alert('Chyba: ' + reason); })
                   : this.api.updateVehicle(vehicle).then((response) => { this.vehicle = response.data; }, () => { alert("n"); });
    }

    public createRide(ride) {
      this.api.createRide(ride).then(() => {alert("vytvoreno");}, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteVehicle(vehicle) {
      this.api.deleteVehicle(vehicle).then(() => { window.location.assign("/#/autoskola/" + this.drivingSchool.id); }, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteRide(ride) {
      this.api.deleteRide(ride).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }

    public deleteDocument(document) {
      this.api.deleteDocument(document, this.vehicle).then(angular.noop, (reason) => { alert('Chyba: ' + reason); });
    }
  }

}

app.registerController('VehicleDetail');