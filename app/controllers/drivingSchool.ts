'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;

    constructor(private $http:ng.IHttpService, private auth:app.service.Auth, $routeParams:ng.IRouteParamsService) {

      var autoskolaId:string = $routeParams.id;

      $http.get("/autoskoly/" + autoskolaId).then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });

    }

  }

}

app.registerController('DrivingSchool');