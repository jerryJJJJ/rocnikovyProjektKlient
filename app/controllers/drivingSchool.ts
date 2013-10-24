'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;
    public vehicles;
    private http;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService) {

      var autoskolaId:string = $routeParams.id;
      this.http = $http;

      $http.get("/autoskoly/" + autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
        this.vehicles = this.drivingSchool.vehicle;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    getVehicle(idVehicle) {
      for(var i=0; i<this.vehicles.length; i++) {
        if(this.vehicles[i].id == idVehicle)
          return this.vehicles[i];
      }
      return null;
    }

    deleteVehicle(vehicle) {
       this.http.delete("/vozidla/" + vehicle.id).then((response:ng.IHttpPromiseCallbackArg) => {
        alert(response.status);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    createVehicle() {

    }
  }
}

app.registerController('DrivingSchool');