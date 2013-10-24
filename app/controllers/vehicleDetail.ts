'use strict';

module app.controller {

  export class VehicleDetail {

    public vehicle;
    private http;

    constructor(private $http:ng.IHttpService, private auth:app.service.Auth) {

      this.http = $http;

      $http.get("/autoskoly").then((response:ng.IHttpPromiseCallbackArg) => {
        this.vehicle = response.data.autoskoly;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }

}

app.registerController('VehicleDetail');