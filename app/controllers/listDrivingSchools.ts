'use strict';

module app.controller {

  export class ListDrivingSchools {

    public listSchools;

    constructor(private $http:ng.IHttpService, private api:app.service.Api) {
      this.api.getDrivingSchools().then((response) => {
        this.listSchools = response.data.autoskoly;
      }, (reason) => {
        alert('Chyba: ' + reason);
      });
    }
  }

}

app.registerController('ListDrivingSchools');