'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;
    private http;

    constructor(private $http:ng.IHttpService, $routeParams:ng.IRouteParamsService) {

      var autoskolaId:string = $routeParams.id;
      this.http = $http;

      $http.get("/autoskoly/" + autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    deleteVehicle(vehicle) {
       this.http.delete("/vozidla/" + vehicle.id).then((response:ng.IHttpPromiseCallbackArg) => {
        alert(response);
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

    createVehicle() {

    }
  }
}

app.registerController('DrivingSchool');