'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;
    public vehicles;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService) {

      var autoskolaId:string = $routeParams.id;

      $http.get("/autoskoly/" + autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
        this.vehicles = new app.lib.IndexedArray(this.drivingSchool.vozidla);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    deleteVehicle(vehicle) {
       this.$http.delete("/vozidla/" + vehicle.id).then((response:ng.IHttpPromiseCallbackArg) => {
        alert(response.status);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }
}

app.registerController('DrivingSchool');