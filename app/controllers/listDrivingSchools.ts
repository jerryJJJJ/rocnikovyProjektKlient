'use strict';

module app.controller {

  export class ListDrivingSchools {

    public listSchools;

    constructor(private $http:ng.IHttpService) {
      //TODO reqest do Api service
      $http.get("/autoskoly").then((response:ng.IHttpPromiseCallbackArg) => {
        this.listSchools = response.data.autoskoly;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }

  }

}

app.registerController('ListDrivingSchools');