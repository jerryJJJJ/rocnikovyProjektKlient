'use strict';

module app.controller {

  export class DrivingSchool {

    public drivingSchool;

    constructor(private $http:ng.IHttpService, private auth:app.service.Auth) {
      $http.get("/autoskola/1").then((response:ng.IHttpPromiseCallbackArg) => {
        this.drivingSchool = response.data;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

  }

}

app.registerController('DrivingSchool');